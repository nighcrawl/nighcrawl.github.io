---

title: 'Plugin jQuery: CuteTime, affichez vos dates comme sur Twitter'
date: 2010-04-11T23:43:22.456Z
author: Ange Chierchia
layout: post

redirect_from: /blog/plugin-jquery-cutetime-affichez-vos-dates-comme-sur-twitter/
image: /contents/uploads/2010/04/cutetimejquery.jpg
categories: "Ressource"
---
Vous rêvez d&rsquo;afficher les dates de vos articles à la façon de Twitter ou encore Facebook, <a title="CuteTime, pour des dates plus &quot;user-friendly&quot;" href="http://tpgblog.com/cutetime/" target="_blank">CuteTime</a> est fait pour vous! CuteTime est un plugin jQuery qui permet de convertir automatiquement des [timestamps](http://fr.wikipedia.org/wiki/Horodatage) en date formatées d&rsquo;une plus joli manière (ex: il y a 2 jours, etc..).<!--more-->

CuteTime peut être utilisé à la fois comme une fonction, et retournera un timestamp tout bien formaté, en gros ce serait l&rsquo;équivalent de la fonction PHP date(&lsquo;d/m/Y&rsquo;) mais en mieux. Ou bien, en l&rsquo;utilisant grâce aux sélecteurs, en modifiant la valeur de l&rsquo;objet par un CuteTime.

## Utilisation

Concrètement, ce plugin s&rsquo;utilise de la façon suivante :

<pre class="brush:js">$(document).ready(function () {
	$('.timestamp').cuteTime();
});</pre>

<pre class="brush:html">&lt;div class="timestamp"&gt;
	2009/10/12 22:11:19
&lt;/div&gt;</pre>

C&rsquo;est aussi simple que ça. Pour plus d&rsquo;information, et voir la documentation complète concernant l&rsquo;utilisation de ce plugin, <a title="jQuery plugin CuteTime" href="http://tpgblog.com/cutetime/" target="_blank">rendez vous sur la page consacrée au plugin</a>.