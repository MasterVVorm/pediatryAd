from backend.constants.response_constants import ResponseConstants
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import Advertisement, ImageMedia
from backend.apps.user.models import User
from backend.utils.utils import formatBool
from datetime import datetime, timedelta
from django.utils import timezone
import json
import calendar
import time

@csrf_exempt
def update_title(request):
    if request.method == 'POST':
        try:
            recieved_data = json.loads(request.body)
            token = recieved_data['token']
            ad_id = recieved_data['id']
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
            ad_id = recieved_data['id']
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
            ad_id = recieved_data['id']
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
            id = recieved_data['id']
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

        try:
            user = User.objects.get(token=token)
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

        try:
            currentTime = calendar.timegm(datetime.utcnow().utctimetuple())
            ad = Advertisement.objects.get(id=int(id))

            if currentTime > calendar.timegm(ad.end_time.utctimetuple()) and not ad.active:
                new_end_time = datetime.fromtimestamp(
                    int(currentTime), tz=timezone.utc) + timedelta(days=1)
                new_end_time = new_end_time.replace(hour=0, minute=0) + timedelta(hours=-3)
                ad.end_time = new_end_time
                ad.save(update_fields=['end_time'])
            ad.active = not ad.active
            ad.save(update_fields=['active'])
            return JsonResponse({"end_time": calendar.timegm(ad.end_time.utctimetuple())})
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
            ad_id = recieved_data['id']
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
def update_product_url(request):
    if request.method == 'POST':
        try:
            recieved_data = json.loads(request.body)
            token = recieved_data['token']
            ad_id = recieved_data['id']
            product_url = recieved_data['product_url']
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

        try:
            user = User.objects.get(token=token)
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

        try:
            ad = Advertisement.objects.get(id=int(ad_id))
            ad.product_url = product_url
            ad.save(update_fields=['product_url'])
            return HttpResponse()
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_AD_ID})
    else:
        return HttpResponse(status=405)


@csrf_exempt
def update_index(request):
    if request.method == 'POST':
        try:
            recieved_data = json.loads(request.body)
            token = recieved_data['token']
            ad_id = recieved_data['id']
            index = recieved_data['index']
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

        try:
            user = User.objects.get(token=token)
        except:
            return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

        try:
            ad = Advertisement.objects.get(id=int(ad_id))
            ad.index = int(index)
            ad.save(update_fields=['index'])
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
            ad_id = recieved_data['id']
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
