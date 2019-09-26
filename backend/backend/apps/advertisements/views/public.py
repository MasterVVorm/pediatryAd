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
            image_urls = []
            for image in images:
                image_urls.append(request.META['HTTP_HOST'] + image.image.url)
            response['ads'].append({
                "id": ad.id,
                "title": ad.title,
                "description": ad.description,
                "image_url": image_urls,
                "show_image": ad.show_image,
                "video_url": ad.video_url
            })

        return JsonResponse(response)
    else:
        return HttpResponse(status=405)

