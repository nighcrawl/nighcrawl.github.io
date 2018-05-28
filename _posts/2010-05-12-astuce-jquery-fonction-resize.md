---
id: 760
title: 'Astuce: une feuille de style différente selon la taille de la fenêtre'
date: 2010-05-12T19:29:19+00:00
author: Ange Chierchia
layout: post
guid: http://chierchia.fr/?p=760
permalink: /blog/astuce-jquery-fonction-resize/
dsq_thread_id:
  - "920386331"
image: /contents/uploads/2010/05/1205101927.jpg
categories:
  - Ajax/JavaScript
  - Tweets
tags:
  - Javascript
  - jQuery
---
Aujourd&rsquo;hui en bossant sur le nouveau design j&rsquo;ai voulu adapter mon design selon la taille de la fenêtre du navigateur, je vais donc partager cette petite astuce avec vous. Ici je vais utiliser un petit bout de Javascript, et plus précisement du jQuery.<!--more-->

Attention ça va aller vite!

<pre class="brush:js">$(window).resize(function(){

      //on récupère la taille de la fenêtre
      var w = $(window).width();
      //on stock la valeur de l'attribut href de notre css actuelle
      var default_css = $("link[rel='stylsheet']").attr("href");

      //adresse de la nouvelle css
      var new_css =   "http://monsite.com/chemin/vers/la_nouvelle.css";

      //on test si la fenêtre à une largeur inférieur à 1024px
      if(w &lt; 1024){
           $("link[rel='stylesheet"=']").attr({href: new_css});
      } else {
           $("link[rel='stylesheet']").attr({href: default_css});
      }

});</pre>

Et voilà, votre feuille de style changera dès que la fenêtre sera redimensionnée