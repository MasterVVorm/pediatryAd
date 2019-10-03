from django.http import JsonResponse, HttpResponse
from ..models import Advertisement, ImageMedia
from backend.utils import utils

def get_ads(request):
    if request.method == 'GET':
        response = {
            'ads': []
        }
        ads = utils.generateArrayOfAds(Advertisement.objects.all()) 
        
        for ad in ads:
            images = ImageMedia.objects.filter(advertisement=ad)
            
            response['ads'].append({
                "title": ad.title,
                "description": ad.description,
                "image_url": "http://" + request.META['HTTP_HOST'] + images[0].image.url,
                "show_image": ad.show_image,
                "video_url": ad.video_url
            })

        return JsonResponse(response)
    else:
        return HttpResponse(status=405)

