---

title: 'Système de login sécurisé &#8211; CMS CodeIgniter, partie 2'
date: 2010-06-19T13:58:15+00:00
author: Ange Chierchia
layout: post

permalink: /blog/login-securise-cms-codeigniter-partie-2/
image: /contents/uploads/2010/06/ci_cms.jpg
category: "Back-End"
---
[Dans mon article précédent](http://chierchia.fr/php-mysql/moteur-site-web-developper-cms-codeigniter/ "Développer un moteur de site Web avec CodeIgniter"), on a vu comment installer et configurer le framework PHP CodeIgniter. Aujourd&rsquo;hui, on commence le développement de notre moteur de site Web. Au programme, la base de données et le système de login sécurisé.<!--more-->

## Avant de commencer

Cet article est le second d&rsquo;un ensemble d&rsquo;article sur la création d&rsquo;un système de gestion de contenu en utilisant le framework PHP CodeIgniter. Je vous invite donc à [lire le précédent article](http://chierchia.fr/php-mysql/moteur-site-web-developper-cms-codeigniter/ "Développer un système de gestion de contenu avec CodeIgniter") pour partir sur de bonnes bases et avoir une installation saine de CodeIgniter pour l&rsquo;article actuel.

Okay, on a donc convenu mercredi que l&rsquo;on partira sur un simple CMS pour l&rsquo;instant, donc ici pas de gestion de catalogue produit, pas de blog, juste un gestionnaire de pages (bien qu&rsquo;intégrer un blog ne soit pas franchement différent de ce dernier). Allez, on se lance!

## Création de la base de données

Comme notre CMS sera très simple, on aura pas beaucoup de tables dans notre base de données, et quand je dis pas beaucoup, c&rsquo;est déjà trop. On aura donc une table users qui nous permettra d&rsquo;enregistrer les infos de connexion des différents utilisateurs de notre CMS. Ici rien de très compliqué:

<pre class="brush:sql">CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id)
);</pre>

On a donc ici un champ `username` qui devra être unique, un champ `password` pour le mot de passe que l&rsquo;on cryptera en `SHA1`, je n&rsquo;aime pas trop `MD5` même si ça peut faire l&rsquo;affaire ici.

Ensuite, la dernière table de notre base sera une table dans laquelle on enregistrera le contenu des pages présentent sur le site. La encore rien de compliqué, j&rsquo;ai même choisi de disposé de champs afin de renseigner les balises meta pour l&rsquo;indexation des pages dans Google (un peu de SEO ne fait pas de mal).

<pre class="brush:sql">CREATE TABLE pages (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(100) NOT NULL,
  content longtext NOT NULL,
  keywords text NOT NULL,
  description text NOT NULL,
  PRIMARY KEY (id)
);</pre>

J&rsquo;ai vraiment besoin d&rsquo;expliquer?

Okay, on va maintenant créer le fichier qui permettra de récupérer les données présentes dans la base de données.

## Création du Modèle Users_model.php

Qu&rsquo;est-ce que ça veut bien dire? Vous vous rappelez dans le précédent article on a parlé de Modèle MVC, et bien Users_model.php c&rsquo;est le &lsquo;M&rsquo; de &lsquo;MVC&rsquo;. C&rsquo;est ici qu&rsquo;on va écrire nos fonctions &laquo;&nbsp;CRUD&nbsp;&raquo; (Create, Read, Update, Delete), on utilisera ensuite ces fonction dans notre **C**ontrôleur, qui traitera les données retournées par notre **M**odèle, et les affichera dans la **V**ue.

Allez on se lance, ce sera plus clair quand on aura mit les pieds dans le code. Donc, dans le dossier _application/models_ on créé le fichier u_sers_model.php_ qui contiendra ceci :

<pre class="brush:php">&lt;?php
class User_model extends Model {
     function User_model(){
          parent::Model();
     }
}
?&gt;</pre>

Ici on créé la classe `User_model` qui hérite de la classe `Model`, puis on instancie la classe avec le constructeur `User_model` (on aurai pu aussi utiliser `__constructor` pour l&rsquo;instancier).

