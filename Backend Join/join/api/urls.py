from django.db import router
from django.urls import include, path
from rest_framework import routers

from join.api.views import ContactViewSet, TaskViewSet, SubtaskViewSet, get_summary_stats

router = routers.SimpleRouter()
router.register(r'contacts', ContactViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'subtasks', SubtaskViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('summary/', get_summary_stats)
]