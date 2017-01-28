import logging

from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response, render
from django.http import HttpResponse
from django.template import RequestContext
from django.template.loader import get_template
from django.template import Context
from .models import Articles, Users
from .forms import RegistrationForm, TestForm
from django.contrib.auth import authenticate, login as django_login, logout
from django.contrib.auth.models import User

logger = logging.getLogger('myWebsiteLogHandler')
logger.setLevel(logging.INFO)


def articles(request):
    lang = 'en-in'
    session_language = 'en-in'

    if 'lang' in request.COOKIES:
        lang = request.COOKIES['lang']

    if 'lang' in request.session:
        session_language = request.session['lang']

    return render_to_response('articles.html',
                              {'articles': Articles.objects.all(),
                               'language': lang,
                               'session_language': session_language})


def article(request, article_id=1):
    return render_to_response('article.html',
                              {'article': Articles.objects.get(id=article_id)})


def language(request, lang='en-in'):
    response = HttpResponse("setting language to %s" % lang)
    response.set_cookie('lang', lang)
    request.session['lang'] = lang
    return response


def user(request, uid=1):
    return render_to_response('base.html',
                              {'user': Users.objects.get(user_id=uid)})


@login_required
def accountsettings(request):
    logger.info(request.user)
    profile = Users.objects.get(user_email=request.user.email)
    logger.info(profile.user_gender)
    return render_to_response('accountsettings.html',
                              {'user': profile})


def login(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        user_email = request.POST.get('user_email')
        logger.info(user_email)
        user = User.objects.get(email=user_email)
        profile = Users.objects.get(user_email=user_email)
        user1 = authenticate(username=user.username,
                             password=request.POST.get('password'))
        logger.error('After User authentication')
        if user1 is not None:
            django_login(request, user1)
            return HttpResponseRedirect('user/' + str(profile.user_id))
    else:
        form = RegistrationForm()
    return render(request, 'login.html', {'form': form})


def logout_view(request):
    logout(request)
    return render_to_response('login.html')


# Not needed


def hello_template(request):
    name = "Aseem Shrey"
    t = get_template('hello.html')
    html = t.render(Context({'name': name}))
    return HttpResponse(html)


def testform(request):
    logger.error("Posting" + request.method)
    if request.method == 'POST':
        form = TestForm(request.POST)
        logger.debug("Form : username: " + request.POST.get('username') +
                     " pass : " + request.POST.get('password'))
        if form.is_valid():
            user = authenticate(username=request.POST.get['username', ''],
                                password=request.POST.get['password', ''])
            logger.error("Checking " + user)
            if user is not None:
                django_login(request, user)
                return HttpResponseRedirect('user/1/')
    else:
        logger.debug("Not Logged In")
        form = TestForm()
    return render(request, 'articles.html', {'form': form}, RequestContext(request))
