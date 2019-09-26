from backend.constants.response_constants import ResponseConstants
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import Advertisement, ImageMedia
from backend.apps.user.models import User
import json
from datetime import datetime


@csrf_exempt
def image(request):
    if request.method == 'POST':
        return add_image_to_advertisement(request)
    elif request.method == 'DELETE':
        return delete_image_from_advertisement(request)
    else:
        return HttpResponse(status=405)


def add_image_to_advertisement(request):
    try:
        post = request.POST
        files = request.FILES
        ad_id = post['ad_id']
        image = files['image']
    except:
        return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

    try:
        advertisement = Advertisement.objects.get(id=ad_id)
        images = ImageMedia.objects.filter(advertisement=advertisement)
        if len(images) < 10:
            imageMedia = ImageMedia.objects.create_image_media(
                image=image, advertisement=advertisement)
            imageMedia.save()
            return HttpResponse(status=201)
        else:
            return JsonResponse(status=400, data={"error": ResponseConstants.BIG_AMOUNT_OF_IMAGES})
    except:
        return JsonResponse(status=400, data={"error": ResponseConstants.SMTHG_WRONG})


def delete_image_from_advertisement(request):
    try:
        recieved_data = json.loads(request.body)
        token = recieved_data['token']
        image_id = recieved_data['image_id']
    except:
        return JsonResponse(status=400, data={"error": ResponseConstants.WRONG_BODY})

    try:
        user = User.objects.get(token=token)
    except:
        return JsonResponse(status=400, data={"error": ResponseConstants.INVALID_TOKEN})

    try:
        image = ImageMedia.objects.get(id=image_id)
        ad = image.advertisement
        images = ImageMedia.objects.filter(advertisement=ad)
        if len(images) > 1:
            image.delete()
            return HttpResponse()
        else:
            return JsonResponse(status=400, data={"error": ResponseConstants.LITL_AMOUNT_OF_IMAGES})
    except:
        return JsonResponse(status=400, data={"error": ResponseConstants.SMTHG_WRONG})
