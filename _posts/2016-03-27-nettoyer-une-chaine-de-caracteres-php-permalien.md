---

title: Nettoyer une chaîne de caractères avec PHP
date: 2016-03-27T15:10:26.456Z
author: Ange Chierchia
layout: post
redirect_from: /blog/nettoyer-une-chaine-de-caracteres-php-permalien/
categories: "Back-End"
---
Quoi de plus simple que de nettoyer une chaîne de caractères pour l&rsquo;utiliser comme URL vers une page, un article ou tout autre contenu publié sur Internet en général ? Et pourtant&#8230;

Bien que très simple à mettre en place dans les faits, quand vient l&rsquo;heure de nettoyer une chaîne de caractères pleine d&rsquo;accents, de signes de ponctuation et autres caractères spéciaux, c&rsquo;est la galère.<!--more-->

Voici la fonction que j&rsquo;utilise pour nettoyer mes chaînes de caractères et les utiliser comme <a href="https://fr.wikipedia.org/wiki/Permalien" target="_blank">permalien</a>

    function clean($string) {
    	$string = html_entity_decode(preg_replace('/&([a-zA-Z]{1,2})(?:acute|cedil|circ|grave|lig|orn|ring|slash|th|tilde|uml);/i', '$1', htmlentities($string, ENT_QUOTES, 'UTF-8')), ENT_QUOTES, 'UTF-8');
    	$string = strtolower(trim(preg_replace('/[^0-9a-z]+/i', '-', $string), '-'));
    
    	return $string;
    }

Le principe ici est très simple. D&rsquo;abord on converti tout les caractères qui peuvent l&rsquo;être en entités HTML à l&rsquo;aide de la fonction `htmlentities()`, ensuite on remplace chaque caractère par son équivalent sans accent, cédille, etc.

    preg_replace('/&([a-zA-Z]{1,2})(?:acute|cedil|circ|grave|lig|orn|ring|slash|th|tilde|uml);/i', '$1', htmlentities($string, ENT_QUOTES, 'UTF-8')), ENT_QUOTES, 'UTF-8');

En appliquant la fonction `html_entity_decode()` sur la chaîne nettoyée de tout caractère accentué, on transforme à nouveau les entités HTML restantes en caractères normaux.

Enfin, on remplace tous les caractères n&rsquo;étant pas des lettres ou des chiffres par un tiret, puis on supprime les tirets en trop à l&rsquo;aide de la fonction `trim()`.

J&rsquo;espère que ce petit morceau de code vous aura été utile :).

N&rsquo;hésitez pas à partager votre solution, ou vos remarques dans les commentaires.

Tchô !