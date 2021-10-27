---

title: Utiliser une fonte personnalisée avec Cufón
date: 2009-12-19T01:53:19+00:00
author: Ange Chierchia
layout: post

permalink: /blog/utiliser-une-fonte-personnalisee-avec-cufon/
img_article:
  - /contents/uploads/cufon-thumb.jpg
image: /contents/uploads/2010/04/cufonfonts.jpg
categories: "Front-End"
---
Dans un [précédent billet](http://chierchia.fr/webdesign/3-facons-dutiliser-une-police-decriture-exotique-sur-un-site-web/ "3 façons d’utiliser une police d’écriture “exotique” sur un site Web") j&rsquo;avais mentionné Cufón et sIFR, comme moyen d&rsquo;utiliser des polices personnalisées sur nos sites Internet, de bonnes alternatives à la propriété CSS3 @font-face qui n&rsquo;est pas prise en compte par tout les navigateurs web. Aujourd&rsquo;hui je vais vous montrer comment utilisé vos polices d&rsquo;écriture préférées sur votre site Web en utilisant Cufón.<!--more-->

## Qu&rsquo;est-ce que c&rsquo;est Cufón ?

Cufón est un simple fichier Javascript qui se charge de remplacer n&rsquo;importe quel texte par une image en utilisant la police de votre choix. Cufón est aussi une très bonne alternative à sIFR, qui fait exactement la même chose mais est beaucoup plus lourd et moins facile à configurer.

## Comment le mettre en oeuvre ?

### Téléchargement du script de remplacement

La première étape à effectuer pour pouvoir utiliser Cufón, c&rsquo;est bien entendu de télécharger le fameux fichier <a title="Télécharger Cufon" href="http://cufon.shoqolate.com/js/cufon-yui.js" target="_blank">disponible à cette adresse</a>.

### Conversion de notre police

Ensuite, nous allons devoir générer un fichier Javascript qui ne contiendra ni plus ni moins que les information de notre police, pour cela, le site de Cufón dispose d&rsquo;un <a title="Générateur de polices Cufon" href="http://cufon.shoqolate.com/generate/" target="_blank">générateur de police</a> dans lequel on va pouvoir télécharger le(s) fichier(s) de notre police.

<p style="text-align: center;">
  <a href="http://i1.wp.com/chierchia.fr/site/wp-content/uploads/Capture-d’écran-2009-12-19-à-00.14.53.jpg"><img class="aligncenter size-full wp-image-534" title="Cufón, selection d'une police d'écriture personnalisé" src="http://i1.wp.com/chierchia.fr/site/wp-content/uploads/Capture-d’écran-2009-12-19-à-00.14.53.jpg?resize=555%2C514" alt="Capture d’écran 2009-12-19 à 00.14.53" data-recalc-dims="1" /></a>
</p>

On devra ensuite choisir quels lettres et symboles inclure dans notre fichier généré, et d&rsquo;autres options facultatives. Une fois les conditions d&rsquo;utilisation acceptées, un petit clique sur le bouton de validation et l&rsquo;on pourra télécharger notre police d&rsquo;écriture converti au format JavaScript.

<p style="text-align: center;">
  <a href="http://i0.wp.com/chierchia.fr/site/wp-content/uploads/Capture-d’écran-2009-12-19-à-00.20.35.jpg"><img class="aligncenter size-full wp-image-535" title="Cufón, selection des options de la police d'écriture" src="http://i0.wp.com/chierchia.fr/site/wp-content/uploads/Capture-d’écran-2009-12-19-à-00.20.35.jpg?resize=555%2C515" alt="Cufón, selection des options de la police d'écriture" data-recalc-dims="1" /></a>
</p>

Voilà, on a déjà fait le plus gros du travail. Éprouvant non? ^^

### Installation de Cufón

Ouvrez bien les yeux ça va aller vite maintenant, vous n&rsquo;avez qu&rsquo;a inclure le code suivant entre vos balises <head></head> :

<pre class="brush:html">&lt;head&gt;
	&lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8"&gt;
	&lt;script src="cufon-yui.js" type="text/javascript"&gt;&lt;/script&gt; //le script Cufon
	&lt;script src="Makem_300.font.js" type="text/javascript"&gt;&lt;/script&gt; //notre police converti
	&lt;script type="text/javascript"&gt;
		Cufon.replace('h1'); //remplacer les h1 par notre police
	&lt;/script&gt;
&lt;/head&gt;</pre>

Et c&rsquo;est terminé tous les élément H1 utiliseront notre police personnalisée! Simple non?