---

title: 'Tipsy: des tooltips sexy avec jQuery'
date: 2010-05-11T19:54:51.456Z
author: Ange Chierchia
layout: post

redirect_from: /blog/tipsy-des-tooltips-sexy-avec-jquery/
img_article:
  - http://blog.angechierchia.com/wp-content/uploads/jquery-tipsy.jpg
image: /contents/uploads/2010/05/jquery-tipsy.jpg
categories: "Ressource"
---
Il y a pratiquement 1 an maintenant je vous avez montré comment créer vos propres [infos-bulles en jQuery](http://chierchia.fr/ajax-javascript/creer-des-info-bulles-attractives-avec-jquery/ "Créer des info-bulles attractives avec jQuery"), aujourd&rsquo;hui je vous présente un plugin vraiment sympa qui permet de faire très simplement des infos-bulle (ou tooltips) similaire à celles qu&rsquo;on peut trouver sur Facebook ou encore Twitter.<!--more-->

Tipsy est donc un plugin jQuery, vraiment très simple à mettre en place, avec pas mal d&rsquo;options possible pour l&rsquo;animation des infos-bulles, comme par exemple l&rsquo;orientation de celles-ci (nord, sud, est, ouest, etc.), la façon dont elles apparaissent et pas mal d&rsquo;autres choses.

## Comment l&rsquo;implémenter sur votre site?

C&rsquo;est super simple, il suffit d&rsquo;inclure la librairie jQuery en plus de Tipsy dans votre site, sans ça le plugin ne fonctionnera pas, ça tombe sous le sens mais je le dis quand même. Ensuite, il suffit d&rsquo;initialiser le plugin de la façon suivante :

<pre class="brush:js">$('a').tipsy();</pre>

Ce petit bout de code appliquera le plugin Tipsy à tout les liens de la page. Enfin, pour que le plugin soit effectif, il faut bien entendu renseigner l&rsquo;attribut _title_ de vos liens.

## Aller plus loin avec Tipsy

Pour voir les différentes options de personnalisation, les exemples d&rsquo;utilisation et télécharger Tipsy, <a title="Facebook-style tooltip plugin for jQuery" href="http://onehackoranother.com/projects/jquery/tipsy/" target="_blank">rendez-vous sur le site du plugin</a>.