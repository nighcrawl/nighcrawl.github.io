---
title: 'Créer un menu horizontal avec les &quot;Sprites CSS&quot;'
date: 2009-06-04T17:34:15+00:00
author: Ange Chierchia
layout: post
permalink: /blog/creer-un-menu-horizontal-avec-des-sprites-css/
img_article:
  - /contents/uploads/thumb_sprites.jpg
---
Dans ce nouvel article, on va voir comment grâce aux CSS et à la technique des Sprites, on va pouvoir créer un menu horizontal, ou tout autre élément, avec un effet de rollover sans utiliser un nombre incalculable d&rsquo;images. Ici, une seule image sera nécessaire!<!--more-->

## Qu&rsquo;est-ce que la technique des Sprites CSS?

Les sprites CSS, sont en fait une sorte d&rsquo;extension de la technique du Rollover CSS. En effet, à l&rsquo;instar du Rollover CSS, les Sprites permettent de n&rsquo;avoir qu&rsquo;une seule image pour les différents états (normal, survolé, etc&#8230;) d&rsquo;un bouton, d&rsquo;une image, ou tout autre élement graphique. Là où les sprites vont plus loins c&rsquo;est la possibilités de n&rsquo;avoir qu&rsquo;un seul gros fichier image contenant toutes les icones, et autre éléments d&rsquo;interface. Cette technique est notamment utilisée par des sites dits &laquo;&nbsp;user-friendly&nbsp;&raquo;.

## Les Sprites appliquées à un menu horizontal

Appliquer la technique des Sprites pour réaliser un menu horizontal (ou vertucal) est une chose vraiment aisée. En effet, grâce à cette technique on pourra mettre les differents états des différents élément du menu dans un seul fichier. L&rsquo;exemple même de cette technique est le menu horizontal du site d&rsquo;Apple :

[<img class="alignnone" alt="" src="http://i1.wp.com/images.apple.com/global/nav/images/globalnavbg.png?resize=471%2C73" data-recalc-dims="1" />](http://i1.wp.com/images.apple.com/global/nav/images/globalnavbg.png)

Ici on voit que chaque éléments du menu à quatre états : normal, survolé, cliqué, actif.

Dans notre exemple nous allons utiliser un menu avec seulement deux états : normal, survolé. notre troisième état (actif) utilisera la même image que notre état survolé.

Allez, c&rsquo;est parti.

## Le code HTML

    <ul class="nav">
      <li><a href="#home">Home</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#references">Références</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>

Ici on engloble notre menu dans une structure de liste non-ordonnée (<ul></ul>) avec un identifiant #nav, on aurait aussi pu utiliser une classe .nav pour l&rsquo;élément ul. Chaque élément de liste (<li></li>) a ensuite son propre identifiant, ce qui va nous permettre de bien positionner notre image pour chaque élément.

## La feuille de style

    .nav {
      background-image: url(../img/nav_main.png);
      height: 30px;
      list-style-type: none;
      margin: 0 auto 10px;
      padding: 0;
      position: relative;
      width: 726px;
    }
    .nav li {
      float: left;
    }
    .nav a {
      display: block;
      line-height: 30px;
      overflow: hidden;
      text-align: center;
      text-indent: -9999em;
      width: 97px;
    }
    .nav a:focus, .nav a:hover {
      background-image: url(../img/nav_main.png);
    }
    .nav a[href="#home"]:focus, .nav a[href="#home"]:hover {
      background-position: 0 -30px;
    }
    .nav a[href="#services"]:focus, .nav a[href="#services"]:hover {
      background-position: -97px -30px;
    }
    .nav a[href="#references"]:focus, .nav a[href="#references"]:hover {
      background-position: -194px -30px;
    }
    .nav a[href="#contact"]:focus, .nav a[href="#contact"]:hover {
      background-position: -291px -30px;
    }

On voit ici que tout ce joue avec l&rsquo;attribut background-position qui permet de donner les coordonnées permettant d&rsquo;afficher la bonne partie de l&rsquo;image. Ainsi, comme chaque bouton a les dimensions 97&#215;30, si l&rsquo;on veu afficher l&rsquo;état survolé du troisième élément, nous devrons postionner l&rsquo;image à -30px pour l&rsquo;axe verticale de l&rsquo;image, et -194px pour l&rsquo;axe horizontal (97&#215;97) ainsi on affichera 97px à partir du 195ième pixel de notre image.

<img class="alignnone  wp-image-262" title="dimensions_menu" alt="dimensions_menu" src="/contents/uploads/2009/06/dimensions_menu.jpg?fit=448%2C93" data-recalc-dims="1" />

Pour que le bouton du menu soit activé lorsque l&rsquo;on se trouve sur la page active, il suffira, grâce à notre CSS, de définir un identifiant pour la balise <body> de notre page, ainsi si l&rsquo;on se trouve sur la page Références, notre balise sera par exemple :

    <body id="page-references">

## Fichiers source
[Voir la démo](https://nighcrawl.github.io/css-sprite-menu/) ou [Télécharger les fichiers](https://github.com/nighcrawl/css-sprite-menu).