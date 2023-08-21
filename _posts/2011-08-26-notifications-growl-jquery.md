---

title: Notifications à la Growl avec jQuery
date: 2011-08-26T21:04:51+00:00
author: Ange Chierchia
layout: post

redirect_from: /blog/notifications-growl-jquery/
image: /contents/uploads/2012/01/thumb-growl-notification.jpg
categories: "Front-End"
---
Aujourd&rsquo;hui, on va voir comment mettre en place facilement des notifications utilisateur un peu à la façon de Growl, très connu des Mac users.<!--more-->

Du côté du markup HTML, notre notification se résumera à pas grand chose : un simple bloc fera l&rsquo;affaire pour contenir notre message. On peu aussi rajouter une icône/image afin de donner une information supplémentaire sur la nature de la notification. Ça n&rsquo;a vraiment aucune importance, pourvu que l&rsquo;information affichée soit courte. Voici mon marquage :

    <div class="notify">
      <span class="icon"></span>
      <p>Je suis une notification. Je vais dispara&icirc;tre! Phasellus elit nunc, tristique sed sodales sit amet, tincidunt sed.</p>
    </div>

Pour animer notre notification on aurait pu choisir CSS3 comme l&rsquo;a fait <a title="Pop From Top Notification" href="http://css-tricks.com/13815-pop-from-top-notification/" target="_blank">Chris Coyer</a>, mais je préfère utiliser jQuery pour ne pas pénaliser les navigateurs qui ne prendraient pas en compte les animations CSS, et pour m&rsquo;éviter une belle tartine de définition de style :D. Voilà le Javascript :

    jQuery(document).ready(function($) {
      $(".notify").css("display","none").delay(1000).fadeIn(400).delay(5500).fadeOut(800);
      $(".notify").hover(function() {
          $(this).stop(true, true).fadeIn();
      }, function() {
          $(this).stop(true, true).delay(1000).fadeIn(400).delay(5500).fadeOut(800);
      });
    });

Le script ci-dessus permet de cacher notre notification au chargement de la page, puis après une demi seconde d&rsquo;attente d&rsquo;afficher notre notification en fondue pendant cinq secondes et demi pour enfin la faire disparaitre en fondue.

Dans le cas où notre notification est survolé par la souris (fonction `hover()`) on stoppe l&rsquo;animation jusqu&rsquo;à ce que la souris sorte de la notification. Une fois la souris hors de la notification, on reprend l&rsquo;animation après avoir attendu une demi seconde.

Passons maintenant à notre feuille de style. Ce qu&rsquo;il est important de noter, c&rsquo;est que notre bloc contenant le message informatif doit être en `position : absolute` afin de le positionner, non pas par rapport à son conteneur mais plutôt par rapport au document HTML lui même.

    .notify {
      background: rgba(0, 0, 0, 0.7);
      border: 2px solid #222222;
      -moz-border-radius: 8px;
      -webkit-border-radius: 8px;
      border-radius: 8px;
      -moz-box-shadow: 0 3px 5px rbga(0, 0, 0, 0.4);
      -webkit-box-shadow: 0 3px 5px rbga(0, 0, 0, 0.4);
      box-shadow: 0 3px 5px rbga(0, 0, 0, 0.4);
      color: #ffffff;
      font-size: .8em;
      max-width: 246px;
      padding: 25px;
      position: absolute;
      right: 8px;
      top: 8em;
    }
    .notify:hover {
      border: 2px solid #eeeeee;
    }
    .notify p {
      cursor: default;
      margin: 0;
    }
    .notify .icon {
      background: url("../img/notify_icon.png") no-repeat;
      display: block;
      height: 40px;
      left: -30px;
      position: absolute;
      top: 10px;
      width: 40px;
    }

C'est fini ! Vous pouvez [voir la démo](https://nighcrawl.github.io/growl-notification/) et [télécharger les sources](https://github.com/nighcrawl/growl-notification/) sur GitHub.