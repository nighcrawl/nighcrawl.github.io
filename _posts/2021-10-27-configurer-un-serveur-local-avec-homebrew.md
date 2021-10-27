---
title: 'Configurer un serveur local avec Homebrew'
layout: post
permalink: /blog/configurer-un-serveur-local-avec-homebrew/
image: /contents/uploads/serveur-apache-local.jpg
tags: apache, php, homebrew
category: "Back-End"
---
Dans cet article on va voir comment installer PHP et Apache pour configurer un serveur Web local sur Mac grâce au gestionnaire de paquets Homebrew, afin de se passer d'un outil comme MAMP.

Lorsque je travaillais chez Ibakus Europe, on développait des projets Symfony, du coup on n’avait pas besoin d'un MAMP pour faire tourner le projet, compiler les fichiers Sass et/ou JavaScript. Webpack s'en chargeait.

En arrivant chez Concept Factory, MAMP Pro était déjà bien utilisé dans l'équipe Front. Parfois lorsqu'on travaille avec l'équipe Symfony sur un projet, on démarre Vagrant ou Docker dans lequel tout est déjà installé pour faire tourner le projet, seulement voilà, il faut arrêter MAMP pour pouvoir ensuite démarrer la machine virtuelle, va savoir pourquoi... Probablement une histoire de ports utilisés

Un moment donné je me suis dit "Et si j'abandonnais complètement MAMP et que j'installais un serveur local qui tournerai non-stop sur ma machine, ça me ferai gagner du temps, non ?". Du coup, on va maintenant voir comment j'ai configuré mon serveur local.

## Pré-requis

Avant de se lancer dans ce gros projet, il va falloir décider de l'emplacement où seront stockés les fichiers des différents sites Web que l'on créera sur notre serveur de développement. Ça n'est pas une étape très compliquée, mais c'est l'une des plus importante.

### Choisir où placer nos fichiers PHP et HTML 

Personnellement, j'ai un dossier `Repositories` à la racine de mon dossier utilisateur, dans lequel se trouvent les différents projets sur lesquels je travail. Puis dans ce dossier se trouve un fichier `ìndex.html` avec le message "Hello World!" dedans afin de vérifier que ma configuration Apache fonctionne. Je vous invite à faire de même, ou d'adapter en conséquences :

```bash
$ mkdir ~/Repositories
$ echo "Hello World!" > ~/Repositories/index.html
```

L'autre information importante qu'il nous faut, c'est notre nom d'utilisateur (en général, le nom de votre dossier dans `/Users`). Pour le connaitre, la commande `$ whoami` fera le boulot. Pour moi, par exemple c'est `achierchia` 

### Installer Homebrew

Tout d'abord, il nous faut Homebrew pour aller plus loin. Cette étape est super simple, dans l'application Terminal on lance cette commande :

```bash
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Si tout se passe bien, la commande `brew --version` devrait afficher quelque chose comme ça : 

```bash
$ brew --version
Homebrew 3.3.1
Homebrew/homebrew-core (git revision b97b0465deb; last commit 2021-10-26)
Homebrew/homebrew-cask (git revision f2232d8993; last commit 2021-10-26)
```

On est prêt à installer notre serveur local ! Passons à l'installation d'Apache.

## Installer Apache

Par défaut, chaque version de macOS est fournie avec Apache et PHP préinstallés, mais pour des raisons pratique on préfèrera désactiver celles-ci et gérer nous même l'installation et la configuration des versions que l'on souhaite pour notre environement de développement.

### Stopper et décharger la version d'Apache pré-installée

Afin de pouvoir installer notre propre serveur Apache, il faut d'abord arrêter celui qui tourne actuellement. Pour cela, rien de plus simple, il suffit d'exécuter les deux commandes suivantes dans votre Terminal :

```bash
$ sudo apachectl stop
```

Cette commande permet de stopper le serveur Apache, la suivante permettra de ne plus le démarrer la tâche de fond à l'ouverture de session :

```bash
$ sudo launchctl unload -w /Systems/Library/LaunchDaemons/org.apache.httpd.plist
```

### Installation du paquet httpd via Homebrew

Maintenant qu'on a désactivé la version préinstallée d'Apache, on peut installer celle qu'on souhaite via la commande suivante :

```bash
brew install httpd
```

Cette commande installera la version courante d'Apache (v2.4.51 au moment où j'écris ces lignes).

Il faudra ensuite démarrer Apache en tâche de fond (gérée maintenant via Homebrew) grâce à cette commande :

```bash
$ brew services start httpd
```

Si vous allez maintenant sur [http://localhost:8080/](http://localhost:8080/) via votre navigateur Web préféré vous devriez voir un superbe “It works!”.

Bravo Apache est installé et fonctionne, on va pouvoir adapter la configuration et lui dire où aller chercher nos fichiers !

### Configurer Apache

Ici on va devoir modifier pas mal de petites choses, et c'est en général à ce moment là que ça pète si on ne fait pas bien attention.

On va donc ouvrir le fichier de configuration d'Apache dans l'éditeur de texte de notre choix, pour moi c'est VSCode :). 

Si vous avez un Mac avec un processeur Intel, le fichier se trouvera à cet endroit : `/usr/local/etc/httpd/httpd.conf`. **Pour les Mac avec un processeur Apple (M1, M1 Pro, M1 Max)**, il faudra ouvrir ce fichier `/opt/homebrew/etc/httpd/httpd.conf`.

Il faudra remplacer les choses suivantes :
* `Listen 8080` ➡️ `Listen 80`
* `DocumentRoot "/usr/local/var/www"` ➡️ `DocumentRoot "/Users/VOTRE_USERNAME/Sites"`
* `<Directory "/usr/local/var/www">` ➡️ `<Directory "/Users/VOTRE_USERNAME/Repositories">`
* Dans la section `<Directory “/Users/VOTRE_USERNAME/Repositories”>`qu'on a modifié à l'instant : `AllowOverride None` ➡️ `AllowOverride All`
* `#LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so️` ➡️ `LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so`
* `User _www` ➡️ `User VOTRE_USERNAME`
* `Group _www` ➡️ `Group staff`
* `#ServerName www.example.com:8080` ➡️ `ServerName localhost:80`

