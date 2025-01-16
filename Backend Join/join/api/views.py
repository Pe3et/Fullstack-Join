from rest_framework import status, viewsets
from rest_framework.response import Response

from join.api.serializers import ContactSerializer, TaskSerializer, SubtaskSerializer
from join.models import Contact, Task, Subtask


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        task = serializer.save()

        subtasks_data = request.data.get('subtasks', [])
        for subtask_data in subtasks_data:
            subtask_data['task'] = task.id
            subtask_serializer = SubtaskSerializer(data=subtask_data)
            if subtask_serializer.is_valid():
                subtask_serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        tasks_data = serializer.data

        for task in tasks_data:
            contact_ids = task.get('assignedContacts', [])
            contacts = Contact.objects.filter(id__in=contact_ids)
            contact_serializer = ContactSerializer(contacts, many=True)
            task['assignedContacts'] = contact_serializer.data

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        subtasks_data = request.data.get('subtasks', [])
        for subtask_data in subtasks_data:
            if 'id' not in subtask_data:
                subtask_data['task'] = instance.id
                subtask_serializer = SubtaskSerializer(data=subtask_data)
                if subtask_serializer.is_valid():
                    subtask_serializer.save()
            else:
                subtask = Subtask.objects.get(id=subtask_data['id'])
                subtask_serializer = SubtaskSerializer(subtask, data=subtask_data, partial=True)
                if subtask_serializer.is_valid():
                    subtask_serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class SubtaskViewSet(viewsets.ModelViewSet):
    queryset = Subtask.objects.all()
    serializer_class = SubtaskSerializer
