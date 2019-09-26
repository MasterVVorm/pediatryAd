from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json.decoder
# Create your views here.


def index(request):
    return JsonResponse(status=200, data={"result": "OK"})


@csrf_exempt
def login(request):
    if(request.method == 'POST'):
        try:
            recived_json_data = json.loads(request.body)
            login = recived_json_data['login']
            password = recived_json_data['password']
        except:
            return JsonResponse(status=400, data={"error": "no body"})

        try:
            user = User.objects.get(login=login)
        except:
            return JsonResponse(status=404, data={"error": "no user with this login"})

        if(user.password == password):
            token = user.token
            return JsonResponse(status=200, data={"token": user.token})
        else:
            return JsonResponse(status=400, data={"error": "wrong password"})
