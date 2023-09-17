---
title: Créer des info-bulles attractives avec jQuery
date: 2009-05-28T23:05:02.456Z
author: Ange Chierchia
layout: post
redirect_from: /blog/creer-des-info-bulles-attractives-avec-jquery/
img_article:
  - /contents/uploads/jquerytooltip_thumb.jpg
categories: "Front-End"
---
Dans cet article nous allons créer un plugin jQuery afin de générer à la volée des info-bulles stylisée en utilisant l&rsquo;attribut _title_.
  
<small><span style="color: red;">Màj: démo et fichiers en téléchargement en fin d&rsquo;article</span></small><!--more-->

## Introduction à jQuery

Avant toute chose, je ne ferai pas d&rsquo;article pour présenter/apprendre le framework jQuery, <a title="Babylon-Design" href="http://www.babylon-design.com" target="_blank">Samuel Le Morvan</a> a déjà fait un très bon article sur le sujet, je vous invite donc à aller voir <a title="Apprendre et comprendre jQuery" href="http://www.babylon-design.com/site/index.php/?q=apprendre+jquery" target="_blank">son billet</a> avant de commencer ici.

## Mise en forme du code HTML et CSS

Après un passage dans Photoshop ou autre logiciel de création graphique, il est tant de découper notre design d&rsquo;info-bulle afin de l&rsquo;intégrer en XHTML et CSS.

<img class="alignnone size-full wp-image-170" title="bulle" alt="bulle" src="https://chierchia.fr/wp-contents/bulle.png?resize=289%2C185" />

Après avoir découpé votre design en trois parties (topBulle.png, bottomBulle.png et fondBulle.png pour mon exemple), il est temps de passé au code HTML et CSS de notre bulle. Nous intégrerons ce code HTML dans notre plugin jQuery ne l&rsquo;enregistrez donc pas dans un fichiers mais gardez le en-tête.

dans notre fichier index.html, nous allons insérer une simple le ligne de code

    <a href="#" title="Ici se trouve le texte de notre info-bulle">Survolez pour afficher l'info-bulle</a>

Voilà maintenant pour notre feuille de style :

    .bg {
        background: transparent url(images/fondBulle.png) repeat-y;
        padding: 0 25px 20px 25px;
    }
    .basbulle {
        background: transparent url(images/bottomBulle.png) no-repeat bottom;
        height: 52px;
    }

Notre classe _bulle_ permet de garder le tout bien ensemble. Elle nous permet aussi de définir les dimensions et le fond de notre bulle. Les propriétés width et padding-top sont respectivement la largeur et la hauteur de notre image topBulle.png. La classe _bg_ permet de définir des marges intérieures et un fond que l&rsquo;on répète pour l&rsquo;ajuster à la taille de notre bloc. Enfin la classe _basbulle_ permet de fermer notre info-bulle.

## Le plugin jQuery

Voici le code complet du plugin, on vera les détails juste après

    $.fn.infoBulle = function(options){
        /* options par défaut pour l'info-bulle */
        var defaults = {
            speed: 200,
            delay: 300
        };

        var options = $.extend(defaults, options);

        /* création de la fonction permettant de générer le code HTML de l'info-bulle */
        getBulle = function() {
            var tBulle =
                "&lt;div class='bulle'&gt;" +
                "&lt;div class='bg'&gt;"    +
                "&lt;/div&gt;" +
                "&lt;div class='basbulle'&gt;&lt;/div&gt;" +
                "&lt;/div&gt;";
            return tBulle;
        }
        $("body").prepend(getBulle());

        /* permettre l'appel du plugin */
        $(this).each(function(){

            var $this = $(this);
            var bulle = $('.bulle');
            var bulleInner = $('.bulle .bg');

            var tTitle = (this.title);
            this.title = "";

            var offset = $(this).offset();
            var tLeft = offset.left;
            var tTop = offset.top;
            var tWidth = $this.width();
            var tHeight = $this.height();

            /* fonctions mouse over/out */
            $this.hover(
                function() {
                    bulleInner.html(tTitle);
                    setBulle(tTop, tLeft);
                    setTimer();
                },
                function() {
                    stopTimer();
                    bulle.hide();
                }
            );

            /* animation de la transition */
            setTimer = function() {
                $this.showBulleTimer = setInterval("showBulle()", defaults.delay);
            }

            stopTimer = function() {
                clearInterval($this.showBulleTimer);
            }

            /* positionnement de l'infobulle */
            setBulle = function(top, left){
                var topOffset = bulle.height();
                var xBulle = (left-30)+"px";
                var yBulle = (top-topOffset-60)+"px";
                bulle.css({'top' : yBulle, 'left' : xBulle});
            }

            /*fonction qui arrete le timer et anime la transition */
            showBulle = function(){
                stopTimer();
                bulle.animate({"top": "+=20px", "opacity": "toggle"}, defaults.speed);
            }
        });
    };

## Définition de la fonction infoBulle

