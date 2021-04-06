---

title: Exécuter des requêtes SQL avec CodeIgniter
date: 2011-01-14T22:36:57+00:00
author: Ange Chierchia
layout: post

permalink: /blog/requetes-sql-avec-codeigniter/
image: /contents/uploads/2010/06/ci_cms.jpg
---
Pour continuer à parler CodeIgniter, on va aujourd&rsquo;hui s&rsquo;intéresser à la construction de requêtes SQL via les fonctions disponibles avec CodeIgniter et voir l&rsquo;intêret d&rsquo;utiliser ces fonctions lorsqu&rsquo;on interroge une base de données.<!--more-->

Ok, avant de voir comment utiliser CodeIgniter pour exécuter des requêtes SQL, on va voir comment déclarer plusieurs configuration de base de données, pour par exemple avoir une configuration différente selon si l&rsquo;on travaille en local ou bien sur serveur.

## Configurer la classe Database

Afin de permettre à CodeIgniter de &laquo;&nbsp;discutailler&nbsp;&raquo; avec notre base de données, il faut lui donner les infos pour y accéder. Ouvrez le fichier database.php se trouvant dans le dossier config de l&rsquo;application (application/config/database.php), vous trouverez les réglages de la base de données stockés dans un  tableau multidirectionnel `$db` comme ci-dessous.

    $dbconf['default']['hostname'] = "localhost";
    $dbconf['default']['username'] = "root";
    $dbconf['default']['password'] = "";
    $dbconf['default']['database'] = "database_name";
    $dbconf['default']['dbdriver'] = "mysql";
    $dbconf['default']['dbprefix'] = "";
    $dbconf['default']['pconnect'] = TRUE;
    $dbconf['default']['db_debug'] = FALSE;
    $dbconf['default']['cache_on'] = FALSE;
    $dbconf['default']['cachedir'] = "";
    $dbconf['default']['char_set'] = "utf8";
    $dbconf['default']['dbcollat'] = "utf8_general_ci";

L&rsquo;intérêt d&rsquo;utiliser un tableau multidirectionnel pour enregistrer les infos relatives à la base de données, c&rsquo;est de pouvoir définir un autre tableau  avec des informations différentes, pour ensuite choisir lequel de ces tableaux utiliser. Ainsi, si l&rsquo;on souhaite déclarer deux configurations différentes, rien de plus simple :

    //config par défaut
    $db['default']['hostname'] = "localhost";
    $dbconf['default']['username'] = "root";
    $dbconf['default']['password'] = "";
    $dbconf['default']['database'] = "database_name";
    $dbconf['default']['dbdriver'] = "mysql";
    $dbconf['default']['dbprefix'] = "";
    $dbconf['default']['pconnect'] = TRUE;
    $dbconf['default']['db_debug'] = FALSE;
    $dbconf['default']['cache_on'] = FALSE;
    $dbconf['default']['cachedir'] = "";
    $dbconf['default']['char_set'] = "utf8";
    $dbconf['default']['dbcollat'] = "utf8_general_ci";

    //config secondaire
    $dbconf['test']['hostname'] = "host_name";
    $dbconf['test']['username'] = "db_user";
    $dbconf['test']['password'] = "db_pass";
    $dbconf['test']['database'] = "database_name";
    $dbconf['test']['dbdriver'] = "mysql";
    $dbconf['test']['dbprefix'] = "";
    $dbconf['test']['pconnect'] = TRUE;
    $dbconf['test']['db_debug'] = FALSE;
    $dbconf['test']['cache_on'] = FALSE;
    $dbconf['test']['cachedir'] = "";
    $dbconf['test']['char_set'] = "utf8";
    $dbconf['test']['dbcollat'] = "utf8_general_ci";

Il suffira ensuite de définir la valeur de la variable $active_group à &laquo;&nbsp;test&nbsp;&raquo; pour utiliser notre configuration secondaire. Easy!
  
Pour établir la connexion à la base de données il faudra alors faire appelle à la librairie Database dans votre classe, grâce à la ligne suivante :

    $this->load->database($dbconf);

Il est aussi possible d&rsquo;instancier deux connexion en faisant comme suit :

    $db1 = $this->load->database('default');
    $db2 = $this->load->database('test');

## Ma première requête SQL avec CodeIgniter

On y est, notre connexion à la base est active, on va pouvoir manipuler les données (j&rsquo;adore ça, manipuler des données)!

