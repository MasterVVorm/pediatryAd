from backend.constants.response_constants import ResponseConstants
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import Advertisement, ImageMedia
from backend.apps.user.models import User
from backend.utils.utils import formatBool
from datetime import datetime
from django.utils import timezone
import json
import calendar


@csrf_exempt
def update_title(request):
    if request.method == 'POST':
        try:
            recieved_data = json.loads(request.body)
            token = recieved_data['token']
            ad_id = recieved_data['ad_id']
            title = recieved_data['title']
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

        try:
            user = User.objects.get(token=token)
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

        try:
            ad = Advertisement.objects.get(id=int(ad_id))
            ad.title = title
            ad.save(update_fields=['title'])
            return HttpResponse()
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_AD_ID})
    else:
        return HttpResponse(status=405)


@csrf_exempt
def update_description(request):
    if request.method == 'POST':
        try:
            recieved_data = json.loads(request.body)
            token = recieved_data['token']
            ad_id = recieved_data['ad_id']
            desc = recieved_data['description']
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

        try:
            user = User.objects.get(token=token)
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

        try:
            ad = Advertisement.objects.get(id=int(ad_id))
            ad.description = desc
            ad.save(update_fields=['description'])
            return HttpResponse()
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_AD_ID})
    else:
        return HttpResponse(status=405)


@csrf_exempt
def update_show_image(request):
    if request.method == 'POST':
        try:
            recieved_data = json.loads(request.body)
            token = recieved_data['token']
            ad_id = recieved_data['ad_id']
            show_image = recieved_data['show_image']
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

        try:
            user = User.objects.get(token=token)
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

        try:
            ad = Advertisement.objects.get(id=int(ad_id))
            ad.show_image = show_image
            ad.save(update_fields=['show_image'])
            return HttpResponse()
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_AD_ID})
    else:
        return HttpResponse(status=405)


@csrf_exempt
def update_active(request):
    if request.method == 'POST':
        try:
            recieved_data = json.loads(request.body)
            token = recieved_data['token']
            ad_id = recieved_data['ad_id']
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

        try:
            user = User.objects.get(token=token)
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

        try:
            ad = Advertisement.objects.get(id=int(ad_id))
            ad.active = not ad.active
            ad.save(update_fields=['active'])
            return HttpResponse()
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_AD_ID})
    else:
        return HttpResponse(status=405)


@csrf_exempt
def update_video_url(request):
    if request.method == 'POST':
        try:
            recieved_data = json.loads(request.body)
            token = recieved_data['token']
            ad_id = recieved_data['ad_id']
            video_url = recieved_data['video_url']
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

        try:
            user = User.objects.get(token=token)
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

        try:
            ad = Advertisement.objects.get(id=int(ad_id))
            ad.video_url = video_url
            ad.save(update_fields=['video_url'])
            return HttpResponse()
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_AD_ID})
    else:
        return HttpResponse(status=405)


@csrf_exempt
def update_times(request):
    if request.method == 'POST':
        try:
            recieved_data = json.loads(request.body)
            token = recieved_data['token']
            ad_id = recieved_data['ad_id']
            start_time = datetime.fromtimestamp(
                int(recieved_data['start_time']), tz=timezone.utc)
            end_time = datetime.fromtimestamp(
                int(recieved_data['end_time']), tz=timezone.utc)
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

        try:
            user = User.objects.get(token=token)
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

        ad = Advertisement.objects.get(id=int(ad_id))
        ad.start_time = start_time
        ad.end_time = end_time
        ad.save(update_fields=['start_time', 'end_time'])
        return HttpResponse()

    else:
        return HttpResponse(status=405)
