from django.conf.urls import url
from django.template.backends import django

from . import views

urlpatterns = [
    url(r'^$', views.login, name='login'),
    url(r'^logout$', views.logout_view, name='logout'),
    url(r'^settings$', views.accountsettings, name='settings'),
    url(r'findfriends$', views.findfriends, name='findFriends'),
    url(r'^user/(?P<uid>\d+)/$', views.user, name='user'),
    url(r'^frequest$', views.frequest, name='frequest'),
    url(r'^notifications$', views.notifications, name='notifications'),
    url(r'^uploadUserPic$', views.uploadUserPic, name='uploadUserPic'),
    url(r'^Connections$', views.Connections, name='Connections'),
    url(r'^connect/(?P<method>\w+)=(?P<user_id>\d+)$', views.connect, name='connect'),


    url(r'^test/$', views.testform, name='test'),
]