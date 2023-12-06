---
title: Créer un pixel de suivi
date: 2016-03-08T19:10:44.456Z
author: Ange Chierchia
layout: post
redirect_from: /blog/creer-un-pixel-de-suivi/
image: /contents/uploads/0851180c82edcb207c0f6a706700d56c_c413-0-2587-1268_s885x516-825x510.jpg
categories: "Back-End"
---
Ces dernières semaines, j&rsquo;ai essentiellement travaillé sur la conception d&rsquo;un cookie/pixel de suivi et le traitement des informations récupérées, pour en faire des tableaux statistiques et autres graphiques de fréquentation par la suite. Je vous parlerai peut-être de mon expérience avec <a href="http://c3js.org/" target="_blank">la librairie JavaScript C3.js</a> dans un prochain article.

L&rsquo;intérêt d&rsquo;un tel dispositif est de pouvoir &laquo;&nbsp;tracker&nbsp;&raquo; ce qu&rsquo;un visiteur fait lorsqu&rsquo;il parcours votre site Web, ou encore de savoir si une campagne emailing a bien été ouverte.<!--more-->

## Pixel de suivi

Le code partagé ici est un exemple basique est ne reflète pas exactement la solution que j&rsquo;ai utilisé pour tracker les visiteurs de nos sites Internet, mais le principe reste le même.

    <?php
    // On récupère d'abord l'adresse IP du visiteur
    $ip = !empty($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (!empty($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']);
    
    // Navigateur utilisé
    $browser = $_SERVER['HTTP_USER_AGENT'];
    
    // URL de la page visité
    $url = $_SERVER['REQUEST_URI'];
    
    // Enregistrement dans un fichier de log
    $handle = fopen('log.txt', 'a+');
    $log_data = date('Y-m-d H:i:s') . ' -- ' . $ip . ' -- ' . $brower . ' -- '. $url . "\r\n";
    fwrite($handle, $log_data);
    fclose($handle);
    
    // Création du pixel de suivi
    $pixel = imagecreate(1,1);
    $pixel = imagecolorallocatealpha($pixel, 255, 255, 255, 0);
    
    // Enfin, on affiche le pixel de suivi
    header('Content-Type: image/png');
    imagepng($pixel);
    imagedestroy($pixel)
    ?>

## Intégrer le pixel de suivi

Maintenant que notre image de 1 pixel sur 1 pixel est créée, il ne reste plus qu&rsquo;à l&rsquo;insérer dans le code HTML des pages que l&rsquo;on souhaite suivre. Une simple balise `img` juste avant la balise `</body>` suffira !

    <img src="pixel.php" width="1" height="1" />

Eh voilà ! J&rsquo;espère que ce petit bout de code vous aura plu. Si vous avez d&rsquo;autres solutions, n&rsquo;hésitez pas à les partager dans les commentaires.

Tchô !