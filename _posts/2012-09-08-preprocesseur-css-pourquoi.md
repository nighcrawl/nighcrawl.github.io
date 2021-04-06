---

title: Quel intérêt à utiliser un pré-processeur CSS ?
date: 2012-09-08T12:30:14+00:00
author: Ange Chierchia
layout: post

permalink: /blog/preprocesseur-css-pourquoi/
---
Ces derniers mois on parle constamment de pré-processeur CSS tel que LESS ou SASS, en nous disant que ces pré-processeurs révolutionnent l&rsquo;écriture de nos feuilles de styles. D&rsquo;accord, mais comment ? Et pourquoi devrait-on les utiliser au détriment de nos bonnes vieilles CSS &laquo;&nbsp;de base&nbsp;&raquo; ?

Ça n&rsquo;engage que moi, mais je ne vois pas, à l&rsquo;heure actuelle, ce que pourrait m&rsquo;apporter de tels outils. D&rsquo;accord, on a la possibilité de créer des semblants de fonctions afin d&rsquo;éviter de  répéter 1000 fois une propriété CSS3 qui n&rsquo;est pas nativement interprétée par tous les navigateurs.

Mais franchement, en 2012 a-t-on vraiment envie de s&#8217;embêter avec les IE 6-8 et autres navigateurs d&rsquo;anciennes générations ? Et puis même, il y a de très bons outils qui font ça pour nous, si vraiment on veut s&#8217;embêter—notamment [Prefix free de Lea Verou](http://leaverou.github.com/prefixfree/ "Débarassez-vous des préfixes vendeur CSS") ou encore [Prefixr](http://prefixr.com "Nettuts+ Prefixr ").

Là où je vois l&rsquo;intérêt d&rsquo;un tel outil, c&rsquo;est pour une famille de sites—du style du réseau Tut+—lorsque le design reste le même et que seul le code couleur change. Ça leur permet effectivement de gagner un temps fou. Je ne sais pas pour vous, mais chaque site Web que je conçois a une &laquo;&nbsp;mise en page&nbsp;&raquo; qui lui est propre. Mais même ici, si vous avez l&rsquo;éditeur de texte qui va bien, un simple &laquo;&nbsp;chercher/remplacer&nbsp;&raquo; fera très bien le boulot.

Bref. En écrivant ce petit billet, j&rsquo;attends surtout vos avis sur de tels outils. Dans quelle mesure utilisez vous un pré-processeur CSS ? N&rsquo;avez vous pas peur d&rsquo;oublier comment écrire de vraies CSS avec ces nouvelles syntaxes, à l&rsquo;instar de jQuery pour le JavaScript ?