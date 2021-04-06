---

title: 'Astuce Sass : imbrication de propriétés composites'
date: 2016-01-22T08:15:56+00:00
author: Ange Chierchia
layout: post

permalink: /blog/astuce-sass-imbrication-de-proprietes-composites/
image: /contents/uploads/img_0275.jpeg
---
Cette semaine je lisais _Sass pour les Web designers,_ de <a href="http://simplebits.com" target="_blank">Dan Cederholm</a> et j&rsquo;ai découvert une petite astuce que je ne connaissait pas : l&rsquo;imbrication de propriétés composites.<!--more-->

## Qu&rsquo;est-ce que l&rsquo;imbrication de propriétés composites ?

On sait déjà que les pré-processeurs comme Sass permettent d&rsquo;écrire des règles CSS imbriquées, ce qui permet d&rsquo;éviter les répétitions mais aussi de coller à la structure du code HTML.

L&rsquo;imbrication des propriétés composites permet de faire la même chose avec certaines propriétés CSS composées d&rsquo;un prefixe, comme par exemple toutes les règles d&rsquo;arrière-plan (`background-color`, `background-image`, etc) ou de polices d&rsquo;écriture (`font-size`, `font-style`, etc.). Voilà à quoi ça ressemble en pratique :

<p class="codepen" data-height="268" data-theme-id="0" data-slug-hash="jWYXwZ" data-default-tab="css" data-user="nighcrawl">
  See the Pen <a href="http://codepen.io/nighcrawl/pen/jWYXwZ/">Imbrications de propriétés</a> by Ange Chierchia (<a href="http://codepen.io/nighcrawl">@nighcrawl</a>) on <a href="http://codepen.io">CodePen</a>.
</p>



Cette astuce fonctionnera avec toutes les propriétés composées d&rsquo;un prefixe (`margin`, `padding`, `border`, `background`, `font`, etc.).

Bonne journée !