---
layout: post
title: Publier automatiquement sur Mastodon grâce à IFTTT
date: 2023-09-23T10:32:29.699Z
categories:
  - Ressource
tags: []
format: post
publish_social: yes
---
Ça faisait quelques temps que je voulais m'intéresser à l'API Mastodon pour pouvoir publier les articles de mon blog sur l'instance que j'utilise automatiquement. Jusqu'à maintenant j'utilisait IFTTT et Buffer pour gérer celà, mais ça n'était pas aussi "instantané". Voici un petit guide de mise en place.<!--more-->

## Créer une Application

Avant de commencer, il faut créer une Application depuis le menu "Préférences > Développement" de votre instance Mastodon. Pour moi c'est <https://mastodon.social/settings/applications>.

![Écran des préférences Mastodon pour le développement d'applications](/contents/uploads/screenshot-2023-09-23-at-11-35-25-vos-applications-mastodon.png)

Cliquer sur le bouton "Nouvelle application" et remplir le formulaire comme suit :

* **Nom de l'application:** Mon appli Mastodon
* **Site web de l’application:** https://ifttt.com
* **URI de redirection:** ne rien changer
* **Étendues :** cocher uniquement l'option *write:statuses*

![Formulaire de création d'une application dans Mastodon](/contents/uploads/screenshot-2023-09-23-at-11-54-37-nouvelle-application-mastodon.png)

Soumettre le formulaire. Une fois revenu au listing des applications disponibles, cliquer sur le nom de notre application pour en voir les détails, notamment le Jeton d'accès dont on aura besoin dans IFTTT.

![Détails de mon application "IFTTT"](/contents/uploads/screenshot-2023-09-23-at-11-35-42-application-ifttt-mastodon.png)

Maintenant qu'on a ce jeton d'accès, on va pouvoir passer dans IFTTT.

## Créer un Applet dans IFTTT

Cliquer sur le bouton "Create" en haut à droite de l'écran afin de choisir le "trigger" et l'action à effectuer.

![Formulaire de création d'un Applet IFTTT](/contents/uploads/screenshot-2023-09-23-at-12-11-24-create-ifttt.png)

Cliquer sur la zone "If This" et sélectionner le service "RSS Feed" puis choisir le trigger "New feed item.

![Écran de sélection du trigger de l'Applet](/contents/uploads/screenshot-2023-09-23-at-11-32-01-create-ifttt.png)

Renseigner ensuite l'URL du flux RSS qui déclenchera l'action et cliquer sur "Create trigger".

![Configuration du trigger](/contents/uploads/screenshot-2023-09-23-at-12-17-02-create-ifttt.png)

Une fois le trigger paramétré, il faut configurer l'action. Pour cela, cliquer sur la zone "Then That" puis choisir le service "Webhook.

![Écran de sélection du service qui doit effectuer l'action](/contents/uploads/screenshot-2023-09-23-at-11-33-18-create-ifttt.png)

Puis choisir l'action "Make a web request".

![Sélection de l'action à effectuer](/contents/uploads/screenshot-2023-09-23-at-11-33-27-create-ifttt.png)

Remplir le formulaire comme suit:

* **URL:** https://mastodon.social/api/v1/statuses
* **Method:** POST
* **Content Type:** application/x-www-form-urlencoded
* **Additional Headers:** Authorization: Bearer YOUR_ACCESS_TOKEN
* **Body:** status=<<<Votre texte ici>>>

Puis valider.

![Formulaire de paramétrage du web hook](/contents/uploads/screenshot-2023-09-23-at-11-34-52-create-ifttt.png)

C'est prêt !