Tout d&rsquo;abord nommez votre fichier JavaScript comme suit jquery.infoBulle.js ce qui permettra à notre plugin d&rsquo;être reconnu par jQuery.

Dans ce fichier la définition de notre fonction ce fait ainsi :

    $.fn.infoBulle = function(){
    });

Cela permet de définir notre fonction comme étant publique et donc d&rsquo;être appellée dans d&rsquo;autre documents. Ceci fait, pour appeller notre plugin il suffira d&rsquo;insérer le code suivant entre les balise <head> et </head> de notre page HTML :

    $(document).ready(function(){
        $('.tBulle').infoBulle();
    });

Grâce à ce morceau de code notre plugin sera appellé par tout les élements dont la classe est _tBulle_.

## Paramétrer l&rsquo;animation du plugin

Afin de rendre notre plugin le plus réutilisable possible, il est pratique de créer une fonction permettant de donner les paramètres souhaité à notre animation. Ici nous nous occuperons du temps et de la vitesse de l&rsquo;animation.

    $.fn.infoBulle = function(options){
        var defaults = {
            speed: 200,
            delay:300
        };
        var options = $.extend(defaults, options);
    });

Ainsi si l&rsquo;on ne renseigne pas la varialbe options lorsqu&rsquo;on invoque le plugin, il utilisera les valeurs par défauts. Pour paramétrer le plugin, on écrira la ligne suivante : `$(&lsquo;bBulle&rsquo;).infoBulle({speed:400, delay:600});`

## Création à la volée du code HTML/CSS de notre info-bulle

C&rsquo;est ici que le code HTML en début d&rsquo;article va nous servir.  La fonction prepend() de jQuery va nous permettre d&rsquo;injecter avant tout contenu existant, notre code HTML afin de positionner notre info-bulle au dessus de tout autre contenu.

    getBulle = function() {
        var tBulle = "&lt;div class='bulle'&gt;" +
        "<div class='bg'>"    +
        "</div>" +
        "<div class='basbulle'></div>" +
        "</div>";
        return tBulle;
    }
    $("body").prepend(getBulle());

## La fonction $(this).each()

Cette fonction permet de boucler à travers tout les élements d&rsquo;une page associés au plugin lorsqu&rsquo;il est invoqué dans les balises `<head></head>`. Ici la fonction bouclera sur chaque élément ayant comme classe tTip et appliquera les propriétés et méthodes que l&rsquo;on va y définir.

    $(this).each(function(){
        var $this = $(this);
        var bulle = $('.bulle');
        var bulleInner = $('.bulle .bg');

        var tTitle = (this.title);
        this.title = "";

        var offset = $(this).offset();
        var tLeft = offset.left;
        var tTop = offset.top;
        var tWidth = $this.width();
        var tHeight = $this.height();

        /* fonctions mouse over/out */
        $this.hover(function() {
            bulleInner.html(tTitle);
            setBulle(tTop, tLeft);
            setTimer();
        }, function() {
            stopTimer();
            bulle.hide();
        });
    });

Ici on a juste défini la position que prendra notre info-bulle, et les paramètre du mouseover et mouseout. De même on met en mémoire la valeur de l&rsquo;attribut title dans la variable tTitle, et on supprime le texte de l&rsquo;attribut title pour éviter d&rsquo;afficher l&rsquo;info-bulle par défaut et avoir notre info-bulle jQuery accompagnée par l&rsquo;info-bulle simple. On réalise ceci avec la ligne suivante : `this.title = "";`

## L&rsquo;animation de l&rsquo;info-bulle

Ici on va utiliser deux fonctions setTimer et stopTimer permettant de définir une intervalle de temps entre le survol d&rsquo;un élement de la classe tTip et l&rsquo;apparition de notre info-bulle

    setTimer = function() {
        $this.showBulleTimer = setInterval("showBulle()", defaults.delay);
    }

    stopTimer = function() {
        clearInterval($this.showBulleTimer);
    }

## Positionnement de l&rsquo;info-bulle

On positionne ensuite notre info-bulle grâce à la fonction setBulle

    /* positionnement de l'infobulle */
    setBulle = function(top, left){
        var topOffset = bulle.height();
        var xBulle = (left-30)+"px";
        var yBulle = (top-topOffset-60)+"px";
        bulle.css({'top' : yBulle, 'left' : xBulle});
    }

## Affichage de l&rsquo;info-bulle

On arrive enfin au bout de notre plugin, ici la fonction showBulle permet de définir les paramètres de l&rsquo;animation qui seront utilisé dans la fonction setTimer.

    showBulle = function(){
        stopTimer();
        bulle.animate({"top": "+=20px", "opacity": "toggle"}, defaults.speed);
    }

C&rsquo;est tout! 😉

## Fichiers source

[Voir la démo](https://nighcrawl.github.io/jquery-tooltip/) [Télécharger les fichiers](https://github.com/nighcrawl/jquery-tooltip/)