Avec CodeIgniter, ce qu&rsquo;il y a de bien c&rsquo;est qu&rsquo;on a vraiment le choix des armes pour construire nos requêtes : soit on les construit comme au bon vieux temps des `mysql_*()` soit on utilise la [méthode objet (PDO)](http://chierchia.fr/blog/utiliser-pdo-pour-les-connexion-a-une-bdd/ "Utiliser PDO pour les connexions à une base de données"), ou encore mieux on utilise les nombreuses fonctions du Framework!

Comme il y a toute une flopée de fonctions préexistantes je vais volontairement ne présenter que les plus courantes.

### mysql_query() à la sauce CI

C&rsquo;est la fonction `query()` de la classe Database qui permet d&rsquo;exécuter simplement des requêtes `SELECT` simple. La fonction s&rsquo;utilise très simplement : `$this->db->query('SELECT * FROM table');`

Si l&rsquo;on souhaite construire des requêtes avec paramètres, il sera obligatoire de les échapper avec les fonction `escape()`, `escape_str()` ou `escape_like_str()`, équivalents de la fonction `mysql_real_escape_string()`.

La fonction `escape()` permet d&rsquo;échapper les données quelque soit leur type (`string, int, float`, etc…), tandis que `escape_str()` n&rsquo;accepte que des données de type `string`. `escape_like_str()` quant à elle, permet d&rsquo;échapper des requêtes avec des conditions `LIKE`.

Query() peut aussi être utilisé avec des requêtes préparées, comme avec l&rsquo;objet PDO. Ainsi pour exécuter une requête, rien de bien compliqué:

    $sql = "SELECT * FROM some_table WHERE id = ? AND status = ? AND author = ?";
    $this->db->query($sql, array(3, 'live', 'Rick'));

L&rsquo;intérêt ici, comme avec PDO c&rsquo;est que les valeurs passées en paramètre sont automatiquement échappées.

CodeIgniter pourrait s&rsquo;arrêter là, mais dans ce cas qu&rsquo;aurait-il de plus que le simple objet PDO ? La réponse : l&rsquo;Active Record!

## La classe Active Record

Utiliser l&rsquo;Active Record, c&rsquo;est hype, branché et trop in the move!

Pourquoi? Parce que cela permet entre autre de laisser de côté l&rsquo;histoire &laquo;&nbsp;Ma base est en MySQL, SQL Server, Postgre, … ?&nbsp;&raquo;, en clair on ne s&rsquo;occupe pas du SGBD utilisé, on lui pose juste les questions. Conséquence, notre appli a une meilleure portabilité.

CodeIgniter propose pas mal de fonctions permettant de construire des requêtes sans se fouler, j&rsquo;irai même jusqu&rsquo;à dire &laquo;&nbsp;sans même en connaître un radis en SQL&nbsp;&raquo;. Regardons ce qui nous est proposé.

### $this->db->get()

`get()` permet d&rsquo;exécuter en un rien de temps un `SELECT` sur une table et ainsi retourner tout ses enregistrements

    $query = $this->db->get('mytable');
    // équivalent: SELECT * FROM mytable

Si l&rsquo;on veut limiter le nombre de résultats retournés, par exemple dans le cadre d&rsquo;une pagination, rien de plus simple il suffit juste de passer deux autres paramètres à `get()` en plus de la table sur laquelle on travaille.

    $query = $this->db->get('mytable', 10, 20);
    // équivalent : SELECT * FROM mytable LIMIT 20, 10

### $this->db->get_where()

Vraiment besoin d&rsquo;explications? `get_where()` permet tout simplement de faire un `get()` avec des conditions.

Les différentes condition seront à présenter sous forme d&rsquo;un tableau (on vera ça ensuite dans la fonction `where()`) .

    $query = $this->db->get_where('mytable', $where, $limit, $offset);

Avec ces deux fonctions, c&rsquo;est le Framework qui s&rsquo;occupe de construire nos requêtes. Si l&rsquo;on veut les générer nous même tout en utilisant l&rsquo;Active Directory, c&rsquo;est maintenant qu&rsquo;on va retrouver une pelletée  de méthodes.

### SELECT, FROM, WHERE

Ok, admettons que l&rsquo;on veuille retourner le titre, le contenu et la date d&rsquo;un article dans notre base.

Clairement ici `get_where()` boufferai de la ressource inutilement puisqu&rsquo;il nous retournerai d&rsquo;autres champs dont on aurait pu se passer. `select()` est là pour nous ravir les amis!

    $this->db->select('title, content, date');
    $query = $this->db->get('articles');
    // équivalent: SELECT title, content, date FROM articles

Attends voir, là on récupère le titre, le contenu et la date de tout les articles dans la base… Quel œil vif! C&rsquo;est ici qu&rsquo;interviennent nos amis `from()` et `where()` :

    $this->db->select('title, content, date');
    $this->db->from('articles');
    $this->db->where(array('id' => 7));
    $query = $this->db->get();

C&rsquo;est pas beautiful ? CodeIgniter a un sac plein de fonctions équivalentes aux fonction SQL comme `SUM()`, `AVG()`, `COUNT()`, etc.  Je ne les traiterai pas ici mais vous pourrez les retrouver sur dans le <a href="http://www.codeigniter.fr/user_guide/database/" target="_blank">Guide Utilisateur de CodeIgniter</a>.

Chose pratique, on peut concaténer toutes ses fonctions, pour économiser en ligne de code. Ainsi, notre requête précédente pourrait s&rsquo;écrire :

    $this->db->select('title, content, date')->from('articles')->where(array('id' => 7));
    $query = $this->db->get();

### Affichage des résultats

On finira ce billet très rapidement sur la façon d&rsquo;afficher le résultat de nos différentes requêtes.

Ici on fera un simple `foreach()` comme on a l&rsquo;habitude d&rsquo;en faire quand on utilise PDO (pour moi en tout cas).

    $query = $this->db->get('mytable');
    foreach ($query->result() as $row){
      echo $row->title;
    }

## Conclusion

Ici on a donc vu pas mal de méthodes bien utile lorsqu&rsquo;il s&rsquo;agit d&rsquo;interroger une base de donnée lorsqu&rsquo;on développe dans le cadre d&rsquo;une application Web sous CodeIgniter.

Petite parenthèse, je tiens à m&rsquo;excuser pour l&rsquo;attente interminable entre le moment ou j&rsquo;ai annoncé faire cet article, et sa publication. J&rsquo;ai eu deux bons gros mois de taff bien chargés, autant au boulot, qu&rsquo;au niveau perso (notamment le site du WDFR sur lequel je travail avec [@Fran6](http://twitter.com/Fran6), [@Twikito](http://twitter.com/Twikito), [@ClementRoy](http://twitter.com/ClementRoy) et [@C_Beghin](http://twitter.com/C_Beghin), et tout le workgroup WDFR), ce qui explique en partie ce petit retard.

J&rsquo;en profite aussi pour souhaité avec du retard, une très bonne année 2011, pleine de bonnes choses et d&rsquo;argent (surtout) ^^