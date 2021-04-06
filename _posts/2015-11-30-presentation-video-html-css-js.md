---

title: Une présentation vidéo en HTML, CSS et JS
date: 2015-11-30T08:15:07+00:00
author: Ange Chierchia
layout: post

permalink: /blog/presentation-video-html-css-js/
image: /contents/uploads/html5-topper-825x510.png
---
Il y a déjà quelques mois, j&rsquo;ai eu la tâche de trouver un moyen de présenter différent aspects d&rsquo;une application que mes collègues et moi développons chez [Ibakus Europe](https://www.ibakus.com).

L&rsquo;idée était de faire une sorte de présentation vidéo expliquant les différents menus de l&rsquo;application et que l&rsquo;on puisse &laquo;&nbsp;naviguer&nbsp;&raquo; dans celle-ci, un peu comme une sorte de PowerPoint vidéo.<!--more-->

## Première idée, à chaud

Au départ, mon idée était de réaliser un screencast en suivant un scénario d&rsquo;utilisation de l&rsquo;application puis d&rsquo;utiliser un logiciel de montage vidéo, du genre After Effects pour placer les différentes info-bulles.

Mais ça voulait dire perdre la possibilité de modifier les textes des info-bulles une fois la vidéos montée, encodée et tout le toutim.

## Ma solution (presque parfaite)

Je me suis alors demandé comment je pouvais bien faire pour garder la possibilité de modifier les info-bulles a posteriori.

Voilà où je suis arrivé : le principe était de réaliser plusieurs petits screencasts pour chaque menu dans lesquels on suivait le scénario et de les inclure dans un document HTML à l&rsquo;aide de balises `<video>`.

Pour lire chaque morceaux de vidéos et afficher les info-bulles aux bons moments, on a utilisé JavaScript et CSS.

### Structure de la page HTML

Dans notre page HTML, nous allons créer un `<div>` auquel au ajoutera l&rsquo;attribut `class="wrapper"`. Ce `div.wrapper` contiendra deux éléments <div>; le premier encapsulera nos info-bulles (`div.bubbles-holder`) et le second regroupera nos vidéos (`div.medias-holder`).

    <div class="wrapper">
      <a href="#step-1" id="start" data-media="1">Start</a>
      <div class="bubbles-holder">
        <!-- ici, nos info-bulles -->
      </div>

      <div class="medias-holder">
        <!-- ici, nos vidéos -->
      </div>
    </div>

#### Les info-bulles

Chaque info-bulle est composée d&rsquo;un paragraphe explicatif et de boutons permettant la navigation entre les vidéos.
  
Pour afficher l&rsquo;info-bulle adéquate via JavaScript, elles auront toute une ID unique, du style `#step-X`.
  
Chaque bouton de navigation aura un attribut `data-media` qui permettra de savoir quelle vidéo doit être jouée lorsqu&rsquo;on clique dessus.
  
Voici ce que ça donne.

    <div class="bubbles-holder">
      <div id="step-1" class="bubble">
        <div class="bubble__content">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, eos.</p>
        </div>

        <div class="bubble__navigation">
          <a data-media="1" href="#step-1" class="navigation__btn--replay">Replay</a>
          <a data-media="2" href="#step-2" class="navigation__btn--next">Next</a>
        </div>
      </div>

      <!-- Les info-bulles suivantes -->
    </div>

#### Les vidéos

Pour les vidéos, rien de bien fou, simplement un ID qui nous servira dans le JavaScript et deux formats différents comme sources pour ainsi couvrir la majorité des navigateurs Web actuels.

    <div class="medias-holder">
      <div class="media" id="media-1">
        <video class="media--video" id="video-1">
          <source src="video-1.webm" type="video/webm">
          <source src="video-1.mp4" type="video/mpeg">
        </video>
      </div>

      <!-- les autres vidéos -->
    </div>

### La feuille de styles CSS

Lorsque la page s&rsquo;affiche on ne souhaite afficher que la première vidéo et un bouton &laquo;&nbsp;Start&nbsp;&raquo; qui permettra de jouer la présentation vidéo. Tout le reste doit être caché et ne sera affiché qu&rsquo;au moment voulu, via JavaScript.

Voici ce que ça donne.

    .wrapper {
      height: 720px;
      margin: 0 auto;
      position: relative;
      width: 1080px;
    }

    .bubbles-holder,
    .medias-holder  {
      display: block;
      position: absolute;
    }

    .bubbles-holder .bubble,
    .medias-holder .media {
      display: none;
      position: absolute;
    }

    .medias-holder .media:fist-child {
      display: block;
    }

Le reste de la feuille de styles CSS n&rsquo;est pas important ici, il suffira juste d&rsquo;ajouter des règles pour l&rsquo;esthétisme de la page et de l&rsquo;interface.

### Gestion des évènements en JavaScript

Pour plus de facilité avec la gestion des évènements, j&rsquo;utilise jQuery. Ce que l&rsquo;on souhaite, c&rsquo;est lancer la lecture d&rsquo;une vidéo lorsqu&rsquo;on clique sur un bouton de navigation (&laquo;&nbsp;Start&nbsp;&raquo;, &laquo;&nbsp;Replay&nbsp;&raquo;, &laquo;&nbsp;Next&nbsp;&raquo;, &laquo;&nbsp;Prev&nbsp;&raquo;), et afficher l&rsquo;info-bulle qui s&rsquo;y rapporte.

    $(document).on('click', 'a', function (event) {
      event.preventDefault(); // Permet d'annuler l'action normal d'un clic sur un lien hypertexte

      // On affiche uniquement la vidéo voulue  
      var media = $(this).attr('data-media');
      if (media !== undefined) {
        $('.media').hide(); // On cache tous les .media en display: block
        $('#media-' + media).show();
        
        // On force la vidéo à être jouée depuis le début (utile pour le clic sur 'Replay'
        var video = document.getElementById('video-' + media);
        video.pause();
        video.currentTime = 0;
        video.play();
      }

      // Si le clic ne s'est pas fait sur un bouton 'Replay', on cache toutes les info-bulles et on affiche seulement celle de la vidéo jouée
      var step = $(this).attr('href');
      if (href.length > 0 && $(this).hasClass('navigation__btn--replay') != true) {
        $('.bubble)"fadeOut('fast');
        $(href).delay(ac__getDelay(step)).fadeIn();
      }

      // Si on clic sur le bouton 'Start', on le cache en fondue
      if ($(this).attr('id') == "start")
        $(this).fadeOut('fast');
    });

Et voilà ! Au clic sur un bouton de navigation (ou sur le bouton &laquo;&nbsp;Start&nbsp;&raquo;), on affiche la vidéo dont la référence est passée dans l&rsquo;attribut `data-media` du bouton, puis on affiche l&rsquo;info-bulle qui s&rsquo;y rapporte dont la référence est passée dans l&rsquo;attribut `href` du bouton.

Vous remarquerez l&rsquo;appel de la fonction `ac__getDelay()` lors de l&rsquo;affichage des info-bulles, je ne la détaillerai pas ici, mais c&rsquo;est une fonction qui me permet de retourner un nombre de milli-secondes différent en fonction de l&rsquo;info-bulle passée en paramètre.

## Mission accomplie !?

Je ne sais pas si avec mes collègues on a fait le bon choix en partant sur cette solution, mais le fait est que ça marche et que le rendu est plutôt sympa.

Par contre, si le contenu de la présentation vidéo est amené à changer régulièrement, ça peut-être fastidieux, car il faut enregistrer les screencasts, caler les délais d&rsquo;affichage des info-bulles sur la vidéo, etc.

En tout cas, je pose ça là et vous en faites ce que vous voulez.

Tchô !