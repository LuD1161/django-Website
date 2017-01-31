# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from time import time

from django.contrib.auth.models import User
from django.db import models


def get_upload_file_name(instance, filename):
    return "uploaded_files/%s_%s" % (str(time()).replace('.', '_'), filename)

class Requests(models.Model):
    id = models.IntegerField(primary_key=True)
    to_f = models.IntegerField()
    from_f = models.IntegerField()
    status = models.IntegerField()
    date_sent = models.DateTimeField(blank=True, null=True)
    uid = models.IntegerField()
    from_user = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name = 'Requests'
        verbose_name_plural = 'Requests'
        managed = False
        db_table = 'requests'
        unique_together = (('to_f', 'from_f'),)

    def __unicode__(self):
        return self.from_user

    def __str__(self):
        return u'From : %s ===> To : %s ' % (self.from_user, str(self.to_f))

    def as_dict(self):
        return {
            "f_id": self.from_f,
            "status": self.status,
        }


class Users(models.Model):
    user = models.OneToOneField(User, related_name='user')
    user_Id = models.BigAutoField(primary_key=True)
    user_name = models.CharField(max_length=25)
    user_fname = models.CharField(max_length=40, blank=True, null=True)
    user_lname = models.CharField(max_length=40, blank=True, null=True)
    user_email = models.CharField(max_length=60)
    user_password = models.CharField(max_length=255)
    joining_date = models.DateTimeField()
    user_dob = models.DateField()
    user_country = models.CharField(max_length=3, blank=True, null=True)
    user_gender = models.CharField(max_length=1)
    user_pic = models.CharField(max_length=255, blank=True, null=True)
    user_about = models.CharField(max_length=512, blank=True, null=True)

    class Meta:
        verbose_name = 'Users'
        verbose_name_plural = 'Users'
        managed = False
        db_table = 'tbl_users'

    def __unicode__(self):
        return self.user_name

    def __str__(self):
        return self.name

    def as_dict(self):
        return {
            "id": self.user_Id,
            "Username": self.user_name,
            "UserPic": self.user_pic,
            "UserMail": self.user_email,
            "About": self.user_about,
        }
