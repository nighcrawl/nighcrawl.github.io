---

title: Sécuriser ses formulaires avec une clé unique
date: 2009-06-20T16:02:31.456Z
author: Ange Chierchia
layout: post

redirect_from: /blog/securiser-ses-formulaires-avec-une-cle-unique/
img_article:
  - /contents/uploads/formkeyphp_thumb.jpg
categories: "Back-End"
---
Il y a quelques jours je suis tombé sur un article très intéressant de <a title="Lire l'article en anglais" href="http://www.behindtheview.com/2009/11/23/securing-forms-with-form-keys/" target="_blank">Wouter Bulten</a> concernant la sécurité lors de la soumission de formulaire web.<!--more-->

Sa solution  contre le cross-site scripting ? Créer une classe PHP qui nous permettra de créer une clé unique pour chaque formulaire afin de n’accepter que les requêtes provenant de notre site web.

## Comment cela va se passer ?

  1. D’abord il nous faudra un champ caché qui contiendra la clé unique pour notre formulaire.
  2. Enregistrer cette clé dans une session PHP
  3. Vérifier la clé lors de la soumission du formulaire

## Notre formulaire

Pour l’exemple on utilisera un bête formulaire de login, qui est tout de même l’un des formulaires les plus importants d’un site, puisque c’est lui qui donne accès à certaines informations plus ou moins « sensibles ».

<pre class="brush:html">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;
&lt;html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"&gt;
&lt;head&gt;&lt;meta http-equiv="content-type" content="text/html;charset=UTF-8" /&gt;
&lt;title&gt;Securing forms with form keys&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;form action="" method="post"&gt;
&lt;dl&gt;
&lt;dt&gt;&lt;label for="username"&gt;Username:&lt;/label&gt;&lt;/dt&gt;
&lt;dd&gt;&lt;input type="text" name="username" id="username" /&gt;&lt;/dd&gt;
&lt;dt&gt;&lt;label for="username"&gt;Password:&lt;/label&gt;&lt;/dt&gt;
&lt;dd&gt;&lt;input type="password" name="password" id="password" /&gt;&lt;/dd&gt;
&lt;dt&gt;&lt;/dt&gt;  &lt;dd&gt;&lt;input type="submit" value="Login" /&gt;&lt;/dd&gt;
&lt;/dl&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>

Maintenant qu’on a notre formulaire, il est temps de commencer le processus de sécurisation

## Créer une classe PHP

Nous allons donc créer un classe PHP qui servira à la génération d’une clé et la validation de celle-ci, d’abord parce que l’utilisation de la programmation orientée objet c’est sympa, et surtout parce que cela nous permettra d’utiliser cette classe partout où on le désirera. On appellera se fichier securekey.class.php

<pre class="brush:php">&lt;?php

Class SecureKey

{

private $secureKey ;  //variable qui permettra de stocker la clé générée

private $old_secureKey ; //varible qui stocke l’anciene valeur de la clé, vous comprendrez plus tard

//fonction pour générer la clé
private function generateKey()
{
}

}

?&gt;</pre>

Ici on a donc la structure de base de notre classe. Elle contient donc deux variables ($secureKey et $old_secureKey) et une fonction. Nos variables et notre fonction on l’attribut private car elles ne seront pas utilisées autre part que dans notre classe. D’autres fonctions s’occuperont de faire le lien entre la partie privée de notre classe et le formulaire.

Passons maintenant à la génération de la clé. Du fait que notre clé doit être unique, on utlisera l’adresse IP de l’utilisateur comme base pour notre clé et on y ajoutera un nombre aléatoire avec les fonction mt_rand() et uniqid(). On cryptera le tout en MD5 avec la fonction md5(), on pourrai aussi utiliser un autre cryptage comme le SHA256. Ainsi le hash qui résultera de cette manipulation ne refletera pas la valeur de notre clé.

<pre class="brush:php">private function generateKey()

{

$ip = $_SERVER[‘REMOTE_ADDR’] ;  // récupération de l’adresse IP

//on utlilise mt_rand() pour avoir une valeur plus aléatoire qu’avec la fonction rand(),

//et on passe true en paramètre à uniqid() pour lui dire qu’on veut une longue chaine de caractère

$uniqid = uniqid(mt_rand(),true) ;

return md5($ip . $uniqid); // on retourn le hash

}

