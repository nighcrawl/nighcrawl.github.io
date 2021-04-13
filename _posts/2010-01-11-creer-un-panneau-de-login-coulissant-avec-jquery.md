---

title: Créer un panneau de Login coulissant avec jQuery
date: 2010-01-11T17:45:18+00:00
author: Ange Chierchia
layout: post

permalink: /blog/creer-un-panneau-de-login-coulissant-avec-jquery/
img_article:
  - /contents/uploads/loginpaneljquery.jpg
image: /contents/uploads/2010/04/loginpanel.jpg
categories: "Front-End"
---
Comme premier article pour cette nouvelle année 2010 (bonne année à tous d&rsquo;ailleurs!), j&rsquo;ai décidé de vous proposer un tutoriel très simple pour créer une zone de login coulissante grâce à la librairie javascript jQuery.

<!--more-->L&rsquo;idée ici, c&rsquo;est de pouvoir faire apparaitre un panneau au clic sur un bouton. Ce panneau qui coulisserai vers le bas depuis le &laquo;&nbsp;header&nbsp;&raquo; du site afficherai un formulaire pour permettre aux utilisateurs du site de se connecter à leur espace personnel. On pourrait croire qu&rsquo;il serai difficile de réaliser un tel effet. Eh bien non! Grâce à notre feuille de style et un tout petit peu de javascript en utilisant jQuery, l&rsquo;effet est simple à réaliser, et tout n&rsquo;est ensuite qu&rsquo;une question de style  .

Avant de commencer, vous pouvez [jeter un oeil sur le rendu final](https://nighcrawl.github.io/slide-panel-login/ "Démo : Panneau de login coulissant avec jQuery") (pour un meilleur rendu, utilisez les navigateurs Chrome, Firefox 3.5 ou Safari 4).

## Le marquage HTML

Maintenant qu&rsquo;on a vu quel était notre but, passons au code HTML de notre panneau de login. Je ne vais pas expliquer le code, c&rsquo;est un formulaire basique encapsulé dans un bloc, suivi d&rsquo;un lien lui même encapsulé dans un bloc de paragraphe.

    <div class="panel">
      <form action="" class="login" id="login">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" name="username" id="username" />
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="password" />
        <input type="submit" name="submit" id="submit" value="Connexion" />
      </form>  
    </div>
    <button class="slide">Se connecter</button>

Voilà, on ne peut vraiment pas faire plus simple.

## Les styles CSS

Maintenant, passons à notre feuille de style. Je ne mettrai ici que les propriétés importantes à la réalisation de l&rsquo;effet, pour ne pas vous embêter avec le superflux, cependant le code complet sera disponible au téléchargement à la toute fin de l&rsquo;article.

    .panel {
      -moz-border-radius: 0 0 10px 10px;
      -webkit-border-radius: 0;
      border-radius: 0 0 10px 10px;
      background-color: #ccc;
      display: none;
      margin: 0 auto;
      padding: 30px;
      width: 300px;
    }

    .slide {
      -moz-border-radius: 0 0 10px 10px;
      -webkit-border-radius: 0;
      border-radius: 0 0 10px 10px;
      background: #ff0000;
      color: #fff;
      cursor: pointer;
      display: block;
      margin: 0 auto;
      padding: 10px;
      width: initial;
    }

## Le script jQuery

Maintenant qu&rsquo;on a définit notre marquage HTML et les styles à lui appliquer, il ne reste plus qu&rsquo;à l&rsquo;animer grâce à jQuery.

    jQuery(document).ready(function($){
        $(".slide").on("click", function(event) {
            event.preventDefault();
            $(this).prev(".panel").slideToggle("slow");
            $(this).toggleClass("active");
        });
    });

Et voilà, votre panneau de login est terminé!

## Fichiers sources
[Voir la démo](https://nighcrawl.github.io/slide-panel-login/) ou [Télécharger les fichiers](https://github.com/nighcrawl/slide-panel-login).
