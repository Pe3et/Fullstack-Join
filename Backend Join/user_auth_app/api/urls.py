
from django.urls import path

from user_auth_app.api.views import LoginView, RegistrationView, get_guest_token


urlpatterns = [
    path('register/', RegistrationView.as_view()),
    path('login/', LoginView.as_view()),
    path('guest-login/', get_guest_token)
]