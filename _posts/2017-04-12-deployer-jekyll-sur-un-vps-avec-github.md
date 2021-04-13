---
title: Déployer Jekyll sur un VPS avec GitHub
date: 2017-04-12T12:52:41+00:00
author: Ange Chierchia
layout: post
permalink: /blog/deployer-jekyll-sur-un-vps-avec-github/
image: /contents/uploads/git.jpg
categories: "Back-End"
---

Il y a deux mois [j'ai totalement abandonné WordPress][1] pour passer à Jekyll, une solution beaucoup moins lourde et plus en phase avec ma façon actuelle de publier sur mon blog. Dans mon précédent billet, j'avais évoqué la possibilité pour moi d'abandonner mon mutualisé OVH en faveur de GitHub Pages.
Je me suis donc amusé beaucoup plus qu'à l'accoutumée avec GitHub et GitHub Pages ces derniers mois, pour voir si la plateforme répondrait à mes attentes.<!--more-->

Pour la faire courte, la réponse est : non, pour l'instant.

## Pourquoi GitHub Pages ne me convient pas ?

La plateforme est géniale, la mise à jour du blog sous Jekyll est instantanée à chaque `git push origin master`, plus besoin de lancer un `jekyll build` pour générer le site mis à jour, GitHub Pages s'occupe de tout !

Malheureusement, même si il est possible de forcer le HTTPS sur les pages du site, celui-ci doit obligatoirement avoir une URL du style `https://username.github.io/repository`. Impossible de forcer HTTPS si on veut utiliser son propre nom de domaine. Et comme j'avais déjà passé mon site en HTTPS il était hors de question de revenir en arrière, par principe.

Et puis, comme ça l'air de rien une petite newsletter OVH tombe dans ma boîte mail, proposant un nom de domaine en `.me` à -70%, du coup je me laisse tenter et puis une chose en entrainant une autre, je décide de prendre un petit VPS à pas cher...

## Déployer Jekyll via GitHub

J'aime beaucoup GitHub, je m'en sert principalement pour sauvegarder quelques projets et ça m'évite de garder une copie sur un disque externe, je souhaitais donc pouvoir l'utiliser comme relai entre ma machine et le serveur, comme ça si il me prend l'envie de tout remettre à zéro, j'ai mes projets sauvés sur GitHub, un `git clone` et on en parle plus.

N'ayant jamais vraiment utilisé Linux, je me suis dit que c'était l'occasion. J'ai donc choisi de configurer mon VPS en distribution nue sous Debian 8 pour pouvoir installer uniquement ce dont j'avais besoin et laisser le plus de place possible pour mon site sur le disque dur. En gros :  Apache, Git, Ruby et Let's Encrypt.

Ici je n'expliquerai pas comment j'ai installé Apache, Git, Ruby et Let's Encrypt. Je me contenterai de partager ma méthode pour déployer Jekyll.

### Créer le dépôt Git distant

La première étape de ma méthode a consistée à créer un dépôt Git à la racine du VPS avec la commande suivante :

    # connexion au VPS
    ssh git@mon.vps
    # création du dépôt distant
    git clone --bare https://github.com/nighcrawl/jekyll-blog.git blog.git

Avec cette commande on clone le dépôt GitHub nu sur le VPS, c'est à dire en ne gardant que les fichiers normalement contenus dans `.git/` dans le dossier `blog.git/`. Le dossier `blog.git` ressemble alors à ceci :

    blog.git/
    |_ HEAD/
    |_ branches/
    |_ config/
    |_ description/
    |_ hooks/
    |  |_ post-receive
    |  |_ post-update
    |  |_ ...
    |_ infos/
    |_ objects/
    |_ refs/

Le fichier intéressant ici est `post-receive` du dossier `hooks/` car il va nous permettre d'executer un script bash à chaque fois qu'un `git push` sur le dépôt aura été complété. 

Pour nous, il faudra lancer la génération du site avec Jekyll à chaque nouveau `git push`, le fichier `post-receive` contiendra alors le script suivant : 

    GIT_REPO=$HOME/blog.git
    TMP_GIT_CLONE=$HOME/tmp/blog
    PUBLIC_WWW=/var/www/blog

    git clone $GIT_REPO $TMP_GIT_CLONE
    bundle exec jekyll build -s $TMP_GIT_CLONE -d $PUBLIC_WWW
    rm -Rf $TMP_GIT_CLONE
    exit

Ici on déclare plusieurs variable en début de script: 
* `GIT_REPO` contient le chemin vers le dépôt Git,
* `TMP_GIT_CLONE` permet de définir où sera cloné le dépôt
* `PUBLIC_WWW` contiendra les fichiers du site une fois compilés avec Jekyll

Une fois le dépôt Git cloné dans `$TMP_GIT_CLONE`, on lance la commande de compilation des fichier `bundle exec jekyll build` en spécifiant le dossier `$TMP_GIT_CLONE` comme étant la source et `$PUBLIC_WWW` comme destination, puis on supprime le dossier `$TMP_GIT_CLONE` avec la commande `rm -Rf $TMP_GIT_CLONE`.

### Créer le dépôt Git local

Une fois le dépôt distant créé et le fichier `post-receive` modifié, il ne reste plus qu'à cloné le dépôt sur l'ordinateur avec la commande 

    git clone https://github.com/nighcrawl/jekyll-blog.git

puis d'y ajouter votre dépôt distant comme `remote` supplémentaire avec la commande

    git remote add deploy ssh://git@mon.vps:/blog.git

## Déployer en production

Pour pousser les mises à jour vers le VPS il suffira alors de faire un `git push` en spécifiant le dépôt distant dans lequel vous souhaitez envoyer vos commits. 

Ici le dépôt GitHub s'appelle `origin` et mon dépôt de production (sur le VPS) s'appelle `deploy`. La commande de mise à jour du VPS sera alors

    git push deploy master

## Fin

La méthode de déploiement que j'utilise ici est assez basique et pourra probablement être améliorée, alors n'hésitez pas à la partager, ou mieux me donner votre avis et/ou vos conseils sur Twitter.

[1]: https://chierchia.fr/blog/jekyll/