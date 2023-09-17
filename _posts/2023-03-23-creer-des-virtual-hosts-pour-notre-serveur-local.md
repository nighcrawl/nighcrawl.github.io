---
title: Créer des virtual hosts pour notre serveur local
categories:
- Back-End
redirect_from: "/blog/creer-des-virtual-hosts-pour-notre-serveur-local"
date: 2023-03-23T23:32:27.456Z
---

Dans cet article, qui fait suite à mon article [Configurer un serveur local avec Homebrew](https://chierchia.fr/blog/configurer-un-serveur-local-avec-homebrew/), je vais vous montrer la méthode que j'utilise pour créer les virtual hosts des projets sur lesquels je travaille. Si vous n'avez pas lu la première partie, je vous invite à le faire avant de continuer.

<!--more-->

## Minute papillon !
### Qu'est-ce qu'on va faire exactement?
Voilà comment ça va se passer : d'abord on va modifier notre fichier de configuration Apache pour activer et utiliser des hôtes virtuels. Une fois ceci fait, on pourra définir des URLs personnalisés que l'on attribuera aux différents dossiers présents dans notre dossier `Repositories`.

Une fois qu'on aura fait ça, on va nettoyer un peu le bazard en séparant nos vhosts dans plusieurs fichiers pour que tout ça soit le plus facile possible à maintenir.

Aller, go !

### Un peu de préparation
D'abord, on va ouvrir les quelques fichiers dont on va avoir besoin pour configurer nos hôtes virtuels. Ouvrez les fichiers suivants dans votre éditeur :

* `/usr/local/etc/httpd/httpd.conf`
*  `/usr/local/etc/httpd/extra/httpd-vhosts.conf`
*  `/etc/hosts`

**Attention !** Si vous avez un Mac avec un processeur Apple (M1, M2, etc.) les fichiers dans lesquels on travaillera seront ceux-ci :

* `/opt/homebrew/etc/httpd/httpd.conf`
*  `/opt/homebrew/etc/httpd/extra/httpd-vhosts.conf`
*  `/private/etc/hosts`

Si vous n'avez pas déjà des projets dans votre dossier `Repositories`, créez en quelques uns :
```
Repositories/
|_ nighcrawl/
|  |_ html/
|  |_ logs/
|
|_ cv/
   |_ html/
   |_ logs/
```

## Nos premiers virtual hosts
Nous allons maintenant créer nos tout premiers hôtes virtuels. Ils auront chacun une URL  et un "document root" (le dossier dans lequel l'URL pointera) qui leur seront propres. L'URL [http://nighcrawl.local](http://nighcrawl.local) pointera sur le dossier `~/Repositories/nighcrawl/html/` tandis que [http://cv.local](http://cv.local) pointera sur `~/Repositories/cv/html/`.

### Dans `httpd.conf`
Trouvez la ligne suivante et décommentez la (il suffit de supprimer le `#` devant la ligne) :
```
#LoadModule vhost_alias_module lib/httpd/modules/mod_vhost_alias.so
```

Faites de même pour la ligne suivante :
```
#Include /usr/local/etc/httpd/extra/httpd-vhosts.conf
```

**Attention !** Pour les processeurs Apple, la ligne à décommenter sera celle-ci :
```
#Include /opt/homebrew/etc/httpd/extra/httpd-vhosts.conf
```

### Dans le fichier `httpd-vhosts.conf`
Si votre fichier contient déjà des configs, vous pouvez les supprimer si vous êtes certain qu'elles ne vous servent pas. On peut ajouter les configs suivantes pour déclarer nos virtual hosts [http://nighcrawl.local](http://nighcrawl.local) et [http://cv.local](http://cv.local) :

```
<VirtualHost *:80>
    DocumentRoot "/Users/YOUR_USERNAME/Repositories/nighcrawl/html"
    ServerName nighcrawl.local
    ErrorLog "/Users/YOUR_USERNAME/Repositories/nighcrawl/logs/error_log"
    CustomLog "/Users/YOUR_USERNAME/Repositories/nighcrawl/logs/access_log" common
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot "/Users/YOUR_USERNAME/Repositories/cv/html"
    ServerName bar.lo
    ErrorLog "/Users/YOUR_USERNAME/Repositories/cv/logs/error_log"
    CustomLog "/Users/YOUR_USERNAME/Repositories/cv/logs/access_log" common
</VirtualHost>
```

### Modification du fichier `hosts`
Pour que vos nouvelles URLs personnalisées soient reconnues, il va falloir leur dire sur quelle adresse IP elles devront pointer. Comme ces deux sites Web sont en local sur votre machine, leur adresse IP sera donc 127.0.0.1. Il faut alors ajouter ces deux ligne à la fin de votre fichier :

```
127.0.0.1   nighcrawl.local
127.0.0.1   cv.local
```

Après avoir effectué tout ces changements, on relancera Apache avec la commande suivante dans un Terminal : 

```
$ brew services restart httpd
```

Vous devriez alors voir un beau message "Index of /" si vous ouvrez [http://nighcrawl.local](http://nighcrawl.local) et [http://cv.local](http://cv.local) dans votre navigateur. 

**Ça fonctionne !** Vous n'avez plus qu'à mettre les fichiers HTML/PHP/JS/etc..  dans chaque projet 👏.

## Ranger le bazard
Maintenant que nos vhosts fonctionnent, il est temps de prévoir le futur et de faire quelques ajustements afin qu'il soit beaucoup plus facile de créer ou modifier des vhosts sans risquer de se perdre. 

Moi par exemple, j'ai plus de 50 virtual hosts configurés sur ma machine... Un peu chaud de s'y retrouver si il faut modifier un vhost. 

C'est pourquoi on va créer un fichier par virtual host plutôt que de les avoir tous dans un seul fichier, ce sera beaucoup plus maintenable.

### Un fichier par virtual host
J'ai l'habitude de rassembler tous mes fichiers de vhosts dans un dossier `sites-available/` dans le dossier `/usr/local/etc/httpd/` ( `/opt/homebrew/etc/httpd/` pour les processeurs Apple).

Du coup on va déplacer nos configs pour [http://nighcrawl.local](http://nighcrawl.local) dans un fichier `/usr/local/etc/httpd/sites-available/nighcrawl.conf` 

```
# nighcrawl.conf
<VirtualHost *:80>
    DocumentRoot "/Users/YOUR_USERNAME/Repositories/nighcrawl/html"
    ServerName nighcrawl.local
    ErrorLog "/Users/YOUR_USERNAME/Repositories/nighcrawl/logs/error_log"
    CustomLog "/Users/YOUR_USERNAME/Repositories/nighcrawl/logs/access_log" common
</VirtualHost>
```

et celle pour [http://cv.local](http://cv.local) dans un fichier `/usr/local/etc/httpd/sites-available/cv.conf`. 

```
# cv.conf
<VirtualHost *:80>
    DocumentRoot "/Users/YOUR_USERNAME/Repositories/cv/html"
    ServerName bar.lo
    ErrorLog "/Users/YOUR_USERNAME/Repositories/cv/logs/error_log"
    CustomLog "/Users/YOUR_USERNAME/Repositories/cv/logs/access_log" common
</VirtualHost>
```

**Attention à adapter si vous avez un processeur Apple 😉.** 

### Mettre à jour `httpd-vhosts.conf`
Maintenant que nos hôtes virtuels ont leur propre fichier de config, on peu les supprimer du fichier `httpd-vhosts.conf`. 

Après ça, on va simplement inclure chaque fichier `.conf`présent dans notre dossier `sites-available/` grâce à cette ligne :

```
# Pour les processeurs Intel
Include /usr/local/etc/httpd/sites-available/*.conf

# Pour les processeurs Apple
Include /opt/homebrew/etc/httpd/sites-available/*.conf
```

On redémarre à nouveau le services Apache avec `brew services restart httpd` et tout devrait rouler comme avant, mais en mieux.

## Aller encore plus loin
Pour aller plus loin et gagner du temps lors de la création d'un nouvel hôte virtuel, j'utilise un script bash qui me permet de faire tout ceci en une seule ligne de commande. 

Voici une version édulcorée de mon script `vhost.sh` : 

```
#!/bin/bash
USER="achierchia"
CONF_FOLDER="/opt/homebrew/etc/httpd/sites-available/"
SITES_FOLDER="Repositories"

if [ "$USER" == "" ] || [ "$CONF_FOLDER" == "" ] || [ "$SITES_FOLDER" == "" ]; then
	echo "You must set the variables USER, CONF_FOLDER and SITES_FOLDER in the script!"
	echo ""
	exit
fi

if [ "$(whoami)" != "root" ]; then
    echo -ne "\e[0;101m You must be root to use this script! \e[0;49m "
    echo ""
    exit
fi

domain=""
createFolder="N"

while getopts d:f: flag 
do
	case "${flag}" in
		d) domain=${OPTARG};;
		f) createFolder=${OPTARG};;
	esac
done

if [[ "$createFolder" =~ ^[Yy]$ ]]; 
then
    echo "Création du dossier ${domain} dans ${SITES_FOLDER}..."
    cd /Users/${USER}/${SITES_FOLDER}/
	mkdir $domain
	cd /Users/${USER}/${SITES_FOLDER}/${domain}/
	mkdir logs
fi

accessLog="${domain}_access"
errorLog="${domain}_error"

echo "Création du fichier de config..."
cd $CONF_FOLDER
sudo -u $USER -i -- cat >> ${domain}.conf << EOF
<VirtualHost *:80>
	ServerName ${domain}.local

	DocumentRoot /Users/${USER}/${SITES_FOLDER}/${domain}
	DirectoryIndex index.php index.html
	<Directory /Users/${USER}/${SITES_FOLDER}/${domain}>
		Options -Indexes +FollowSymLinks +MultiViews
		AllowOverride All
		Require all granted
	</Directory>

	LogLevel warn

	ErrorLog /Users/${USER}/${SITES_FOLDER}/${domain}/logs/${errorLog}.log
	CustomLog /Users/${USER}/${SITES_FOLDER}/${domain}/logs/${accessLog}.log combined
</VirtualHost>
EOF

echo "Mise à jour du fichier hosts..."
HOSTURL=$domain".local"
HOSTCONF="127.0.0.1\t"$HOSTURL"\twww."$HOSTURL
sed -i -- "s/# local end/"$HOSTCONF"\n# local end/g" /etc/hosts

echo "Modification des privileges du fichier conf"
cd ${CONF_FOLDER}
sudo chown $USER "${domain}.conf"
cd /Users/${USER}/${SITES_FOLDER}/${domain}/logs/
sudo chown $USER "${accessLog}.log" "${errorLog}.log"

echo "Redémarrage du serveur Apache..."
sudo -u $USER -i -- brew services restart httpd

```

Pour l'utiliser il suffit d'executer cette commande :

```
$ sudo sh vhost.sh -d monsiteweb -f Y
```

Ce script permet de : 
* Créer un dossier `monsiteweb/` dans le dossier `$SITES_FOLDER` paramétré. 
* Créer le fichier de config vhost `monsiteweb.conf` dans le dossier `$CONF_FOLDER`.
* Déclarer `monsiteweb.local` dans le fichier `hosts`
* Relancer le serveur Apache

Si on ne souhaite pas créer le dossier du projet, par exemple parce qu'il existe déjà, on peux lancer cette commande :

```
$ sudo sh vhost.sh -d monsiteweb -f N
```
