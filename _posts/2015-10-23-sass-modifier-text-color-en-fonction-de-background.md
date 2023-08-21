---

title: 'Ajuster <code>text-color</code> en fonction de <code>background</code> avec Sass'
date: 2015-10-23T18:23:13+00:00
author: Ange Chierchia
layout: post
redirect_from: /blog/sass-modifier-text-color-en-fonction-de-background/
link: http://thesassway.com/intermediate/dynamically-change-text-color-based-on-its-background-with-sass
format: link
categories: "Front-End"
---
Dans un article de The Sass Way, Sebastian Ekström nous montre comment, avec Sass, garantir la meilleure lisibilité possible à vos textes pour une couleur de fond donnée.

Pour cela, il écrit une fonction Sass qui retournera une couleur différente en fonction de la couleur qui lui sera passée en paramètre. Cette fonction vérifie tout simplement le taux de luminosité de la couleur qu&rsquo;elle reçoit et retourne une couleur contrastée en conséquence. Si sa luminosité est supérieure à 50%, la fonction retournera une couleur sombre, sinon une couleur claire.

<a href="http://thesassway.com/intermediate/dynamically-change-text-color-based-on-its-background-with-sass" target="_blank">Lisez son article</a> sur The Sass Way, pour voir comment il fait ça.  Sa solution est toute simple mais efficace.