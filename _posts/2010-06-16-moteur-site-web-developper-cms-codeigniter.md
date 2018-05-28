---
id: 877
title: Développer un moteur de site Web avec CodeIgniter
date: 2010-06-16T21:09:06+00:00
author: Ange Chierchia
layout: post
guid: http://chierchia.fr/?p=877
permalink: /blog/moteur-site-web-developper-cms-codeigniter/
dsq_thread_id:
  - "917363458"
image: /contents/uploads/2010/06/ci_cms.jpg
categories:
  - PHP/MySQL
tags:
  - CMS
  - CodeIgniter
  - PHP
---
Aujourd&rsquo;hui, on va voir comment créer un moteur de site Web, aussi appelé système de gestion de contenu, en utilisant le très bon (est facile à utiliser) Framework CodeIgniter. Comme la tâche va être longue, j&rsquo;ai prévu d&rsquo;étaler cet article en plusieurs parties. On commence donc aujourd&rsquo;hui avec la première partie du développement de notre CMS utilisant CodeIgniter.<!--more-->

## Introduction

Pourquoi choisir d&rsquo;utiliser un framework PHP pour développer un tel projet? La raison est simple : pourquoi perdre son temps à réinventer la roue quand on a la possibilité d&rsquo;utiliser des fonctions déjà toutes prêtes? Un framework est donc fort utile dans ce type de projet, surtout pour tout le back-end du site, ce que l&rsquo;utilisateur ne voit pas, et sur lequel nous les développeurs, passons pas mal de temps à développer pour rendre la vie facile à l&rsquo;utilisateur du site.

Pourquoi CodeIgniter comme base de travail? Pour moi qui n&rsquo;avais pas l&rsquo;habitude d&rsquo;utiliser des frameworks PHP (j&rsquo;aime bien me compliquer la vie), j&rsquo;ai trouvé que CodeIgniter était le plus simple à prendre en main pour moi qui n&rsquo;avais pour dire jamais fais de PHP Objet (ouh! le nul!).

Aussi, un framework permet de passer plus de temps sur le développement pur plutôt que de perdre son temps sur des petites choses bien chiantes comme il faut (la validation de formulaire me sort par les trous de nez!).

## Quelles fonctionnalités pour notre CMS?

Avant de se lancer à la va vite dans le développement, il faut se demander à quoi servira notre moteur de site, est-ce qu&rsquo;on gère un blog, un catalogue de produit, ou bien un simple site vitrine? Étant actuellement entrain de développer un site permettant d&rsquo;afficher un catalogue de produits, j&rsquo;aurai tendance à vouloir vous proposer de partir sur cette idée. Pour commencer je vous propose de nous concentrer sur une simple vitrine (ce qu&rsquo;il y a de plus simple), et on verra ensuite pour le catalogue de produit.

Notre système devra donc comprendre:

  * un accès sécurisé au back-end.
  * un gestionnaire de page
  * on devra pouvoir uploader des images
  * pourquoi pas pouvoir modifier le design du site?

## Installer et configurer CodeIgniter

<img class="aligncenter size-full wp-image-881" title="download_ci" src="/contents/uploads/2010/06/download_ci.jpg?fit=603%2C143" alt="" data-recalc-dims="1" />

Aujourd&rsquo;hui on va simplement préparer le terrain en téléchargeant et en installant le framework sur notre serveur Web. Rendez-vous sur le site du framework et <a title="Télécharger CodeIgniter" href="http://codeigniter.com/downloads/" target="_blank">télécharger la version actuelle de CodeIgniter</a>, au moment ou j&rsquo;écris c&rsquo;est la version 1.7.2.

<img class="size-full wp-image-885 alignright" title="screenshot 2010-06-1620.33.20" src="/contents/uploads/2010/06/screenshot-2010-06-1620.33.20.jpg?fit=210%2C509" alt="" data-recalc-dims="1" />

Dézipper le contenu de l&rsquo;archive et transférez les dossiers de CodeIgniter à la racine de votre serveur. Vous devriez avoir une arborescence comme présenté à droite:

Les dossiers important ici sont le dossier _system_, qui renferme tout les fichiers nécessaires au fonctionnement de CodeIgniter, et le dossier _application_, qu&rsquo;il est possible de sortir du dossier _system_ pour une meilleure organisation. Aussi on pourra se passer du dossier _user_guide_ qui n&rsquo;est qu&rsquo;une version local du guide utilisateur disponible sur le site de CodeIgniter.

Vous remarquerez aussi les dossiers _controllers_, _models_ et _views_, ce sont nos trois dossiers de travail. Eh oui, CodeIgniter utilise le Modèle MVC (Modèle-Vue-Controleur) aussi appeler application trois tiers, ce qui permet de séparer les opérations d&rsquo;accès à notre base de données des opérations de traitement de ces données, ainsi que l&rsquo;affichage de ces même données.

Passons maintenant à la configuration de CodeIgniter.

Ici c&rsquo;est très simple, il suffit de modifier la variable `$config['base_url']` du fichier _application/config/config.php_ en renseigner l&rsquo;adresse de notre serveur.

<pre class="brush:php">$config['base_url'] = "http://localhost:8888/codeigniter/";</pre>

On va ensuite configurer l&rsquo;accès à la base de données. Pour cela, direction _application/config/database.php_ et renseigner les lignes suivantes avec vos informations de connexion.

<pre class="brush:php">$db['default']['hostname'] = "localhost";
$db['default']['username'] = "root";
$db['default']['password'] = "root";
$db['default']['database'] = "database_ci";
$db['default']['dbdriver'] = "mysql";</pre>

Et voilà! Si vous vous rendez à l&rsquo;adresse où vous avez installer CodeIgniter vous devriez avoir une joli page &laquo;&nbsp;Hello World&nbsp;&raquo; si vous avez bien suivi les étapes ci dessus.

Allez, je vous laisse ici pour aujourd&rsquo;hui, la prochaine fois on s&rsquo;intéressera à la création de la base de données et au système de login sécurisé.