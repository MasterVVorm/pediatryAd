from random import randint


def formatBool(str):
    print(str)
    return True if str == 'true' else False


def generateArrayOfAds(ads):
    sum_of_indexes = 0
    coef = 20
    final_array = []

    for ad in ads:
        sum_of_indexes += ad.index

    while len(final_array) < 10:
        rand = randint(1, sum_of_indexes * coef)
        step = 0
        
        for ad in ads:
            if step + ad.index * coef > rand and (step + ad.index * coef) - rand < ad.index * coef:
                if not checkArrayContainsAd(final_array, ad.id):
                    final_array.append(ad)
            step += ad.index * coef

    return final_array


def checkArrayContainsAd(ads, id):
    contains = False

    for ad in ads:
        if ad.id == id:
            contains = True

    return contains
