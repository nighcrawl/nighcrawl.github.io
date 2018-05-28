---
id: 386
title: 'Récupérer la valeur d&#039;un champ personnalisé dans WordPress hors de la Boucle'
date: 2009-09-02T22:26:46+00:00
author: Ange Chierchia
layout: post
guid: http://chierchia.fr/?p=386
permalink: /blog/wordpress-custom-field-hors-de-la-loop/
img_article:
  - /contents/uploads/wploopthumb.jpg
dsq_thread_id:
  - "917787450"
Hide SexyBookmarks:
  - "0"
Hide OgTags:
  - "0"
categories:
  - PHP/MySQL
tags:
  - custom field
  - MySQL
  - PDO
  - PHP
  - Wordpress
---
Aujourd&rsquo;hui je vais vous faire partager une petite astuce que j&rsquo;ai dut utiliser pour l&rsquo;un de mes projets en cours. La problématique : Comment afficher un custom field lorsqu&rsquo;on est hors de la loop wordpress?<!--more-->

Il y a quelques jours, je travaillais sur l&rsquo;intégration d&rsquo;un design dans le système de blog WordPress, plateforme que j&rsquo;utilise notamment ici. Dans ma charte graphique, chaque élément du menu de navigation est suivi d&rsquo;une petite phrase expliquant ce que l&rsquo;on trouvera dans la page lié. J&rsquo;avais décidé d&rsquo;enregistrer ces phrases dans un champ personnalisé pour pouvoir l&rsquo;afficher très simplement et rapidement avec l&rsquo;une des fonctions qu&rsquo;intègre WordPress comme wp\_page\_menu() ou wp\_list\_page().

Malheureusement, comme me l&rsquo;a confirmé mon ami @clawfire, ces deux fonctions n&rsquo;entrent pas dans ce qu&rsquo;on appelle la Boucle ou Loop dans le jargon WP, il me fallait donc coder moi même l&rsquo;affichage du menu intégrant ce champ personnalisé. Voilà la marche à suivre

## Sur quelles tables de la base de données doit on travailler?

D&rsquo;abord il faut savoir dans quelles tables sont enregistrés les données qui nous intéresses.  On remarquera que WordPress enregistre les données d&rsquo;un article dans la table wp\_posts, et la table wp\_postmeta enregistre d&rsquo;autres informations moins primordiales comme par exemple quel modèle de page utilise l&rsquo;article, ET les différents champs personnalisés attachés à l&rsquo;article.

## Au boulot!

Maintenant qu&rsquo;on sait sur quoi faire notre requête SQL, il est temps de passer à la programmation!

<pre class="brush:php">try{

$db = new PDO('mysql:dbname=database;host=localhost','root','pass');

} catch(PDOException $e){

echo "connexion echoué : ".$e-&gt;getMessage();

}

//on récupère l'ID de la page statique qui sert de page d'accueil du site

$strHomepage = "SELECT option_value FROM wp_options WHERE option_name = 'page_on_front'";

$stmt = $db-&gt;prepare($strHomepage);

$stmt-&gt;execute();

$home_id = $stmt-&gt;fetch(PDO::FETCH_OBJ)-&gt;option_value;

//on récupère la valeur de l'option siteurl

$strHomeUrl = "SELECT option_value FROM wp_options WHERE option_name = 'siteurl'";

$stmt = $db-&gt;prepare($strHomeUrl);

$stmt-&gt;execute();

$home_url = $stmt-&gt;fetch(PDO::FETCH_OBJ)-&gt;option_value;

//on récupère les infos neccessaires à l'affichage du menu avec la taglines

$strTagline = "SELECT * FROM wp_posts p, wp_postmeta m WHERE p.ID = m.post_id

AND meta_key = 'nav_tagline' AND post_parent = 0

AND post_type ='page' AND post_status = 'publish'

ORDER BY menu_order ASC";

//echo $home_id;

$stmt = $db-&gt;prepare($strTagline);

$stmt-&gt;execute();

echo "&lt;ul&gt;";

while($r = $stmt-&gt;fetch()){

if($r['ID'] == $home_id){

} else {

echo "&lt;li&gt;&lt;a href='".$home_url."/?page_id=".$r['ID']."'&gt;".$r['post_title']."&lt;span&gt;".$r['meta_value']."&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;";

}

}

echo "&lt;ul&gt;";</pre>

Et voilà, notre menu avec un custom field est terminé!