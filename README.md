# Pseudo Localization
> Web app to generate pseudo-localized strings for pseudo localization test
>
> React, Node.js, Express, HTML, CSS


<hr>

## Try it for yourself!
deployed via Heroku at [Pseudo Localization Tool](https://pseudo-localization.herokuapp.com/)  

<hr>

## API Configuration
* URL : https://pseudo-localization.herokuapp.com
* URI : /api/v2/pseudo
* method : POST

{"inputStr":"I want this text to be localized",

"inputPrefix":"_[[",

"inputSuffix":"]]",

"inputIdDigits":6
}

* <Note> about the string id (# of digits of id):
  sha256 hash is used for string id. Due to the conversion from hex to integer and then using modulus to make the desired id, some collisions are possible.

<hr>

![Picture](https://firebasestorage.googleapis.com/v0/b/pseudo-localization.appspot.com/o/images%2Fpseudo-localization_v2.PNG?alt=media&token=12b57405-ab21-4963-8a0a-c2dfb81e3e00)


