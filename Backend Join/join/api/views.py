from typing import Type
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
        instance = self.update_task(request, *args, **kwargs)
        new_subtasks_data = request.data.get('subtasks', [])
        self.handle_subtasks(instance, new_subtasks_data)
        return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)
    
    def update_task(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return instance

    def handle_subtasks(self, task, new_subtasks_data):
        self.delete_removed_subtasks(task, new_subtasks_data)
        self.update_or_create_subtasks(task, new_subtasks_data)
    
    def delete_removed_subtasks(self, task, new_subtasks_data):
        existing_subtasks_queryset = task.subtasks.all()
        new_subtasks_ids = []
        for subtask_data in new_subtasks_data:
            if 'id' in subtask_data:
                new_subtasks_ids.append(subtask_data['id'])
        for existing_subtask in existing_subtasks_queryset:
            if existing_subtask.id not in new_subtasks_ids:
                existing_subtask.delete()

    def update_or_create_subtasks(self, task, new_subtasks_data):
        for new_subtask_data in new_subtasks_data:
            if 'id' not in new_subtask_data:
                new_subtask_data['task'] = task.id
                subtask_serializer = SubtaskSerializer(data=new_subtask_data)
                if subtask_serializer.is_valid():
                    subtask_serializer.save()
            else:
                subtask = Subtask.objects.get(id=new_subtask_data['id'])
                subtask_serializer = SubtaskSerializer(subtask, data=new_subtask_data)
                if subtask_serializer.is_valid():
                    subtask_serializer.save()


class SubtaskViewSet(viewsets.ModelViewSet):
    queryset = Subtask.objects.all()
    serializer_class = SubtaskSerializer
