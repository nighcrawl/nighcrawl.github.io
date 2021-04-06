---

title: Générer un mot de passe aléatoirement
date: 2011-07-08T18:47:47+00:00
author: Ange Chierchia
layout: post

permalink: /blog/generer-un-mot-de-passe-aleatoirement/
more-link-text:
  - "Clique pour voir comme c'est beau!"

image: /contents/uploads/2012/01/1159613_851208571.jpg
category: "Back-End"
---
Pour commencer le week-end (ou les vacances pour certains), voici une petite fonction, très simple permettant de générer un mot de passe aléatoire, par exemple pour un accès à une zone de gestion. C&rsquo;est d&rsquo;ailleurs ce à quoi ce petit bout de code fait maison m&rsquo;a servi. <!--more-->

Le principe ici était, pour moi, de générer une chaine de 8 caractères alphanumériques choisis aléatoirement. J&rsquo;ai volontairement choisi de ne pas inclure de caractères accentués ni caractères spéciaux afin que les mots de passes générés soit relativement simple à retenir, tout en étant &laquo;&nbsp;difficile&nbsp;&raquo; à cracker. Bien sûr, les mot de passes sont cryptés en base, mais ça n&rsquo;est pas la question.

Voici donc notre petite fonction :

    function generatePwd(){
      $chars = "azertyuiopqsdfghjklmwxcvbn0123456789";
      $lenght = strlen($chars);
      $chars = str_split($chars,1);
      $pwd = "";
      for($i=0;$i&lt;9;$i++){
        shuffle($chars);
        $pwd .= $chars[rand(0,($lenght-1))];
      }
      return $pwd;
    }

Ici, je définis les caractères que je souhaite utiliser pour mon mot de passe. Je range ensuite chaque caractères dans un tableau grâce à str_split(). Vient ensuite la génération de la chaîne aléatoire dans une boucle for() qui s&rsquo;executera 8 fois ( je veux 8 caractères). Pour augmenter sensiblement la difficulté du mot de passe, je mélange mon tableau de caractères à chaque passage dans la boucle, et choisi un caractère  du tableau au hasard.

Fonction super simple, je vous l&rsquo;accorde, mais ça pourra toujours servir, libre à vous de le modifier et l&rsquo;utiliser comme bon vous semble 