from django.contrib.auth.models import User
from rest_framework import serializers

from join.api.functions import get_random_color
from join.models import Contact


class RegistartionSerializer(serializers.ModelSerializer):

    repeated_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password',
                  'repeated_password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    """
    Checks if email already exists and raises an error if so.
    """
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already exists.')
        return value

    """
    Creates a user account if the given passwords are matching and
    calls the function to create a new contact with the data of the new user.
    """
    def save(self):
        pw = self.validated_data['password']
        repeated_pw = self.validated_data['repeated_password']

        if pw != repeated_pw:
            raise serializers.ValidationError('Passwords do not match')
        
        account = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name']
        )
        account.set_password(pw)
        account.save()
        self.create_account_as_contact(account)
        return account

    """
    Creates a contact with the data of the user-account.
    """
    def create_account_as_contact(self, account):
        contact = Contact(
            name=f"{account.first_name} {account.last_name}",
            email=account.email,
            color=get_random_color(),
            phone=""
        )
        contact.save()
