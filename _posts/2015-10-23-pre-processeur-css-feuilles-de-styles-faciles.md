---

title: 'Pré-processeur CSS : nos feuilles de styles faciles'
date: 2015-10-23T08:45:08+00:00
author: Ange Chierchia
layout: post
permalink: /blog/pre-processeur-css-feuilles-de-styles-faciles/
image: /contents/uploads/image-825x510.png
categories: "Front-End"
---
Il y a déjà <del>plusieurs mois</del> trois ans (trois ans !!), j&rsquo;avais écris un billet d&rsquo;humeur à propos tout le foin que l&rsquo;on faisait sur [les pré-processeurs CSS](http://chierchia.fr/blog/preprocesseur-css-pourquoi/ "Quel intérêt à utiliser un préprocesseur CSS ?") et leur utilisation que je trouvais abusive.

À l&rsquo;époque je n&rsquo;avais testé que LESS, que je trouvais beaucoup plus accessible, moins compliqué à mettre en place en fait. J&rsquo;avais aussi acheté le bouquin de Kaelig, _<a title="CSS maintenables avec Sass & Compass" href="http://www.css-maintenables.fr/" target="_blank">CSS maintenables</a>_, que je n&rsquo;ai d&rsquo;ailleurs toujours pas commencé, trop occupé à lire _Cinquantes nuances de Grey_ et autres _Walking Dead_ &#8230;<!--more-->

Et puis aux alentour de la mi-juillet 2013, j&rsquo;ai eu en charge la conception d&rsquo;une plateforme intranet pour <a href="http://www.arcus.lu" target="_blank">l&rsquo;association luxembourgeoise Arcus asbl</a>. Le projet était tellement conséquent que je me suis dis que j&rsquo;avais peut-être enfin l&rsquo;occasion me faire la main sur un pré-processeur CSS. L&rsquo;année précédente, nous avions déjà conçu le site internet et avec le recul, vu la feuille de style, on aurait déjà pu utiliser un pré-processeur, ne serait-ce que pour avoir une meilleure organisation des règles CSS et les rendre encore plus maintenables.

L&rsquo;arrivée de ce nouveau projet était donc le moment idéal pour vraiment me mettre aux pré-processeurs CSS. La première fois que j&rsquo;ai eu l&rsquo;occasion de jouer avec un pré-processeur CSS, je m&rsquo;était arrêté sur LESS que je trouvais moins difficile à mettre en place à l&rsquo;époque puisqu&rsquo;on pouvait l&rsquo;utiliser sans installer Node.js (ou Ruby pour Sass)  ni utiliser la ligne de commande pour compiler les feuilles de styles. Un simple fichier JavaScript à ajouté et c&rsquo;était fini ! malheureusement je n&rsquo;avais pas du tout accroché.

Je décidais donc que cette fois-ci, il était temps de sauter le pas ! Je me suis tourné vers Sass, qui m&rsquo;avait un peu fait peur à cause de sa mise en place, que je trouvais fastidieuse à l&rsquo;époque (obligation d&rsquo;installer Ruby, installation via ligne de commande, etc.).

Et je ne regrette pas du tout d&rsquo;avoir sauté le pas ! Utiliser un pré-processeur CSS a permis à mes feuilles de styles de gagner en lisibilité, d&rsquo;être plus facile et plus rapide à modifier et surtout mieux structurées, ce qui me permet de générer plusieurs feuilles de styles partageant des règles communes, sans pour autant réécrire une seule ligne. Pratique.

Ces derniers temps j&rsquo;ai notamment utilisé Sass et Compass afin de générer les feuilles de styles des différents templates d&rsquo;impression utilisés dans notre application <a href="http://www.ibakus.com" target="_blank">IBAKUS®KYC</a>.

Si, comme moi à l&rsquo;époque, vous êtes réticent à utiliser un pré-processeur CSS, essayez Sass et Compass sur un projet d&rsquo;assez grande envergure, si vous en avez l&rsquo;occasion, vous verrez qu&rsquo;il vous simplifierons grandement la tâche.

Je pense d&rsquo;ailleurs publier ici quelques petits trucs et astuces concernant Sass dans les prochaines semaines, histoire de relancer un peu le bousin.