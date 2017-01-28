from django.conf.urls import url
from django.template.backends import django

from . import views

urlpatterns = [
    url(r'^$', views.login, name='login'),
    url(r'^logout$', views.logout_view, name='logout'),
    url(r'^settings$', views.accountsettings, name='settings'),
    url(r'^test/$', views.testform, name='test'),
    url(r'^language/(?P<lang>[a-z\-]+)/$', views.language, name='language'),
    url(r'^user/(?P<uid>\d+)/$', views.user, name='user'),
    url(r'^get/(?P<article_id>\d+)/$', views.article, name='article'),
    url(r'^all', views.articles, name='articles'),
]