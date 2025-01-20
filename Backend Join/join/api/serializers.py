from django.contrib.auth.models import User
from rest_framework import serializers

from join.models import Contact, Subtask, Task


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    assignedContacts = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Contact.objects.all()
    )
    subtasks = SubtaskSerializer(many=True, required=False, read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
