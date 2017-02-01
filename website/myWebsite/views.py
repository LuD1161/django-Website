import json
import logging

from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response, render
from django.http import HttpResponse
from django.template import RequestContext
from django.template.loader import get_template
from django.template import Context
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt

from django.conf import settings
from .models import Users, Requests, Messages
from .forms import RegistrationForm, TestForm
from django.contrib.auth import authenticate, login as django_login, logout
from django.contrib.auth.models import User

logger = logging.getLogger('myWebsiteLogHandler')
logger.setLevel(logging.INFO)


@login_required
@csrf_exempt
def uploadUserPic(request):
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        loc = settings.STATIC_ROOT + "/images/"
        fs = FileSystemStorage(location=loc, base_url=loc)
        filename = fs.save(myfile.name, myfile)
        # uploaded_file_url = fs.url(filename)
        Users.objects.filter(user_email=request.user.email).update(user_pic="" + filename)
        return HttpResponseRedirect(request.META['HTTP_REFERER'])
    return HttpResponseRedirect(request.META['HTTP_REFERER'])


@login_required
def user(request, uid=1):
    profile = getProfile(email=request.user.email)
    return render_to_response('visitor.html',
                              {'user': profile, 'visitor': Users.objects.get(user_id=uid)})


@login_required
def accountsettings(request):
    profile = getProfile(email=request.user.email)
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


@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/')


@login_required
def findfriends(request):
    if request.method == 'POST':
        profile = Users.objects.get(user_email=request.user.email)
        query = request.POST.get('q')
        friends = Users.objects.filter(user_name__icontains=query)
        dictionaries = [obj.as_dict() for obj in friends]

        req = Requests.objects.filter(to_f=profile.user_id)
        dictionary = [obj.as_dict() for obj in req]
        data = [dictionaries] + [dictionary]
        return HttpResponse(json.dumps(data), content_type='text/html')
    else:
        return HttpResponse('')


@login_required
def frequest(request):
    if request.method == 'POST':
        friend_id = request.POST.get('friend_1')
        profile = getProfile(email=request.user.email)
        friend_name = Users.objects.get(user_id=friend_id).user_name
        friend_req = Requests(to_f=profile.user_id, from_f=friend_id, uid=friend_id, status=0,
                              date_sent=datetime.now(), from_user=friend_name)
        friend_req.save()
        return HttpResponse('ok')
    else:
        return HttpResponse('')


@login_required
def notifications(request):
    notifs = []
    profile = getProfile(email=request.user.email)
    req = Requests.objects.filter(to_f=profile.user_id, status=0)
    request = []
    for name in req:
        user_pic = Users.objects.get(user_id=name.from_f).user_pic
        udict = {"from_f": name.from_f, "from_user": name.from_user,
                 "from_user_pic": user_pic}
        request.append(udict)
    msgs = Messages.objects.filter(to_f=profile.user_id, status='unread')
    msg = []
    for message in msgs:
        user_pic = Users.objects.get(user_id=message.from_f).user_pic
        mdict = {"message_id": message.message_id, "from_f": message.from_f,
                 "from_user": message.from_user, "message": message.message,
                 "from_user_pic": user_pic}
        msg.append(mdict)
    logger.info(notifs)
    notifs.append(request)
    notifs.append(msg)
    return HttpResponse(json.dumps(notifs), content_type='text/html')


@login_required
def connect(request, method, user_id):
    result = ''
    profile = getProfile(email=request.user.email)
    if method == 'accept':
        result = Requests.objects.filter(to_f=profile.user_id, from_f=user_id).update(status=1)
    elif method == 'block':
        result = Requests.objects.filter(to_f=profile.user_id, from_f=user_id).update(status=2)
    elif method == 'decline':
        result = Requests.objects.filter(to_f=profile.user_id, from_f=user_id).update(status=3)
    elif method == 'hide':
        result = Requests.objects.filter(to_f=profile.user_id, from_f=user_id).update(status=4)

    return HttpResponse(result)


@login_required
def Connections(request):
    data = []
    profile = getProfile(email=request.user.email)
    friends = Requests.objects.filter(to_f=profile.user_id, status=1)
    for friend in friends:
        q = Users.objects.extra(where=['user_id=%s'], params=[str(friend.from_f)])
        data.append(q.only("user_id", "user_fname", "user_lname", "user_pic", "user_about"))
    return render(request, 'connections.html', {'friends': data, 'user': profile})


@login_required
@csrf_exempt
def messages(request):
    if request.method == 'POST':
        if request.POST['recipient']:
            message = request.POST.get('message')
            recipient = request.POST.get('recipient')
            profile = getProfile(email=request.user.email)
            msg = Messages(to_f=recipient, from_f=profile.user_id,
                           from_user=profile.user_fname + " " + profile.user_lname,
                           status='unread', message=message, date_sent=datetime.now())
            msg.save()
            return HttpResponseRedirect(request.META['HTTP_REFERER'])
        elif request.POST['read']:
            return HttpResponseRedirect(request.META['HTTP_REFERER'])
    else:
        return HttpResponseRedirect(request.META['HTTP_REFERER'])


# Auxiliary Functions
def getProfile(email='', uid=''):
    if uid == '':
        return Users.objects.get(user_email=email)
    else:
        return Users.objects.get(user_id=uid)


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
