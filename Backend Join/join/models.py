from django.db import models

# Create your models here.


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=20, blank=True, null=True)
    color = models.CharField(max_length=7)


class Task(models.Model):
    CATEGORIES = [
        ('Technical Task', 'Technical Task'),
        ('User Story', 'User Story')
    ]
    PRIOS = [
        ('low', 'low'),
        ('medium', 'medium'),
        ('urgent', 'urgent')
    ]
    STATUS = [
        ('toDo', 'To do'),
        ('inProgress', 'In progress'),
        ('awaitFeedback', 'Await feedback'),
        ('done', 'Done')
    ]

    title = models.CharField(max_length=30)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(choices=CATEGORIES)
    dueDate = models.DateField()
    prio = models.CharField(choices=PRIOS, default='medium')
    status = models.CharField(choices=STATUS, default='toDo')
    assignedContacts = models.ManyToManyField(Contact, related_name='tasks', blank=True)


class Subtask(models.Model):
    STATUS = [
        ('checked', 'checked'),
        ('unchecked', 'unchecked')
    ]
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    text = models.CharField()
    status = models.CharField(choices=STATUS)