[</pre>

## Insertion d’une clé dans notre formulaire

Ici on va créer une nouvelle fonction dans notre classe, qui permettra d’inserer la valeur de notre clé dans un champ caché du formulaire. Notre fonction marchera ainsi :

  1. On génère la clé avec generateKey()
  2. On enregistre la clé dans la variable $secureKey et dans une session
  3. On revoie la valeur au champ de formulaire

On appellera notre fonction outputKey() et on la  définira comme publique, puisqu’elle sera utilisée hors de notre classe. Cette fonction utilisera la fonction privée générateKey() et on enregistrera la clé dans une session.

<pre class="brush:php">public function outputKey()

{

//on génère la clé et on l’enregistre dans la classe

$this-&gt;secureKey = $this-&gt;generateKey() ;

//enregistrement de la clé dans la session

$_SESSION[‘secure_key’] = $this-&gt;secureKey ;

//envoi de la clé dans le formulaire

echo "&lt;input type= 'hidden' name='secure_key' id='secure_id' value='" .$this-&gt;secureKey."' /&gt;";

}</pre>

Maintenant on va ajouter notre clé à notre formulaire de login pour sécuriser tout ça. Pour se faire on doit inclure notre classe dans notre fichier login.php. On doit aussi à la fonction session_start() puisque notre classe utilise les sessions pour stocké la valeur de la clé.

<pre class="brush:php">session_start() ;

require(‘securekey.class.php’) ;

$secureKey = new secureKey() ;  //instanciation de la classe</pre>

Désormais on a plus qu’à modifier notre fomulaire login.php pour qu’il contienne la clé en champ caché.

<pre class="brush:php">&lt;form action="" method="post"&gt;

&lt;dl&gt;

&lt;?php $secureKey-&gt;outputKey(); ?&gt;

&lt;dt&gt;&lt;label for=”username”&gt;Username:&lt;/label&gt;&lt;/dt&gt;

&lt;dd&gt;&lt;input type=”text” name=”username” id=”username” /&gt;&lt;/dd&gt;

&lt;dt&gt;&lt;label for=”password”&gt;Password:&lt;/label&gt;&lt;/dt&gt;

&lt;dd&gt;&lt;input type=”password” name=”password” id=”password” /&gt;&lt;/dd&gt;

&lt;/dl&gt;

&lt;/form&gt;</pre>

## Validation du formulaire

Ici je ne traiterai pas la validation du formulaire complet, juste ce qui concerne notre clé unique. Faites un recherche sur google pour le des tutoriaux sur la validation de formulaire.

Allez c’est parti ! C’est ici que vous allez comprendre à quoi nous sert notre variable $old\_secureKey que l’on a déclaré plus tôt dans notre classe. Du fait que notre fonction generateKey() réécrit la valeur de notre variable de sessions, on doit ajouter un constructeur à notre classe PHP qui permettra de stocker l’ancienne valeur de la session dans la variable $old\_secureKey si elle existe.

<pre class="brush:php">function __construct()
{
if(isset($_SESSION[‘secure_key’]))
{
$this-&gt;old_secureKey = $_SESSION[‘secure_key’];
}

}</pre>

Maintenant on va pouvoir valider notre formulaire. Ici on utilisera une bête fonction publique dans notre classe PHP qui comparera la valeur de notre clé passé en POST par le formulaire et la valeur stockée dans la variable de classe $secureKey.

<pre class="brush:php">public function validate()

{

if($_POST[‘secure_key’] == $this-&gt;old_secureKey)

{

return true; //notre clé est valide, on retourne vrai

}

else

{

return false; //notre clé n’est pas valide

}

}</pre>

Dans notre fichier login.php maintenant, on valide la clé en utilisant la fonction publique que l’on vient juste de créer. Bien entendu on ne valide que si on a une requête POST.  Ajoutez le code suivant juste après  la ligne $secureKey = new secureKey() ;

<pre class="brush:php">$erreur = ‘Aucune erreur’ ;

//est-ce qu’une requête POST est passée ?

if($_SERVER[‘REQUEST_METHOD’] == ‘post’)

{

//on valide la clé

if(!isset($_POST[‘secure_key’]) || !$secureKey-&gt;validate())

{

//la clé est invalide

$erreur = ‘clé invalide!’;

}

else

{

//suite de la validation

$erreur = ‘clé valide’;

}

}</pre>

Ici on a créé une variable $erreur qui stock notre message d’erreur dans le cas où l’on souhaite afficher un message d’erreur. Si une requête POST a été envoyée on valide notre clé avec $secureKey->validate(), si la valeur de retour est false, la clé est invalide et on affiche le message d’erreur.