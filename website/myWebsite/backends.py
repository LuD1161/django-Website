from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import MD5PasswordHasher
# from django.contrib.auth.models import User
from .models import Users


class UserAuthBackend(object):
    def authenticate(self, email=None, password=None):
        try:
            pass1 = make_password(password, hasher=MD5PasswordHasher)
            user = Users.object.get(user_email=email, user_password=pass1)
            if make_password(password, hasher=MD5PasswordHasher) == user.user_password:
                return user
        except Users.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            user = Users.objects.get(pk=user_id)
            return user
        except Users.DoesNotExist:
            return None

    class Meta:
        db_table = 'tbl_users'
