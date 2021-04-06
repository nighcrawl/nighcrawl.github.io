---

title: Afficher une date relative en PHP
date: 2010-04-12T13:28:52+00:00
author: Ange Chierchia
layout: post

permalink: /blog/afficher-une-date-relative-en-php/
image: /contents/uploads/2010/04/phpcutetime.jpg
category: "Back-End"
---
Hier, je vous présentais le [plugin jQuery CuteTime](http://chierchia.fr/ajax-javascript/plugin-jquery-cutetime-affichez-vos-dates-comme-sur-twitter/ "Afficher de jolies dates en jQuery grâce à CuteTime"), aujourd&rsquo;hui, je vous propose de faire la même chose, mais cette fois en PHP, grâce à une fonction qu&rsquo;a proposé <a title="Temps relatif en PHP" href="http://blog.jaysalvat.com/articles/temps-relatif-en-php.php" target="_blank">Jay Salvat sur son blog</a>.<!--more-->

Comme CuteTime, la fonction de Jay permet de retourner une date relative, comme sur Twitter. Avec la fonction de Jay Salvat, il est possible de passer plusieurs formats de dates, à la différence du plugin CuteTime ou il n&rsquo;accepte que des dates formatées de la façon suivante : 2010/04/12 13:15:30. Ici on peut fournir une date du style 12 avril 2010 13:15 grâce à la fonction PHP strtotime qui permet de transformer une chaîne en timestamp.

Bon trêve de blabla, voici la fonction que propose Jay pour parvenir un résultat similaire à CuteTime, mais cette fois côté serveur:

<pre class="brush:php">&lt;?php
/**
 * Fonction getRelativeTime
 * par Jay Salvat - http://blog.jaysalvat.com/
 */

function getRelativeTime($date) {
    // Déduction de la date donnée à la date actuelle
    $time = time() - strtotime($date); 

    // Calcule si le temps est passé ou à venir
    if ($time &gt; 0) {
        $when = "il y a";
    } else if ($time &lt; 0) {
        $when = "dans environ";
    } else {
        return "il y a moins d'une seconde";
    }
    $time = abs($time); 

    // Tableau des unités et de leurs valeurs en secondes
    $times = array( 31104000 =&gt;  'an{s}',       // 12 * 30 * 24 * 60 * 60 secondes
                    2592000  =&gt;  'mois',        // 30 * 24 * 60 * 60 secondes
                    86400    =&gt;  'jour{s}',     // 24 * 60 * 60 secondes
                    3600     =&gt;  'heure{s}',    // 60 * 60 secondes
                    60       =&gt;  'minute{s}',   // 60 secondes
                    1        =&gt;  'seconde{s}'); // 1 seconde         

    foreach ($times as $seconds =&gt; $unit) {
        // Calcule le delta entre le temps et l'unité donnée
        $delta = round($time / $seconds); 

        // Si le delta est supérieur à 1
        if ($delta &gt;= 1) {
            // L'unité est au singulier ou au pluriel ?
            if ($delta == 1) {
                $unit = str_replace('{s}', '', $unit);
            } else {
                $unit = str_replace('{s}', 's', $unit);
            }
            // Retourne la chaine adéquate
            return $when." ".$delta." ".$unit;
        }
    }
}
?&gt;</pre>

Pour l&rsquo;utiliser, il suffit ensuite d&rsquo;en faire l&rsquo;appel comme ça :

<pre class="brush:php">&lt;?php echo getRelativeTime ('2010-03-01 13:25:00'); ?&gt;</pre>

Si vous utiliser un gestionnaire de contenu comme WordPress, vous pouvez aussi inclure cette fonction dans le fichier function.php de votre thème, vous pourrez donc l&rsquo;utiliser dans votre thème WordPress.