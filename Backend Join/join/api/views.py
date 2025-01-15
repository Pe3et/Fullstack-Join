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




class SubtaskViewSet(viewsets.ModelViewSet):
    queryset = Subtask.objects.all()
    serializer_class = SubtaskSerializer