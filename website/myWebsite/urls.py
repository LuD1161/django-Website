from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^user/(?P<uid>\d+)/$', views.user, name='user'),
    url(r'^get/(?P<article_id>\d+)/$', views.article, name='article'),
    url(r'^all', views.articles, name='articles'),
]