Et voilà, Apache est installé et configuré ! Pour que ces changements soient pris en compte, enregistrerez le fichier httpd.conf puis relancez le service :

```bash
$ brew services restart httpd
````

Si vous vous rendez maintenant sur [http://localhost/](http://localhost/) vous devriez voir votre "Hello World!", confirmation que tout fonctionne comme vous l'aviez souhaité ! 

## Installation du paquet php

### Installer PHP
Maintenant que notre serveur Apache fonctionne comme on le souhaite, il nous reste à installer PHP. Pour cela une commande suffit :
```bash
$ brew install php
```

Cette commande installera la version courante de PHP (v8.0.12). Si vous souhaitez installer une version différente, vous trouverez les anciennes versions qu'il est possible d'installer ici : https://formulae.brew.sh/formula/php. Moi, par exemple j'ai installé PHP 7.4.x, plutôt que PHP 8.x. J'ai donc exécuté cette commande :

```bash
$ brew install php@7.4
```

Une fois que PHP est installé, démarrons la tâche de fond :
```bash
$ brew services start php
# ou pour PHP 7.4
$ brew services start php@7.4
```

### Configurer PHP

Attention, là ça va aller pas mal vite !

Ouvrez à nouveau votre fichier de configuration Apache (`/usr/local/etc/httpd/httpd.conf` ou `/opt/homebrew/etc/httpd/httpd.conf` pour les processeurs M1).

Cherchez la dernière ligne `LoadModule` (ce sera probablement celle du `mod_rewrite.so`) et ajouter cette ligne juste après :

```bash
# Si vous avez installé PHP 8 sur processeur Intel
LoadModule php_module /usr/local/opt/php/lib/httpd/modules/libphp.so
# Sinon pour PHP 7.4 
LoadModule php7_module /usr/local/opt/php@7.4/lib/httpd/modules/libphp7.so

# Pour les processeurs M1, PHP 8
LoadModule php_module /opt/homebrew/opt/php/lib/httpd/modules/libphp.so
# ou PHP 7.4
LoadModule php7_module /opt/homebrew/opt/php@7.4/lib/httpd/modules/libphp7.so
```

Recherchez ensuite la ligne `DirectoryIndex index.html` et remplacez-la par `DirectoryIndex index.html index.php`.

Après le `DirectoryIndex` que l'on vient de modifier et juste avant la section concernant les fichiers htaccess, ajoutez cette section :
```
<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>
```

Et enfin, relancez le serveur Apache avec un magnifique `$ brew services restart httpd`

Youpi ! PHP est installé et prêt à être utilisé. Pour vérifier que le serveur interprète bien les fichiers PHP, créez un fichier `ìnfo.php` dans votre dossier `Repositories` contenant la ligne suivante :

```php
<?php phpinfo(); ?>
```

Rendez-vous à l'adresse [http://localhost/info.php](http://localhost/info.php) dans votre navigateur. Si vous voyez le logo PHP ainsi qu'un enorme tableau de données concernant votre version de PHP, c'est gagné, vous avez votre propre  serveur de développement !

## Et ensuite ?

Dans un prochain article, je partagerai ici ma méthode pour créer des virtual hosts rapidement et simplement, pour par exemple visiter l'URL [http://monsiteweb.local/](http://monsiteweb.local/) et quand même voir le site web stocké dans le dossier `Repositories/monsiteweb`.


