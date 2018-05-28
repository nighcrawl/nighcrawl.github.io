---
id: 1112
title: Afficher son flux de photos Instagram via jQuery et JSON
date: 2011-02-25T00:10:32+00:00
author: Ange Chierchia
layout: post
guid: http://chierchia.fr/?p=1112
permalink: /blog/afficher-instagram-via-jquery-et-json/
image: /contents/uploads/2011/02/instagram1-512x288.jpg
categories:
  - Ajax/JavaScript
tags:
  - Instagram
  - Javascript
  - jQuery
  - JSON
---
Vous connaissez cette surement Instagram, cette application iPhone au succès grandissant qui vous permet de partager vos clichés comme un Twitter-like, et en plus de ça leur donner un petit effet digne de Photoshop en a peine quelques minutes? Alors je vais vous donner un petit bout de code qui vous permettra d&rsquo;afficher vos dernières photos n&rsquo;importe où!<!--more-->

D&rsquo;abord, il faut savoir qu&rsquo;une API Instagram est actuellement en beta, mais n&rsquo;est accessible que sur invitation pour le moment. Si comme moi vous n&rsquo;avez pas encore accès à cette API, pas de problème, un site qu&rsquo;il est tout beau nous permet de récupérer pas mal de données relatives à un compte Instagram au format JSON.

Avant toute chose, il nous faut récupérer notre ID utilisateur, et non notre Nom d&rsquo;utilisateur. Pour cela, un petit tour sur cette page : <a title="Récupérer son flux Instagram" href="http://instagram.heroku.com/help" target="_blank">Récupérer son ID et son flux de photos Instagram</a>.

<img title="recup-flux-photo-instagram" src="/contents/uploads/recup-flux-photo-instagram.jpg?resize=493%2C216" alt="" data-recalc-dims="1" />

Ce service va vous permettre, via l&rsquo;URL d&rsquo;une de vos photos, ou par votre compte Twitter, si vous y avez partagé une Instagram récemment, de récupérer un flux au format ATOM, et par la même occasion votre ID utilisateur.

<img class="size-full wp-image-1119 alignnone" title="recuperer-instagram-userid" src="/contents/uploads/2011/02/recuperer-instagram-userid.png?fit=422%2C343" alt="" data-recalc-dims="1" />

Une fois que vous avez récupérer votre ID utilisateur, comme le montre l&rsquo;image ci-dessus, rien de plus simple : votre flux au format JSON se trouve ici : http://instagram.heroku.com/users/**xxxxx**.json. N&rsquo;oubliez pas de remplacer **xxxxx** par votre ID 

On va maintenant pouvoir passer à l&rsquo;affichage de nos données.

Ce qu&rsquo;il faut savoir : le fichier JSON récupéré est un bordel sans nom, tellement il contient d&rsquo;informations. Hormis les 20 dernières photos partager, on peut récupérer les commentaires, les &laquo;&nbsp;Likes&nbsp;&raquo;, l&rsquo;identifiant, et encore quelques informations pour chaque photos.

Ici, je veux récupérer une miniature de l&rsquo;image, son titre, et l&rsquo;identifiant de celle-ci pour l&rsquo;afficher depuis le site d&rsquo;Instagram. Voici le bout de code qui me permet d&rsquo;afficher ces données.

    $(document).ready(function(){
      $.getJSON('http://instagram.heroku.com/users/45195.json',function(data){

        var instagram = new Array();

        $.each(data.items, function(i,item){
          var str = '<li><a href="http://intagr.am/p/' + item.code + '">
          <img src="' + item.image_versions[1].url + '"
          title="' + item.comments[0].text + '" />
          <div>' + item.comments[0].text + '</div>
          </a></li>';
          instagram.push(str);
        });

        $('<ul/>', {html: instagram.join('')}).appendTo('#instagram');
      });
    });