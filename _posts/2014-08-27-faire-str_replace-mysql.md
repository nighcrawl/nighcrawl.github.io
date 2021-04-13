---

title: 'Faire un <code>str_replace()</code> avec MySQL'
date: 2014-08-27T09:46:49+00:00
author: Ange Chierchia
layout: post
permalink: /blog/faire-str_replace-mysql/
categories: "Back-End"

---
Lorsque je conçois les sites Web de nos clients, une fois mon travail terminé, je le met en ligne sur un domaine temporaire afin que le client puisse voir, utiliser et surtout alimenter le site Web en contenu avant de l&rsquo;installer sur son domaine définitif.

Une fois le client satisfait, il nous donne le &laquo;&nbsp;Go&nbsp;&raquo; pour la mise en ligne, nous transférons alors les fichiers et la base de données sur le domaine final. Parfois, les URLs générées dans le contenu des pages sont erronées suite au transfert sur le domaine définitif, et bien entendu les liens foirent&#8230; En PHP, on pourrait faire un bête `str_replace()`, ou un `preg_match_all()`. Mais en MySQL ? C&rsquo;est là que la requête qui suit va nous sauver :

    UPDATE pages SET contenu = REPLACE(contenu, 'http://ancienne.url', 'http://nouvelle.url') WHERE contenu LIKE '%ancienne.url%';

C&rsquo;est bidon, mais j&rsquo;ai toujours du mal à m&rsquo;en souvenir. Le publier ici me permettra de retrouver ça facilement. Après tout, ce blog est avant tout pour moi et si ça peut aider quelqu&rsquo;un d&rsquo;autre&#8230; 