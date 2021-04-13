---

title: '3 façons d&#039;utiliser une police d&#039;écriture &quot;exotique&quot; sur un site Web'
date: 2009-10-17T18:04:13+00:00
author: Ange Chierchia
layout: post

permalink: /blog/3-facons-dutiliser-une-police-decriture-exotique-sur-un-site-web/
img_article:
  - /contents/uploads/fontsthumb.jpg
categories: "Front-End"
---
Dans ce nouvel article, nous allons voir comment utiliser une police d&rsquo;écriture dite éxotique, c&rsquo;est à dire qui n&rsquo;est normalement pas destinée à une utilisation sur le Web.<!--more-->

## D&rsquo;abord, quelles sont les polices d&rsquo;écriture ou fonts en anglais utilisées généralement sur Internet?

Eh bien il n&rsquo;y en a pas une dizaine! En effet, lorsqu&rsquo;on parcours un peu le Web on se rend compte que les polices utilisées sont le plus souvent Times New Roman, Times, Helvetica, Verdana, Arial et Trebuchet, et ceci pour une bonne raison :  ce sont toutes des polices intégrées d&rsquo;origine dans nos ordinateurs, que ce soit Mac ou PC.

## Maintenant, qu&rsquo;est-ce qu&rsquo;une font exotique?

Une police d&rsquo;écriture exotique ce sont toute les fonts que l&rsquo;on peut trouvées en téléchargement sur des sites comme le très connu Dafont.com qui propose de nombreuse polices en tout genre à installé sur l&rsquo;ordinateurs. C&rsquo;est d&rsquo;ailleur une très bonne ressource pour les designer web et autre graphiste car ces polices permettent de diversifier nos travaux. La police que j&rsquo;utilise d&rsquo;ailleurs pour les titres de mes articles est <a title="Télécharger la police d'écriture Qlassik" href="http://www.dafont.com/qlassik.font" target="_blank">la font Qlassik disponible gratuitement sur sur Dafont</a>.

Maintenant qu&rsquo;on sait çà, voyons voir comment l&rsquo;utiliser sur nos sites Internet.

## Comment utiliser une police exotique sur Internet?

Il faut savoir qu&rsquo;il y a plusieurs façon de mettre en oeuvre une telle police sur un site Internet, notament en utilisant Javascript, Flash, les CSS3, ou encore une image.

Commençons d&rsquo;abord par la methode la plus simple à mettre en place, mais pas forcement la plus pratique : l&rsquo;utilisation d&rsquo;images

### 1ère methode :Remplacer du texte par une image avec les CSS

Il faut savoir que cette technique n&rsquo;est pas adaptée suivant l&rsquo;utilisation qu&rsquo;on en fait. En effet, cette technique est utile pour par exemple remplacer le titre de notre site par notre logo. Au contraire, utiliser ce procédé pour remplacer le titre des articles d&rsquo;un blog est une chose vraiment fastidieuse et demandant vraiment trop de travail.

Ici sur AngeChierchia.com le logo est enfait une balise <h1> avec un identifiant afin de stylisé le texte entre les balises <h1> et </h1>, dont voici le CSS :

<pre class="brush:css">h1#logo {

background-image:url(images/logo.png);

background-repeat:no-repeat;

width:368px; height:84px;

display:block;

float:left;

text-indent:-999px;

border:none;

}</pre>

Les propriétés importantes ici, sont background-image qui permet de mettre une image de fond, width et height qui permettent de dimensionner la zone de notre H1, et text-indent: qui permet de dire à notre balise H1 que le texte qu&rsquo;elle contient doit être indenté, ici le texte sera décalé de 999 pixels à gauche donc non visible.

### 2ème methode : remplacer du texte en utilisant Javascript et Cufón ou Flash et sIFR

La seconde methode est celle qui est le plus répendue actuellement, on l&rsquo;appelle aussi Advanced Image Remplacement (remplacement par l&rsquo;image avancé). Ici on utilise plus du tout CSS et une image, mais plutot Javascript si on choisi d&rsquo;utiliser le script <a title="Site officiel de Cufón" href="http://cufon.shoqolate.com/" target="_blank">Cufón</a>, ou encore Flash si on utilise [sIFR](http://wiki.novemberborn.net/sifr/ "Site officiel de sIFR").

Ici, je ne vais pas vous montrer comment utiliser sIFR ou Cufón, on verra çà dans un prochain article. Sachez juste que sur ce blog j&rsquo;utilise Cufón pour styliser mes balises h1, h2 et h3.

### 3ème methode : la règle @font-face de CSS3

Bien que cette methode soit la plus récente et la plus simple à mettre en place, certaines polices ainsi que certain type de fichier ne sont pas bien supporté. Pour utiliser notre police on doit donc d&rsquo;abord la déclarer dans notre feuille de style en utilisant la règle @font-face qui permet de dire à notre site d&rsquo;utilisé la police se trouvant à tel endroit sur notre serveur. En quelque sort c&rsquo;est l&rsquo;équivalent de la propriété background-image.

Une fois la police déclarée, on pourra l&rsquo;utilisé avec la propriété font-family.

<pre class="brush:css">@font-face { //on déclare notre police

font-family: "Qlassik";

src : url("chemin/vers/Qlassik.otf");

}

h1 { //on utilise notre police pour tous les élément h1

font-family: "Qlassik", helvetica, arial;

font-size: 24px;

}</pre>

## Télécharger des polices d&rsquo;écriture

  * <a href="http://www.dafont.com" target="_blank">Dafont.com</a>
  * <a href="http://www.urbanfonts.com/" target="_blank">UrbanFonts</a>
  * <a href="http://betterfonts.com/" target="_blank">Better Fonts</a>
  * <a href="http://fawnt.com/fonts/" target="_blank">Fawnt</a>