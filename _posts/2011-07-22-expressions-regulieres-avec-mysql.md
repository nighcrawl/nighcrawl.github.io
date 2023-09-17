---

title: Expressions régulières avec MySQL
date: 2011-07-22T21:08:08.456Z
author: Ange Chierchia
layout: post

redirect_from: /blog/expressions-regulieres-avec-mysql/
more-link-text:
  - "Regarde comme c'est beautiful!"

image: /contents/uploads/2012/01/thumb-sql-regex.jpg
categories: "Back-End"
---
Petite trouvaille du vendredi: Exécuter des requêtes MySQL pleine d&rsquo;expressions régulières. Cette après midi, en faisant un petit tour dans la base de données des inscrits à la newsletter de CBC qui avait bien besoin d&rsquo;un clean up afin de supprimer les adresses e-mails invalides.<!--more-->

Du coup, je cherchais un moyen de supprimer les adresses mails mal formatées qu&rsquo;on trimbale, et par la même occasion, récupérer seulement les adresses mails bien formatées lors de l&rsquo;envoi de la newsletter, en attendant que l&rsquo;on fasse un beau remodeling du site actuel.

Du coup, je m&rsquo;suis demandé tout bêtement, si MySQL prenait en compte les expressions régulières, ce qui m&rsquo;aurai facilité le travail. Et bien sachez le, c&rsquo;est carrément possible (youpi!) et super simple à mettre en oeuvre en plus. Voilà comment :

### Dans un SELECT

Utile si vous voulez récupérer tous les champs validant l&rsquo;expression régulière

    SELECT 'fofo' REGEXP '^fo' FROM table;

### Dans une clause WHERE

En fait, ça ne change pas grand chose

    SELECT champ FROM table WHERE champ REGEXP '^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$' AND champ2 REGEXP '(chouette|cool|super)'

Alors, heureux? 