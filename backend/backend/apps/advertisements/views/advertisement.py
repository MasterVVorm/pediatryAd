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
def advertisement(request):
    if request.method == 'GET':
        return get_advertisement(request)
    elif request.method == 'POST':
        return create_advertisement(request)
    elif request.method == 'DELETE':
        return delete_adverisement(request)
    else:
        return HttpResponse(status=405)


def create_advertisement(request):
    try:
        post = request.POST
        files = request.FILES
        token = post['token']
        title = post['title']
        description = post['description']
        video_url = post['video_url']
        product_url = post['product_url']
        image = files['image']
        start_time = datetime.fromtimestamp(
            int(post['start_time']), tz=timezone.utc)
        end_time = datetime.fromtimestamp(
            int(post['end_time']), tz=timezone.utc)
        index = post['index']
        active = post['active']
        show_image = post['show_image']
    except:
        return JsonResponse(status=404, data={"error": "body is not valid"})

    try:
        user = User.objects.get(token=token)
    except:
        return JsonResponse(status=400, data={"error": "token is invalid"})

    try:
        ads = Advertisement(title=title, description=description, product_url=product_url, video_url=video_url,
                            start_time=start_time, end_time=end_time, index=index, active=formatBool(active), show_image=formatBool(show_image))
        ads.save()
        image = ImageMedia.objects.create_image_media(
            image=image, advertisement=ads)
        image.save()
    except:
        return JsonResponse(status=400, data={"error": "something went wrong"})

    return HttpResponse(status=201)


def delete_adverisement(request):
    try:
        recieved_data = json.loads(request.body)
        id = recieved_data['id']
        token = recieved_data['token']
    except:
        return JsonResponse(status=400, data={"error": "wrong body"})

    try:
        user = User.objects.get(token=token)
    except:
        return JsonResponse(status=400, data={"error": "token is invalid"})

    try:
        ad = Advertisement.objects.get(id=id)
        ad.delete()
    except:
        return JsonResponse(status=400, data={"error": "this object is almost deleted"})

    return HttpResponse(status=200)


def get_advertisement(request):
    try:
        recieved_data = json.loads(request.body)
        token = recieved_data['token']
        ad_id = recieved_data['ad_id']
    except:
        return JsonResponse(status=400, data={"error": "wrong body"})

    try:
        user = User.objects.get(token=token)
    except:
        return JsonResponse(status=400, data={"error": "token is invalid"})

    try:
        ad = Advertisement.objects.get(id=ad_id)
    except:
        return JsonResponse(status=400, data={"error": "advertisement id is invalid"})

    try:
        images = ImageMedia.objects.filter(advertisement=ad)
        image_array = []
        for image in images:
            image_array.append({
                "image_id": image.id,
                "url": image.image.url
            })
    except:
        image_array = None
    response = {
        "id": ad.id,
        "title": ad.title,
        "description": ad.description,
        "images": image_array,
        "show_image": ad.show_image,
        "video": ad.video_url,
        "active": ad.active,
        "show_image": ad.show_image
    }


def advertisements(request):
    if request.method == 'GET':
        try:
            response = {
                'ads': []
            }
            ads = Advertisement.objects.all()

            for ad in ads:
                try:
                    images = ImageMedia.objects.filter(advertisement=ad)
                    image_array = []
                    for image in images:
                        image_array.append({
                            "image_id": image.id,
                            "url": "http://" + request.META['HTTP_HOST'] + image.image.url
                        })
                    response['ads'].append({
                        "id": ad.id,
                        "title": ad.title,
                        "description": ad.description,
                        "images": image_array,
                        "show_image": ad.show_image,
                        "video": ad.video_url,
                        "start_time": calendar.timegm(ad.start_time.utctimetuple()),
                        "end_time": calendar.timegm(ad.end_time.utctimetuple()),
                        "active": ad.active,
                        "show_image": ad.show_image,
                    })

                except:
                    pass

            return JsonResponse(response)
        except:
            return JsonResponse(status=400, data={"error": "something went wrong"})
    else:
        return HttpResponse(status=405)
