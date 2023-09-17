---

title: 'Comment utiliser l&#039;objet PDO de PHP pour les connexions à une base de données?'
date: 2009-08-22T19:12:21.456Z
author: Ange Chierchia
layout: post

redirect_from: /blog/utiliser-pdo-pour-les-connexion-a-une-bdd/
img_article:
  - /contents/uploads/phppod.jpg
categories: "Back-End"
---
Aujourd&rsquo;hui, je vais vous parler de ce qui va bientôt être la seule façon d&rsquo;inititier une &laquo;&nbsp;discussion&nbsp;&raquo; entre un script PHP et une base de donnée, en effet la version 6 de PHP ne supportera plus des fonction comme mysql\_select\_db() , mysql_query() et autres fonctions du même genre permettant l&rsquo;interation avec une base de donnée jusqu&rsquo;à la version 5.x de PHP.<!--more-->

### Qu&rsquo;est-ce que c&rsquo;est un objet PDO?

PDO pour PHP Data Objects, pour faire simple donc, les discussions avec notre base de données se feront avec la notion d&rsquo;Objet, pour ceux qui ne voient pas ce qu&rsquo;est la programmation orientée objet, <a title="Programmation orientée objet sur Wikipédia" href="http://fr.wikipedia.org/wiki/PPO" target="_blank">direction Wikipedia</a>.

### Qu&rsquo;est-ce que ça change?

Tout! Avec PDO, on ne s&#8217;embête plus à faire un gros script qui gère le fait que l&rsquo;on utilise une base de donnée MySQL, SQL Server, PostgreSQL, Oracle, etc&#8230; Ici, nous n&rsquo;avons besoins de changer que quelques parametres, et zou! on utilise les même methodes partout dans notre projet PHP. PDO permet donc une meilleure portabilité d&rsquo;un programme sur un autre environemment que celui pour lequel il a été développé.

### Comment utiliser PDO ?

Mieux qu&rsquo;une explication à rallonge, on va voir ici un exemple de connexion simple à une base MySQL sans utiliser PDO, et ensuite en utilisant PDO, pour bien mettre en evidence l&rsquo;avantage d&rsquo;utiliser PDO pour nos prochains projets.

Imaginons qu&rsquo;on est une base de données nommée &laquo;&nbsp;dbtest&nbsp;&raquo;, contenant la table &laquo;&nbsp;tbltest&nbsp;&raquo; construite de la façon suivante :

<pre class="brush:plain">CREATE TABLE tbltest (
id int NOT NULL auto_increment,
login varchar(50),
pass varchar(255),
email varchar(200),
PRIMARY KEY(id)
);</pre>

En utilisant les fonctions mysql_* il nous faut écrire pas mal de code pour se connecter à la base et executer une requête :

<pre class="brush:php">&lt;?php
$db = mysql_connect('localhost','login','password'); //connexion à  MySQL
mysql_select_db('dbtest',$db); //séléction de la base sur laquelle on va travailler
$strSQL = "SELECT login,pass,email FROM tbltest"; //notre requête
$result = mysql_query($strSQL) or die('Erreur '.mysql_error()); //execution de la requête
//affichage des résultats
while($row = mysql_fetch_assoc($result)){
echo $row['login']." ".$row['pass']." ".$row['email']."&lt;br/&gt;";
}
mysql_close();
?&gt;</pre>

Maintenant, voyons comment executer cette même requête avec un objet PDO :

<pre class="brush:php">&lt;?php
try {//creation de l'objet PDO
$db = new PDO('mysql:host=localhost;dbname=dbtest','login','password');
$strSQL = "SELECT login,pass,email FROM tbltest";
//execution de la requête et affichage des résultats
foreach($db-&gt;query($strSQL) as $row){
echo $row['login']." ".$row['pass']." ".$row['email']."&lt;br/&gt;";
}
} catch (PDOException $e){ //erreur de connexion à la basse
print "Erreur : ".$e-&gt;getMessage()
die();
}
$db = null; //on ferme la connexion
?&gt;</pre>

### L&rsquo;avantage de PDO : les requêtes préparées

Bien que l&rsquo;exemple plus haut soit un exemple basique, PDO permet d&rsquo;exécuter des requêtes préparées et c&rsquo;est tout l&rsquo;interet de la chose. En effet, les requêtes préparées permettent un gain de temps puisque nous utilisons une espèce de &laquo;&nbsp;patron&nbsp;&raquo; pour construire notre requête, et lors de l&rsquo;exécution de celle-ci, on passe un tableau de paramètres. Ainsi on peut executer la même requête plusieurs fois avec différents paramètres très facilement et rapidement.

#### Executer une requête préparée

Pour construire et executer une requête préparée nous aurons besoin de la fonction prepare() de l&rsquo;objet PDO, cette fonction retournera un objet PDOStatment, qui nous permettra d&rsquo;executer la requête en lui passant les paramètres avec la fonction execute().

Il est a noter que l&rsquo;on peut préparer une requête de plusieurs manières : grâce à des marqueurs (?) ou des paramètres nommées (:nom_parametre)

<pre class="brush:php">&lt;?php
//création de la requête avec la methode des marqueurs
$strSQL = "SELECT login,pass,email FROM tbltest WHERE login = ? AND pass = ? ";
//requête construite avec les paramètres nommés
//$strSQL = "SELECT login,pass,email FROM tbltest WHERE login = :login AND pass = :pwd ";

$stmt = $db-&gt;prepare($strSQL); // création de l'objet PDOStatment
$stmt-&gt;execute(array('mon_login','mon_password'));
//execution avec la methode des paramètres nommés
//$stmt-&gt;execute(array(':login' =&gt; 'mon_login', ':pwd' =&gt; 'mon_password'));

//affichage du résultat
while($row = $stmt-&gt;fetch(PDO::FETCH_OBJ)){
echo $row-&gt;login." ".$row-&gt;pass." ".$row-&gt;email."&lt;br/&gt;";
}
?&gt;</pre>

Pour plus d&rsquo;infos sur l&rsquo;objet PDO rendez vous sur <a title="Comment utiliser PHP Data Objects" href="http://www.php.net/manual/fr/book.pdo.php" target="_blank">le site du manuel PHP</a>