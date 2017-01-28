from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.forms import ModelForm, RadioSelect
from .models import Users

GENDER = (
    ('M', 'Male',),
    ('F', 'Female',),
    ('O', 'Other',),
)


class RegistrationForm(ModelForm):
    class Meta:
        model = Users
        fields = ['user_fname', 'user_lname', 'user_email', 'user_password',
                  'user_dob', 'user_country', 'user_gender']
        widgets = {
            'user_gender': RadioSelect(choices=GENDER),
        }


class TestForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ['username', 'password']

