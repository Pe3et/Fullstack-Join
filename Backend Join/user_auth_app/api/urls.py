
from django.urls import path

from user_auth_app.api.views import LoginView, RegistrationView


urlpatterns = [
    path('register/', RegistrationView.as_view()),
    path('login/', LoginView.as_view())
]