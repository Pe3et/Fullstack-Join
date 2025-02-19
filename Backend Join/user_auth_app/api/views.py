from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from user_auth_app.api.serializers import RegistartionSerializer


class RegistrationView(APIView):
    permission_classes = [AllowAny]

    """
    Checks if the e-mail is already registered, serializes and creates a token for 
    the user user.
    """
    def post(self, request):
        serializer = RegistartionSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            saved_account = serializer.save()
            token, created = Token.objects.get_or_create(user=saved_account)
            data = {
                'token': token.key,
                'full_name': saved_account.first_name + ' ' + saved_account.last_name,
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors['email'][0], status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(ObtainAuthToken):
    permission_classes = [AllowAny]

    """
    Checks if the user who tries to log in exists.
    If the user exists, it calls the 'authenticate' method with
    appropiate data to serialize.
    """
    def post(self, request):
        entered_email = request.data.get('email')
        try:
            user = User.objects.get(email=entered_email) 
        except:
            return Response({'error': 'User not found.'})
        
        data_to_serialize = {
            'email': user.email,
            'username': user.username,
            'password': request.data.get('password')
        }
        response_data = self.authenticate(data_to_serialize, user)
        return Response(response_data)

    """
    Serializes the login data and returns appropiate data including the token
    for Frontend response.
    """
    def authenticate(self, data_to_serialize, user):
        serializer = self.serializer_class(data=data_to_serialize)
        if serializer.is_valid():
            token, created = Token.objects.get_or_create(user=user)
            return {
                'token': token.key,
                'email': serializer.validated_data['user'].email,
                'full_name': user.first_name + " " + user.last_name,
            }
        else:
            return serializer.errors


"""
Sends the token for guest login to Frontend.
"""        
@api_view(['GET'])
@permission_classes([AllowAny])
def get_guest_token(request):
    if not User.objects.filter(username='Gast').exists():
        guest = User(username='Gast')
        guest.save()
    else:
        guest = User.objects.get(username='Gast')
    guest_token, created = Token.objects.get_or_create(user=guest)
    return Response(guest_token.key, status=status.HTTP_200_OK)