---

title: 'Développer un CMS avec CodeIgniter #3 : la gestion des pages'
date: 2010-08-07T17:09:15+00:00
author: Ange Chierchia
layout: post

redirect_from: /blog/developper-cms-codeigniter-la-gestion-des-pages/
image: /contents/uploads/2010/06/ci_cms.jpg
categories: "Back-End"
---
Dans ce nouvel article qui fait suite à &laquo;&nbsp;[Développer un moteur de site Web avec CodeIgniter](http://chierchia.fr/php-mysql/moteur-site-web-developper-cms-codeigniter/)&nbsp;&raquo; et &laquo;&nbsp;[Système de login sécurisé &#8212; CMS CodeIgniter, partie 2](http://chierchia.fr/php-mysql/login-securise-cms-codeigniter-partie-2/)&nbsp;&raquo; nous allons nous intéresser au module de gestion des pages de contenu, le coeur du moteur de site web en somme.<!--more-->

## Introduction

La semaine le mois dernier (désolé) on avait vu comment CodeIgniter construisait les pages de notre site en utilisant le modèle MVC, c&rsquo;est à dire la séparation du code source en trois couches qui ont chacune une &laquo;&nbsp;mission&nbsp;&raquo; : accéder aux données stockées dans la base (couche Modèles) traiter les données (couche Contrôleurs), afficher les données (couche Vues).

Nous avions donc créé un contrôleur Admin qui se chargeait de traiter les données renvoyées par notre modèle User_model qui s&rsquo;occupait de voir si pour les infos de connexion passées via notre vue loginform.php on avait un résultat dans la base, auquel cas, on donnait accès à l&rsquo;administration du site. Et on s&rsquo;était arrêté là. Aujourd&rsquo;hui… la suite!

## L&rsquo;accès aux données relatives aux pages du site

Ayant pris l&rsquo;habitude de bien séparer les différentes parties des sites que je développe, et parce que c&rsquo;est plus pratique pour s&rsquo;y retrouver par la suite, je vous propose de créer un nouveau modèle qui ne s&rsquo;intéressera qu&rsquo;à nos données stockées dans notre table pages.

Dans le dossier _application/models_, créez un nouveau fichier que vous appellerez _page_model.php_ contenant le code suivant:

    class Page_model extends Model {
      function Page_model(){
        parent::Model();
      }
    }

Qui nous permet de  définir notre classe Page_model comme étant un Model. Ensuite, nous allons ajouter différentes méthodes à l&rsquo;intérieur de cette classe qui nous permettront de modifier les données présentent dans notre table pages. C&rsquo;est ce qu&rsquo;on appelle les fonctions CRUD (Create, Read, Update, Delete).

Okay, premièrement on va s&rsquo;occuper de la fonction d&rsquo;ajout dans la base.

    function add($data){
      return $this-&gt;db-&gt;insert('pages',$data);
    }

Ici, c&rsquo;est allé super vite n&rsquo;est-ce pas? En effet dans notre modèle on ne s&rsquo;occupe que de l&rsquo;insertion des données dans la base, leur traitement pour savoir si oui ou non les données sont conformes se fera avant ça, dans notre contrôleur.

Pour ce qui est des fonctions de modification, et de suppression, c&rsquo;est aussi rapide, donc les voici toutes les deux:

    function update($id,$data){
      $this-&gt;db-&gt;where('id',$id);
      return $this-&gt;db-&gt;update('pages',$data);
    }
    function delete($id){
      return $this-&gt;db-&gt;delete('pages',array('id'=&gt;$id));
    }

Passons maintenant à nos fonction de &laquo;&nbsp;lecture&nbsp;&raquo; ici, on a deux fonctions, la première servira pour retourner toutes les pages présentent dans la base, alors que la seconde ne retournera qu&rsquo;une seule page.

    //retourne la liste des pages
    function getListe(){
      //SELECT * FROM pages
      $query = $this-&gt;db-&gt;get('pages');

      if($query-&gt;num_rows() &gt; 0){
        $rows = $query-&gt;result();
        return $rows;
      }
    }

    //retourne l'enregistrement dans la
    //base de données correspondant à l'id
    //passée en paramètre
    function get($id){
      //SELECT * FROM pages WHERE id = '$id'
      $query = $this-&gt;db-&gt;get_where('pages',array('id'=&gt;$id));

      if($query-&gt;num_rows()&gt;0){
        $rows = $query-&gt;result();
        return $rows[0];
      }
    }

## Le traitement des données

Nous en avons fini avec notre modèle, passons à notre contrôleur. Ici on va reprendre notre contrôleur Admin et y ajouter une méthode appelée page… Originale n&rsquo;est-ce pas ^^.

C&rsquo;est dans cette méthode que nous allons traiter les données passées à nos formulaires d&rsquo;ajout/modification des pages, que nous renverrons au modèle rédigé juste avant.

Pour rappel, voilà notre contrôleur Admin là où on s&rsquo;est arrêté le mois dernier:

    class Admin extends Controller {

      //constructeur de la classe
      function Admin() {
        parent::Controller();
        $this->load->model('user_model');
        $this->load->library('form_validation');
      }

      //affiche l'admin si la session existe, sinon le formulaire de login
      function index(){
        if($this->user_model->isLoggedIn()){
          redirect('admin/dashboard','refresh');
        } else {
          redirect('admin/login','refresh');
        }
      }

      //traitement du formulaire de login
      function login(){
        if($this->user_model->isLoggedIn()){
          redirect('admin','refresh');
        } else {
          //on charge la validation de formulaires
          $this->load->library('form_validation');

          //on définit les règles de succès
          $this->form_validation->set_rules('username','Login','required');
          $this->form_validation->set_rules('password','Mot de passe','required');

          //si la validation a échouée on redirige vers le formulaire de login
          if(!$this->form_validation->run()){
            $this->load->view('loginform');
          } else {
            $username = $this->input->post('username');
            $password = $this->input->post('password');
            $validCredentials = $this->user_model->validCredentials($username,$password);

            if($validCredentials){
              redirect('admin/dashboard','refresh');
            } else {
              $data['error_credentials'] = 'Wrong Username/Password';
              $this->load->view('loginform',$data);
            }
          }
        }
      }

      //affichage de l'adminstration
      function dashboard(){
        if($this->user_model->isLoggedIn())
          $this->load->view('admin');
      }

      //deconnexion
      function logout(){
        $this->user_model->logout();
        redirect('admin','refresh');
      }
    }

Ajoutons maintenant notre fonction page. Elle prendra en paramètres deux variables : $action qui nous permettra de savoir qu&rsquo;est-ce que l&rsquo;on doit faire lorsqu&rsquo;on appelle cette fonction, et $id qui donnera l&rsquo;identifiant de la page à modifier/supprimer dans la base. Voici la structure générale de notre méthode, je détaillerai les différentes étapes par la suite.

    function page($action = 'list', $id = null){
      if($this-&gt;user_model-&gt;isLoggedIn()):
        $this-&gt;load-&gt;model('page_model');

        switch($action){

          case 'list':
            //affichage de la liste des pages
          break;

          case 'edit':
            //affichage du formulaire de modification d'une page
          break;

          case 'update': //mise a jour de la page
            //modification d'une page
          break;

          case 'add': //ajout d'une page
            //création d'un page
          break;

          case 'delete':
            //suppression de la page
          break;
        }

      else:
        redirect('admin/login');
      endif;
    }

Ici on attend donc les deux paramètres $action et $id qui ont par défaut les valeurs respectives &lsquo;list&rsquo; et null, ainsi si la fonction est appelée sans aucun paramètre, on affichera l&rsquo;action list, donc la liste des pages, tandis que l&rsquo;identifiant de page sera nul. Aussi, avant de traiter les données, on s&rsquo;assure que l&rsquo;utilisateur est bien loggué en administrateur via la commande $this->user_model->isLoggedIn().

Passons à l&rsquo;écriture des actions possible. Je vais faire les actions list, edit et delete en même temps car elle sont simple et ne nécessites pas vraiment qu&rsquo;on s&rsquo;y attarde.

    case 'list': //affichage de la liste des pages
      $data['liste'] = $this-&gt;page_model-&gt;getListe();
      $this-&gt;load-&gt;view('list_page',$data);
    break;

    case 'edit': //affichage du formulaire de modification d'une page
      if(isset($id) && $id != 0){
        $data['page'] = $this-&gt;page_model-&gt;get($id);
        $this-&gt;load-&gt;view('edit_page',$data);
      }
    break;
    case 'delete':
      if(isset($id) && $id != 0){
        if($this-&gt;page_model-&gt;delete($id)){
          echo "page supprimé";
        }
      }
    break;

Ici rien de bien compliqué, si $action est égale à &lsquo;list&rsquo;, on appelle la méthode getListe() de notre modèle Page que l&rsquo;on stocke dans la variable $data, de type array, et dont l&rsquo;identifiant sera &lsquo;liste&rsquo;. Ensuite on charge la vue list_page en lui passant les données stockées dans la variable $data, ce qui nous permettra, lorsqu&rsquo;on rédigera cette vue, de récupérer les données de la méthode getListe via la variable $liste. Vous suivez toujours?

Si l&rsquo;on passe la valeur &lsquo;edit&rsquo; à notre variable $action, on vérifie que notre variable $id ne soit pas nulle, et on envoi les données retournées par la méthode get() à notre vue edit_page.

Enfin, si $action vaut &lsquo;delete&rsquo; et que $id n&rsquo;est pas nulle, on appelle la méthode delete() de notre modèle Page.

Okay, maintenant on passe à la modification d&rsquo;une page, via l&rsquo;action update. Ici, le principe c&rsquo;est que via l&rsquo;action edit on a récupéré les données stockées dans la base et on a peuplé le formulaire de la vue edit_page. Ce formulaire renvoi les données à l&rsquo;action update, via une URL du style /admin/page/update/$id. On doit donc vérifier si les données renvoyées sont bonne avant de modifier leur valeur dans la base.

    case 'update': //mise a jour de la page
      if(isset($id) && $id != 0){
        //définition des règles de validation
        //$this-&gt;load-&gt;helper('form_validation');

        $this-&gt;form_validation-&gt;set_rules('titre_page','Titre','required');
        $this-&gt;form_validation-&gt;set_rules('contenu_page','Contenu','required');

        if($this-&gt;form_validation-&gt;run()){

          //les champs obligatoires sont fournis

          //on créé un tableau dans lequel on passe les infos du formulaire
          $data = array(
            'title' =&gt; $this-&gt;input-&gt;post('titre_page'),
            'content' =&gt; $this-&gt;input-&gt;post('contenu_page'),
          );

          //on regarde si le champs keywords est renseigné
          if($this-&gt;input-&gt;post('keywords_page')){
            $data['keywords'] = $this-&gt;input-&gt;post('keywords_page');
          }

          //on fait la même chose pour le champs description
          if($this-&gt;input-&gt;post('description_page')){
            $data['description'] = $this-&gt;input-&gt;post('description_page');
          }

          //enregistrement dans la base de données
          if($this-&gt;page_model-&gt;update($id,$data)){
            echo "Page mis à jour";
          }

        } else {
          //certains champs obligatoires sont manquants
          redirect('admin/page/edit/'.$id);
        }
      }
    break;

Pour l&rsquo;insertion d&rsquo;une nouvelle page dans la base de données le principe est le même, sauf que j&rsquo;ai choisi de réunir les deux étapes de l&rsquo;appel du formulaire et celle de la vérification des données. Voici ce que ça donne:

    case 'add': //ajout d'une page
      $this-&gt;form_validation-&gt;set_rules('titre_page','Titre','required');
      $this-&gt;form_validation-&gt;set_rules('contenu_page','Contenu','required');

      if($this-&gt;form_validation-&gt;run()){

        //les champs obligatoires sont fournis

        //on créé un tableau dans lequel on passe les infos du formulaire
        $data = array(
          'title' =&gt; $this-&gt;input-&gt;post('titre_page'),
          'content' =&gt; $this-&gt;input-&gt;post('contenu_page'),
        );

        //on regarde si le champs keywords est renseigné
        if($this-&gt;input-&gt;post('keywords_page')){
          $data['keywords'] = $this-&gt;input-&gt;post('keywords_page');
        }

        //on fait la même chose pour le champs description
        if($this-&gt;input-&gt;post('description_page')){
          $data['description'] = $this-&gt;input-&gt;post('description_page');
        }

        //enregistrement dans la base de données
        if($this-&gt;page_model-&gt;add($data)){
          echo "page ajouté";
        }

      } else {
        //certains champs obligatoires sont manquants
        $this-&gt;load-&gt;view('add_page');
      }
    break;

## Le troisième tiers de notre application: les vues

On en a enfin fini avec notre contrôleur! On passe maintenant au troisième tiers de notre application, les vues. Ici je ne vais pas vous donner plus d&rsquo;explications, les trois vues sont relativement simples a comprendre même en ne connaissant pas trop bien la syntaxe utilisée par CodeIgniter. Voici donc les trois vues list\_page.php, add\_page.php et edit_page.php.

#### La liste des pages présentes dans la base

    foreach($liste as $page):
      echo "&lt;h2&gt;".anchor('admin/page/edit/'.$page-&gt;id,$page-&gt;title)."&lt;/h2&gt;
      ".$page-&gt;content."&lt;div&gt;&lt;small&gt;&lt;strong&gt;Tags:&lt;/strong&gt; ".$page-&gt;keywords."&lt;/small&gt;&lt;/div&gt;
    endforeach;

#### Le formulaire d&rsquo;ajout d&rsquo;une page

    echo form_open('admin/page/add/');

    echo validation_errors();

    echo form_input('titre_page',set_value('titre_page'));
    echo form_textarea('contenu_page',set_value('contenu_page'));

    echo form_submit('','Ajouter');

    echo form_close();

#### Le formulaire de modification

    echo form_open('admin/page/update/'.$page-&gt;id);

    echo form_input('titre_page',$page-&gt;title);
    echo form_textarea('contenu_page',$page-&gt;content);

    echo form_submit('','Modifier');

    echo form_close();

## Conclusion

Après avoir développé notre système de login sécurisé, on a vu ici comment construire simplement et rapidement un module de gestion pour les pages que contiendra notre futur site Web.

Avec ce nouvel article, notre système pourrait très bien s&rsquo;arrêter là, il est fonctionnel et relativement sécurisé tant au niveau de l&rsquo;accès par login/mot de passe, qu&rsquo;au niveau de la vérification des valeurs saisies dans les différents formulaires, du fait que c&rsquo;est le framework lui-même qui s&rsquo;occupe de vérifier les données et d&rsquo;échapper les données avant de les enregistrer dans la base.

La prochaine fois, on vera comment intégrer un éditeur de texte comme TinyMCE à notre CMS afin de pouvoir mettre en forme notre texte facilement, et puis surement d&rsquo;autre petites choses. Par contre, je ne sais pas encore quand est-ce que je vous pondrait çà 