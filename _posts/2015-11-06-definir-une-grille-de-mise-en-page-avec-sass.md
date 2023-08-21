---

title: Définir une grille de mise en page avec Sass
date: 2015-11-06T20:26:51+00:00
author: Ange Chierchia
layout: post
redirect_from: /blog/definir-une-grille-de-mise-en-page-avec-sass/
image: /contents/uploads/image-825x510.png
categories: "Front-End"
---
Dans mon précédent article, je parlais de [mon expérience des pré-procésseurs](http://chierchia.fr/blog/pre-processeur-css-feuilles-de-styles-faciles/) CSS, et l&rsquo;une des choses bêtes que Sass/Compass m&rsquo;a permis de faire facilement et en quelques lignes a été de définir ma grille de mise en page.

Ma grille de mise en page consistait en six colonnes et des gouttières de 20 pixels entre chaque et un conteneur de 1000 pixels de large. Afin de toujours me laisser le choix de partir sur un nombre de colonne différent, la largeur de colonne est calculée en fonction des autres variables. Voici ce que ça donne :<!--more-->

    $columns: 6;
    $gutter-width: 20px;
    $container-width: 1000px;
    $column-width: ($container-width - (($columns - 1) * $gutter-width))/$columns;

Mon interface devant être adaptée pour ordinateurs et tablettes, j&rsquo;ai préféré utiliser les pourcentages plutôt que les pixels pour définir la taille de mon conteneur et de mes gouttières. Pour ce faire, je n&rsquo;ai pas eu besoin de toucher à ma grille (que l&rsquo;on verra plus tard), seulement à mes variables `$gutter-width` et `$container-width` que j&rsquo;ai passé à `2%` et `100%`, respectivement.

Une fois mes différentes variable instanciées, j&rsquo;ai pu créer les différentes colonnes de ma grille de mise en page avec une boucle `@for` comme celle-ci :

    @for $i from 1 through $columns {
      .col-#{$i}-of-#{$columns} {
        width: ($i * $column-width) + (($i - 1) * $gutter-width);
      }
    }

Une fois compilé, j&rsquo;obtiens les règles CSS suivantes qui définissent la taille pour chaque colonne de la grille :

    .col-1-of-6 {
      width: 15%;
    }

    .col-2-of-6 {
      width: 32%;
    }

    .col-3-of-6 {
      width: 49%;
    }

    .col-4-of-6 {
      width: 66%;
    }

    .col-5-of-6 {
      width: 83%;
    }

    .col-6-of-6 {
      width: 100%;
    }

Pour que toutes les colonnes de ma grille de mise en page partagent les mêmes styles, je défini une classe `.column` que j&rsquo;ajouterai à chaque bloc ayant une classe `.col-X-of-6` :

    .column {
      box-sizing: border-box;
      display: block;
      float: left;
      margin-right: $gutter-width;
      position: relative;
    }

Une fois mes classes prévue pour les colonnes de ma grille terminées, il me reste à définir une classe `.row` qui contiendra au maximum six blocs `.column.col-X-of-6`, ainsi que ma classe `.wrapper` qui englobera le tout. voilà ce que ça donne :

    .wrapper {
      width: $container-width;
    }

    .row {
      margin: 0 0 $gutter-width;

      &:before,
      &:after {
        clear: both;
        content: "";
        display: table;
      }
    }

Afin que mes blocs `.column` restent bien dans leur &laquo;&nbsp;ligne&nbsp;&raquo; ( classe `.row`), il faut réinitialiser le flux avec les pseudo-classe `:before` et `:after` afin de garantir qu&rsquo;aucun bloc `.column` ne sorte de son bloc `.row` parent.

Tout est presque bon maintenant. Nos colonnes ayant toutes une marge de droite défini, la dernière colonne de chaque ligne ne sera pas bien alignée avec ses soeurs. Pour remédier à ce problème, il suffit de passer la valeur de `margin-right` à `` pour le dernier bloc `.column` contenu dans un bloc `.row`. Vous me suivez ?

    .column {
      /* nos règles précédentes */

      .row &:last-of-type {
        margin-right: 0;
      }
    }

Le tour est joué, on a construit notre propre grille de mise en page CSS en toute simplicité avec Sass. Voilà le résultat !

<p class="codepen" data-height="350" data-theme-id="0" data-slug-hash="OyBPEm" data-default-tab="result" data-user="nighcrawl">
  See the Pen <a href="http://codepen.io/nighcrawl/pen/OyBPEm/">OyBPEm</a> by Ange Chierchia (<a href="http://codepen.io/nighcrawl">@nighcrawl</a>) on <a href="http://codepen.io">CodePen</a>.
</p>

J&rsquo;espère que cet article assez basique sur la création d&rsquo;une grille de mise en page avec Sass vous aura plu. À bientôt !