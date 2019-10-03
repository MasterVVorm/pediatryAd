from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
from backend.constants.response_constants import ResponseConstants
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
            return JsonResponse(status=404, data={"error": "wrong login or password"})

        if(user.password == password):
            token = user.token
            return JsonResponse(status=200, data={"token": user.token})
        else:
            return JsonResponse(status=404, data={"error": "wrong login or password"})


@csrf_exempt
def validate_token(request):
    if request.method == 'POST':
        try:
            recived_json_data = json.loads(request.body)
            token = recived_json_data['token']
        except:
            return JsonResponse(status=400, data={"error": "no body"})

        try:
            user = User.objects.get(token=token)
            return JsonResponse(status=200, data={"token": token})
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

    else:
        return HttpResponse(status=405)
