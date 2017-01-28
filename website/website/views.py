import logging
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.views.decorators import csrf
from django.contrib.auth.forms import UserCreationForm

logger = logging.getLogger('myWebsiteLogHandler')
logger.setLevel(logging.INFO)


def login(request):
    c = {}
    c.update(csrf(request))
    return render_to_response('login.html', c)


def auth_view(request):
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = auth.authenticate(username=username, password=password)

    if user is not None:
        auth.login(request, user)
        return HttpResponseRedirect('/accounts/loggedin')
    else:
        return HttpResponseRedirect('/accounts/invalid')


def loggedin(request):
    return render_to_response('loggedin.html',
                              {'full_name': request.user.username})


def logout(request):
    auth.logout(request)
    return render_to_response('logout.html')


def register_user(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/accounts/register_success')

    args = {}
    args.update(csrf(request))

    args['form'] = UserCreationForm()
    print args
    return render_to_response('register.html', args)


def register_success(request):
    return render_to_response('register_success.html')


def invalid_login(request):
    return


def hello(request):
    values = request.META.items()
    f = open('/root/Documents/Django-Project-Website/web-user.log', 'a+')
    html = []
    for k, v in values:
        html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
    f.write('<table>%s</table>' % '\n\n'.join(html))
    f.close()
    return HttpResponseRedirect('myWebsite')