On va maintenant créer notre fonction qui vérifiera les infos de login passées au formulaire qu&rsquo;on verra plus tard. Dans la classe User_model, sous notre constructeur du même nom, ajoutez la fonction suivante :

<pre class="brush:php">function validCredentials($username,$password){
     $this-&gt;load-&gt;library('encrypt');

     $password = $this-&gt;encrypt-&gt;sha1($password);

     //requête préparée, beaucoup plus sécurisé
     $q = "SELECT * FROM users WHERE username = ? AND password = ?";

     $data = array($username,$password);
     $q = $this-&gt;db-&gt;query($q,$data);

     if($q-&gt;num_rows() &gt; 0){
          $r = $q-&gt;result();
          $session_data = array('username' =&gt; $r[0]-&gt;username,'logged_in' =&gt; true);
          $this-&gt;session-&gt;set_userdata($session_data);
          return true;
     } else { return false; }
}</pre>

#### Que ce passe-t-il ici?

D&rsquo;abord on charge la librairie encrypt avec la commande `$this->load->library('encrypt')` ce qui nous permet d&rsquo;utiliser les fonctions de cette librairie dans notre modèle. Ensuite on crypte en SHA1 le mot de passe passé en paramètre à la fonction. Enfin, on exécute la requête stockée dans la variable $q avec `$this->db->query()` en lui passant le tableau $data pour remplacer les points d&rsquo;interrogation dans notre requête ; c&rsquo;est une requête préparée, [j&rsquo;en avais parlé l&rsquo;an dernier dans un article sur l&rsquo;Objet PDO](http://chierchia.fr/php-mysql/utiliser-pdo-pour-les-connexion-a-une-bdd/ "Connexion à une base de données avec PDO").

Si la requête nous renvoi un résultat, on créé deux variable de sessions username et logged_in qui permettra de savoir si on a accès ou non à notre admin. Sinon validCredentials nous retourne false.

On va ajouter aussi une autre fonction pour savoir si on est bien loggué. On pourrait s&rsquo;en passer mais ça nous évitera quelques lignes de code dans notre contrôleur. Celle ci est simple, ajoutez la fonction suivante à l&rsquo;intérieur de votre Modèle:

<pre class="brush:php">function isLoggedIn(){
     if($this-&gt;session-&gt;userdata('logged_in'))
     { return true; } else { return false; }
}</pre>

## Il reste encore du monde? On passe au Contrôleur

Maintenant qu&rsquo;on a notre Modèle pour l&rsquo;accès à la base de données, il est temps de les manipuler ces petites données! Créez un fichier  _admin.php_ dans le dossier a_pplication/controllers_ et mettez y le code suivant:

<pre class="brush:php">class Admin extends Controller {

     //constructeur de la classe
     function Admin() {
          parent::Controller();
          $this-&gt;load-&gt;model('user_model');
     }
}</pre>

Ici comme notre avec notre User\_model, on crée une classe Admin qui hérite de la classe Controller, et on l&rsquo;initialise grace à son constructeur, dans lequel on charger notre modèle User\_model, ce qui nous permettra d&rsquo;utiliser ses fonctions dans notre contrôleur Admin.

Maintenant que notre contrôleur est instancié, on va ajouter les fonctions (ou méthodes) qui nous permettrons d&rsquo;envoyer les données du formulaire de login à notre Modèle et ainsi définir si on a accès ou non à notre backoffice.

La première fonction qu&rsquo;on va inclure dans notre classe Admin, et la fonction index() qui nous servira de page d&rsquo;accueil. En gros lorsqu&rsquo;on accédera à l&rsquo;adresse http://localhost:8888/cms/index.php/admin, c&rsquo;est notre fonction iindex() qui sera appelée.

<pre class="brush:php">function index(){
     if($this-&gt;user_model-&gt;isLoggedIn()){
          redirect('admin/dashboard','refresh');
     } else {
          redirect('admin/login','refresh');
     }
}</pre>

Ici on vérifie si on est bien loggué, dans ce cas on redirige à l&rsquo;adresse http://localhost:8888/index.php/admin/dashboard qui est le tableau de bord de notre CMS, sinon on redirige au formulaire de login.

Parlons du formulaire de login. Pour traiter les données soumises au formulaire, on va créer une méthode login() dans notre contrôleur.

<pre class="brush:php">function login(){
     if($this-&gt;user_model-&gt;isLoggedIn()){
          redirect('admin','refresh');
     } else {
          //on charge la validation de formulaires
          $this-&gt;load-&gt;library('form_validation');

          //on définit les règles de succès
          $this-&gt;form_validation-&gt;set_rules('username','Login','required');
          $this-&gt;form_validation-&gt;set_rules('password','Mot de passe','required');

          //si la validation a échouée on redirige vers le formulaire de login
          if(!$this-&gt;form_validation-&gt;run()){
               $this-&gt;load-&gt;view('loginform');
          } else {
               $username = $this-&gt;input-&gt;post('username');
               $password = $this-&gt;input-&gt;post('password');
               $validCredentials = $this-&gt;user_model-&gt;validCredentials($username,$password);

               if($validCredentials){
                    redirect('admin/dashboard','refresh');
               } else {
                    $data['error_credentials'] = 'Wrong Username/Password';
                    $this-&gt;load-&gt;view('loginform',$data);
               }
          }
     }
}</pre>

Ici on vérifie d&rsquo;abord si on est loggué, dans ce cas on redirige vers l&rsquo;admin, sinon on traite le formulaire. On charge la librairie `form_validation`, qui va nous permettre d&rsquo;accéder à des fonctions de validation de champs déjà toute prête, notamment la fonction `set_rules` qui nous permettra de définir quels champs sont obligatoire, quel type de données accepter, etc. Lorsque nos règles d&rsquo;acceptation sont validées, on vérifie que les login/mot de passe passés en paramètres retournent un résultant dans la base de données, via notre fonction `validCredentials()` qu&rsquo;on a définit dans notre modèle _User_model_. Si un résultat est retourné, la fonction `validCredentials` créée la variable de session `logged_in` et nous redirige vers le dashboard.

Dernière méthode de notre contrôleur, la fonction dashboard() qui se chargera d&rsquo;afficher notre tableau de bord.

<pre class="brush:php">function dashboard(){
     if($this-&gt;user_model-&gt;isLoggedIn())
          $this-&gt;load-&gt;view('admin');
}</pre>

Passons maintenant à nos deux &laquo;&nbsp;vues&nbsp;&raquo;, loginform et admin. Ce sont les deux fichiers que l&rsquo;on appelle avec la fonction $this->load->view() dans notre contrôleur. Dans le dossier _application/views_ créez les fichier _loginform.php_ et _admin.php_. La vue admin n&rsquo;ayant pas trop d&rsquo;intérêt pour l&rsquo;instant, on va juste voir la vue loginform, qui nous permettra de voir comment créer facilement un formulaire avec CodeIgniter.

<pre class="brush:php">&lt;?php
echo form_open('admin/login');
     echo form_label('Login','username');
     echo form_input('username',set_value('username'));

     echo form_label('Mot de passe','password');
     echo form_password('password');

     echo form_submit('submit','Connexion');
echo form_close();
echo validation_errors();
echo @$error_credentials;
?&gt;</pre>

Ici on ouvre un tag `<form>` qui enverra le formulaire à la méthode `login()` du contrôleur `Admin`. Puis on affiche les erreurs de validation si il y a lieu avec la fonction `validation_errors()` et les erreurs de login/mot de passe avec notre variable `$error_credentials`.

Eh voilà, votre formulaire de login sécurisé est terminé!

## Conclusion

Ici on a vue comment bien utiliser l&rsquo;architecture trois tiers qui permet de séparer la couche présentation (nos Views), de la couche métier (notre Controller) et de la couche réseau (notre Model). Ainsi, si l&rsquo;on veut changer de système de gestion de base de données et passer sur une base Oracle plutôt que MySQL, nous n&rsquo;aurons qu&rsquo;a changer les méthodes écrient dans notre modèle User_model.

Dans le prochain article, on s&rsquo;attardera sur LE coeur de notre système, à savoir la gestion des pages. Allez, bon week-end!