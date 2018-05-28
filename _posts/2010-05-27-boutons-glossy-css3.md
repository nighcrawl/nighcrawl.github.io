---
id: 788
title: Des boutons qui ont du style (CSS)!
date: 2010-05-27T17:56:06+00:00
author: Ange Chierchia
layout: post
guid: http://chierchia.fr/?p=788
permalink: /blog/boutons-glossy-css3/
dsq_thread_id:
  - "917365159"
image: /contents/uploads/2010/05/css3button.jpg
categories:
  - XHTML/CSS
tags:
  - bouton
  - CSS
---
Aujourd&rsquo;hui pour fêter l&rsquo;anniversaire du blog, voilà un tutoriel qui vous montrera comment créer des boutons super clean et sympa en full CSS (cf. ici sur le blog), grâce notamment aux nouvelles propriétés introduites dans CSS3.<!--more-->

## À prendre en compte

Le but ici n&rsquo;est pas de vous faire une présentation de CSS3, donc on va tout de suite passer à la pratique. Sachez seulement que même si on va réaliser des superbes boutons vraiment classes comme ce qui se fait en ce moment un peu partout sur le Web, et ce sans aucune image, cette technique ne marche que sur les navigateurs Safari 4+, Chrome et Firefox 3.5+, qui sont les seul actuellement a interpréter certaine règles CSS3.

## Le marquage CSS

Bon allez, on plonge dans le code! Je n&rsquo;expliquerai pas le code volontairement, je pense que la définition des styles est assez clair et simple à comprendre. Si vous voulez plus d&rsquo;explications sur les déclarations CSS, un petit mot dans les commentaires du billet!


    .button {
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2I1MDAwMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzZkMDAwMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
      background-size: 100%;
      background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #b50000), color-stop(100%, #6d0000));
      background-image: -moz-linear-gradient(#b50000, #6d0000);
      background-image: -webkit-linear-gradient(#b50000, #6d0000);
      background-image: linear-gradient(#b50000, #6d0000);
      border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      -moz-border-radius: 4px;
      -webkit-border-radius: 4px;
      border-radius: 4px;
      -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      color: #ffffff;
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      line-height: 1;
      margin: 2px;
      padding: 8px 10px;
      text-decoration: none;
    }

    .button:hover {
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzMzMzMzMyIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
      background-size: 100%;
      background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #333333), color-stop(100%, #000000));
      background-image: -moz-linear-gradient(#333333, #000000);
      background-image: -webkit-linear-gradient(#333333, #000000);
      background-image: linear-gradient(#333333, #000000);
    }

    .button.medium {
      font-size: 12px;
    }

    .button.small {
      font-size: 10px;
    }

    .button.round {
      -moz-border-radius: 20px;
      -webkit-border-radius: 20px;
      border-radius: 20px;
    }

    .button.blue {
      background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzZkOTNjMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzNkNWI3OCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
      background-size: 100%;
      background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #6d93c0), color-stop(100%, #3d5b78));
      background-image: -moz-linear-gradient(#6d93c0, #3d5b78);
      background-image: -webkit-linear-gradient(#6d93c0, #3d5b78);
      background-image: linear-gradient(#6d93c0, #3d5b78);
    }


Vous n&rsquo;avez plus qu&rsquo;à appliquer la classe `.button` à votre lien, et y ajouter les class `.small` `.medium`, `.blue` ou `.arrondi` pour plus de personnalisation

## Fichiers de démonstration

À vous de jouer maintenant! Vous pouvez [voir une démo](https://nighcrawl.github.io/css3-buttons) et [télécharger les sources](https://github.com/nighcrawl/css3-buttons) sur GitHub.