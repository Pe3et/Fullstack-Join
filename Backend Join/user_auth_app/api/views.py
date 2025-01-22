from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from user_auth_app.api.serializers import RegistartionSerializer


class RegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegistartionSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            saved_account = serializer.save()
            token, created = Token.objects.get_or_create(user=saved_account)
            data = {
                'token': token.key,
                'full_name': saved_account.first_name + " " + saved_account.last_name,
            }
        else:
            data = serializer.errors

        return Response(data)
    

class LoginView(ObtainAuthToken):
    permission_classes = [AllowAny]

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
        self.authenticate(data_to_serialize, user)

    def authenticate(self, data_to_serialize, user):
        serializer = self.serializer_class(data=data_to_serialize)
        if serializer.is_valid():
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'email': serializer.validated_data['user'].email,
                'full_name': user.first_name + " " + user.last_name,
            })
        else:
            return Response(serializer.errors)