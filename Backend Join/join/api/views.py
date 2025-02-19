from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from join.api.serializers import ContactSerializer, TaskSerializer, SubtaskSerializer
from join.models import Contact, Task, Subtask

from . import functions


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    """
    Creates a task and calls the method to also create it's subtasks.
    """
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        task = serializer.save()
        self.create_subtasks(task, request.data.get('subtasks', []))
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    """
    Creates all subtasks, that came with the task creation.
    """
    def create_subtasks(self, task, subtasks_data):
        for subtask_data in subtasks_data:
            subtask_data['task'] = task.id
            subtask_serializer = SubtaskSerializer(data=subtask_data)
            if subtask_serializer.is_valid():
                subtask_serializer.save()

    """
    Lists all tasks and to not only show the IDs of the assigned contacts,
    it format's the assigned contacts with their infos.
    """
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        self.get_contacts_data(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    """
    Get's the infos of the assigned contacts of a task.
    """
    def get_contacts_data(self, tasks_data):
        for task in tasks_data:
            contact_ids = task.get('assignedContacts', [])
            contacts = Contact.objects.filter(id__in=contact_ids)
            contact_serializer = ContactSerializer(contacts, many=True)
            task['assignedContacts'] = contact_serializer.data


    """
    Edit's a task.
    This is also for moving a task with drag & drop to a new status.
    """
    def update(self, request, *args, **kwargs):
        instance = self.update_task(request, *args, **kwargs)
        if 'subtasks' in request.data:
            new_subtasks_data = request.data.get('subtasks', [])
            self.handle_subtasks(instance, new_subtasks_data)
        return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)
    
    """
    Calls the task serializer for the edit.
    """
    def update_task(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return instance

    """
    Handles subtask edits that came with the task edit. 
    """
    def handle_subtasks(self, task, new_subtasks_data):
        self.delete_removed_subtasks(task, new_subtasks_data)
        self.update_or_create_subtasks(task, new_subtasks_data)
    
    """
    If a subtask was removed from the task, the subtask will be deleted.
    """
    def delete_removed_subtasks(self, task, new_subtasks_data):
        existing_subtasks_queryset = task.subtasks.all()
        new_subtasks_ids = []
        for subtask_data in new_subtasks_data:
            if 'id' in subtask_data:
                new_subtasks_ids.append(subtask_data['id'])
        for existing_subtask in existing_subtasks_queryset:
            if existing_subtask.id not in new_subtasks_ids:
                existing_subtask.delete()

    """
    If a new subtask or a changed subtask is in the task, those subtasks will be saved.
    """
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


"""
Get's the stats for the summary page.
"""
@api_view(['GET'])
def get_summary_stats(request):
    tasks = Task.objects.all()
    summary_stats = {}
    summary_stats['totalTasks'] = tasks.count()
    summary_stats['toDoAmount'] = tasks.filter(status='todo').count()
    summary_stats['inProgressAmount'] = tasks.filter(status='inProgress').count()
    summary_stats['awaitFeedbackAmount'] = tasks.filter(status='awaitFeedback').count()
    summary_stats['doneAmount'] = tasks.filter(status='done').count()
    summary_stats['urgentAmount'] = tasks.filter(prio='urgent').count()
    summary_stats['urgentDate'] = functions.get_nearest_urgent_due_date(tasks.filter(prio='urgent'))
    return JsonResponse(summary_stats)
