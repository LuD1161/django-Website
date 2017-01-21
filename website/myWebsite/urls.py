from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^get/(?P<article_id>\d+)/$', views.article, name='articles'),
    url(r'^hello/$', views.hello, name='hello'),
    url(r'^hello_template/$', views.hello_template, name='hello_template'),
]