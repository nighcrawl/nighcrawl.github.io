---

title: Créer son propre framework PHP, pourquoi ?
date: 2011-12-12T08:15:50+00:00
author: Ange Chierchia
layout: post

permalink: /blog/creer-son-framework-php/
image: /contents/uploads/2011/12/framework-perso-php.jpg
category: "Back-End"
---
Cela fait maintenant presque deux ans que je suis entré dans la vie active en tant que développeur et designer Web. Et en tant que tel, je suis souvent (comprenez : tout le temps) amené à faire quasiment les mêmes choses, bien que chaque projet soit différent.

Personnellement j&rsquo;aime passer du temps à peaufiner un design. je déteste réécrire les mêmes fonctions pour chaque projet. Alors oui, il des frameworks PHP, mais pourquoi utiliser un bazooka lorsqu&rsquo;on doit abattre une mouche ?<!--more-->

<p class="author_note">
  <strong>MAJ 11/01/2016 : Si le PHP Objet vous parle, vous pouvez lire <a href="http://chierchia.fr/blog/creer-son-framework-php-objet/">Créer son framework PHP Objet</a> qui est <em>un peu</em> plus récent </strong>
</p>

<p class="author_note">
  Attention, l&rsquo;article est un chouilla trop long (beaucoup de lignes de code).
</p>

Oui utiliser une CMS déjà tout fait c&rsquo;est bien, oui utiliser un framework en PHP Objet c&rsquo;est bien. Seulement parfois, utiliser une arme de destruction massive n&rsquo;est pas la bonne méthode à appliquer pour régler les choses les plus simples.

Ces dernier mois, au fil des projets qui le permettaient, j&rsquo;ai pu me construire ma propre bibliothèque de fonctions, en essayant de l&rsquo;améliorer à chaque itérations, tout en restant le plus générique possible pour permettre une très bonne portabilité de projet en projet. Bien sûr je n&rsquo;ai pas hésité à piquer des idées dans les frameworks PHP, mais plutôt que de me trimballer toute la clique, j&rsquo;ai maintenant un petit &laquo;&nbsp;framework&nbsp;&raquo; qui me permet de faire juste ce dont j&rsquo;ai besoin. Cela m&rsquo;a aussi permis de monter facilement notre propre CMS, lui aussi très basique.

Aujourd&rsquo;hui j&rsquo;ai donc envie de partager avec vous quelques unes de mes fonctions, car ça fait un petit moment que je n&rsquo;ai pas publié un peut de code PHP dans mes pages.

## Mes fonctions de CRUD

Etape obligatoire lorsqu&rsquo;on souhaite agir sur des informations stockées en base de données, les célèbres fonctions INSERT, SELECT, UPDATE et DELETE. Après plusieurs itérations je suis arrivé à des fonctions quasiment utilisable par n&rsquo;importe quel projet, même si je pense qu&rsquo;elles ne sont pas encore parfaites, pour le moment elles me suffisent. Cependant, si vous avez de quoi les améliorer n&rsquo;hésitez pas à me donner votre avis !

### Ajouter un enregistrement dans une table

Après pas mal de projet dans lesquels j&rsquo;avais une fonction d&rsquo;ajout pour chaque type de contenu (page, article, etc.) enregistrés dans des tables différentes, j&rsquo;ai essayé de trouver un moyen simple d&rsquo;ajouter n&rsquo;importe quelle données dans n&rsquo;importe quelle table. Je suis donc passé de plusieurs fonction plus ou moins lourde à une bête fonction d&rsquo;une quinzaine de ligne avec laquelle je peux faire ce que je veux, simplement en lui passant un tableau des données à ajouter, et le nom de la table dans laquelle faire cet INSERT.

    /***
     *  insert des données dans la table en paramètre
     *  @datas  tableau des données à insérer dont la clé et le nom du champs dans la table
     *  @table  table dans laquelle insérer les données
     */
    function add($datas, $table){
      $bdd = db(); //on ouvre la connexion à la base de données

      foreach($datas as $key =&gt; $value){
        $keys[] = $key;
        $values[] = $value;
      }

      $strSQL = "INSERT INTO ".$table." (";
      foreach($keys as $ky =&gt; $k){ $strSQL .= $k . ","; }

      $strSQL = substr($strSQL,0,-1) . ") VALUES(";
      foreach($values as $vl =&gt; $v){ $strSQL .= "?,"; }

      $strSQL = substr($strSQL,0,-1) . ")";

      $query = $bdd-&gt;prepare($strSQL);
      if($query-&gt;execute($values)) return $bdd-&gt;lastInsertId();
      else return false;
    }

**Comment utiliser la fonction ?**

Après avoir vérifiées, échappées, etc., les informations soumisent à mon formulaire, il me suffit de créer un tableau dont les clés seront les noms des champs que je veux renseigner pendant mon INSERT.

_<span style="text-decoration: underline;">Exemple :</span> je veux renseigner le nom, l&rsquo;adresse email et le commentaire dans la table &laquo;&nbsp;comments&nbsp;&raquo;._

    $datas = array(
      'nom' =&gt; $nom,
      'email' =&gt; $email,
      'commentaire' =&gt; $commentaire
    );

    if(add($datas,'comments')) {
      return "cool";
    } else return "pas cool";

Si tout c&rsquo;est bien passé, la fonction `add()` me renvoie l&rsquo;ID de l&rsquo;enregistrement créé.

### Mettre à jour les informations d&rsquo;un enregistrement

Là aussi, c&rsquo;est une fonction vraiment très simple. comme ma fonction add(), ma fonction update() requiert un tableau des données et le nom de la table à modifier. Seul petit changement, on doit aussi fournir l&rsquo;ID de l&rsquo;enregistrement à modifier.

    /***
     *  met à jour les données de l'ID dans la table en paramètre
     *  @id identifiant de la ligne à modifier
     *  @datas  tableau des données à insérer dont la clé et le nom du champs dans la table
     *  @table  table dans laquelle insérer les données
     */
    function update($id, $datas, $table){
      $bdd = db();
      foreach($datas as $key =&gt; $value){
        $keys[] = $key;
        $values[] = $value;
      }

      $strSQL = "UPDATE ".$table." SET ";
      foreach($datas as $key =&gt; $value){
        $strSQL .= $key . " = ?,";
      } $strSQL = substr($strSQL,0,-1) . " WHERE id = ?";
      $values[] = $id;
      $query = $bdd-&gt;prepare($strSQL);
      if($query-&gt;execute($values)) return true;
      else return false;
    }

### Supprimer un enregistrement

Rien de bien compliqué là non plus, on supprime l&rsquo;enregistrement dont l&rsquo;ID est passé en paramètre dans la table elle aussi en paramètre.

    /***
     *  supprime les données correspondant à l'ID dans la table en paramètre
     *  @id   identifiant de la ligne à supprimer
     *  @table  table sur laquelle on applique la suppression
     */
    function delete($id, $table){
      $bdd = db();
      $strSQL = "DELETE FROM ".$table." WHERE id = ?";
      $query = $bdd-&gt;prepare($strSQL);
      //print_r(array($id));

      if($query-&gt;execute(array($id))) return true;
      else return false;
    }

### Retourner une liste d&rsquo;enregistrements

Cette dernière est l&rsquo;une des fonctions que j&rsquo;ai eu le plus de mal à rendre générique tout en me permettant de faire beaucoup de choses avec, comme par exemple préparer le terrain pour l&rsquo;utiliser dans le cadre des données scindées sur plusieurs pages.

Ici ma fonction me permet de récupérer à la fois les enregistrements de ma requête, le total d&rsquo;enregistrements que retournerai ma requête si aucun paramètre LIMIT n&rsquo;était renseigné, la requête exécutée (pour les tests en phase de développement) ou les erreurs possibles quant à l&rsquo;exécution de cette requête.

    /***
     *  retourne le resultat d'un select
     *  @columns  colonnes à selectionner pour la requête (ex: array('champ1','champ2') ou '*')
     *  @table    nom de la table sur laquelle faire la requête
     *  @where    champs sur lequels appliquer des conditions ( ex: array( 'champ1 =' =&gt; 'valeur', 'champ2 LIKE' =&gt; 'valeur%') )
     *  @concats  [ AND | OR ]
     *  @order    champs sur lequels appliquer le tri, et l'ordre pour chaque champs (ex: array('champ1' =&gt; 'ASC','champ2' =&gt; 'DESC') )
     *  @limit    limit[0] =&gt; debut de la liste, limit[1] =&gt; nombre d'éléments dans la liste retournée (ex: array('0','20') )
     *
     *  return @retour  : tableau contenant la requête executée, les éventuelles erreurs et le resultat de la requête
     */
    function get($columns = null, $table = null, $where = null, $concats = "AND", $order = null, $limit = null){
      $bdd = db();
      $retour = array(); //variable de type tableau, retournée par la fonction
      $rows = "";
      $clause = "";
      $sort = "";
      $limitStr = "";

      if(!is_null($columns) && !is_null($table)){

        // si $rows est un tableau ou égale à * tout va bien.
        if(is_array($columns)){
          foreach($columns as $column) { $rows .= $column .', '; }
          $rows = substr($rows,0,-2);
        } elseif($columns == '*'){
          $rows = '*';
        } else {
          $retour['erreur'] = "Les champs selectionné doivent être appelé depuis une variable Tableau";
        }

        if(!in_array(strtolower($concats),array('and','or'))){
          $retour['erreur'] = "&lt;strong&gt;".$concats."&lt;/strong&gt; n'est pas une valeur autorisée pour concaténer des conditions. Utilisez 'OR' ou 'AND'.";
        }

        /*
        si @where est renseigné, on filtre les résultats grâce au tableau @where construit comme suit :
          array ('colname operateur' =&gt; 'valeur');
          ex: array('page_id =' =&gt; 5);
        sinon, on ne filtre pas les résultats
        */
        if(!is_null($where) && is_array($where)){
          foreach($where as $k =&gt; $v){
            $clause .= $k." ? ".$concats." ";
            $values[] = $v;
          }
          $clause = " WHERE ".substr($clause,0,(-(strlen($concats)+2)));
        } elseif(!is_null($where) && !is_array($where)){
          $retour['erreur'] = "La clause WHERE doit être construite via une variable Tableau";
        } else {
          $clause = "";
        }

        //si $order est un tableau et n'est pas null
        if(!is_null($order) && is_array($order)){
          foreach($order as $k =&gt; $v){ $sort .= $k." ".$v.", "; }
          $sort = " ORDER BY ".substr($sort,0,-2);
        } elseif(!is_null($order) && !is_array($order)) {
          $retour['erreur'] = "ORDER BY doit être construit via une variable Tableau";
        } else {
          $sort = "";
        }

        if(!is_null($limit) && is_array($limit) && is_numeric($limit[0]) && is_numeric($limit[1])){
          $debut = $limit[0];
          $nbRows = $limit[1];
          $limitStr = " LIMIT " . $debut . "," . $nbRows;
        } elseif(!is_null($limit) && !is_array($limit)){
          $retour['erreur'] = "LIMIT doit être construit via un tableau de deux entiers";
        } else {
          $limitStr = "";
        }

        // on construit la requête
        $strSQL = "SELECT ".$rows." FROM ".$table.$clause.$sort.$limitStr;
        if(empty($retour['erreur'])){
          $query = $bdd-&gt;prepare($strSQL);
          $query-&gt;execute(@$values);
          $retour['requete'] = $strSQL;
          $retour['reponse'] = $query-&gt;fetchAll(PDO::FETCH_ASSOC);

          $sqlTotal = "SELECT COUNT(*) as total FROM ".$table.$clause.$sort;
          $q = $bdd-&gt;prepare($sqlTotal);
          $q-&gt;execute(@$values);
          $tot = $q-&gt;fetchAll(PDO::FETCH_ASSOC);
          $retour['total'] = $tot[0]['total'];
        }

      } else {
        $retour['erreur'] = "Impossible de créer la requete, les champs à selectionner et la table sont vide";
      }

      return $retour;
    }

**Comment utiliser la fonction ?**

_<span style="text-decoration: underline;">Exemple :</span> Je veux récupérer les cinq articles les plus récents écrits par nighcrawl dont le titre contient le mot &laquo;&nbsp;framework&nbsp;&raquo; publié depuis la date à laquelle la requête est exécutée._

    $champs = array('id','titre','nom','contenu');
    $conditions = array(
      'nom =' =&gt; 'nighcrawl',
      'date &lt; =' =&gt; date('Y-m-d H:i:s'),
      'titre LIKE' =&gt; '%framework%'
    );
    $trier = array('date' =&gt; 'DESC');
    $limite = array(0, 5);

    $resultat = get($champs,'articles',$conditions,"AND",$trier,$limite);
    if(isset($resultat['reponse'])){
      foreach($resultat['reponse'] as $row){
        echo "&lt;article&gt;
        &lt;header&gt;
          &lt;h1&gt;".$row['titre']."&lt;/h1&gt;
        &lt;/header&gt;
        &lt;div&gt;".$row['contenu']."&lt;/div&gt;
        &lt;footer&gt;Auteur : ".$row['nom']."&lt;/footer&gt;
        &lt;/article&gt;";
      }
    }
    else echo $resultat['erreur'];

## Mettre en place un système de pagination

Je m&rsquo;arrêterai ici parce que l&rsquo;article est déjà pas mal long, et si vous êtes arrivé jusqu&rsquo;ici je vous dis chapeau. Personnellement je me serai déjà arrêté :). On fini donc avec une fonction très utile pour générer rapidement des liens de pagination afin de répartir les données d&rsquo;une requête sur plusieurs pages. Voici donc la belle fonction :

    /***
     *  génère des liens de pagination : numeros de pages, 'suivants', 'précédents'
     *  @total  nombre total d'enregistremnts à paginer
     *  @nbpp nombre d'enregistrements à afficher par page
     *  @link chaine qui servira à construire les liens vers les différentes pages
     */
    function pagination($total, $nbpp, $link){
      echo"&lt;div class='pagination'&gt;";
        /** Pagination **/
        //calcul du nombre de pages
        $nbLiens = ceil($total/$nbpp);

        if($nbLiens &gt; 1){
          /** précédents **/
          if(isset($_GET['d']) && $_GET['d'] &gt; 0){
            echo "&lt;a href='".$link.($_GET['d']-$nbpp)."'&gt;« Précédents&lt;/a&gt;";
          } else {
            echo "&lt;span&gt;« Précédents&lt;/span&gt;";
          }
          /** pages ***/
          for($i = 0; $i &lt; $nbLiens; $i++){
            if($_GET['d'] == ($i*$nbpp)){
              echo "&lt;span class='active_pagi'&gt;".($i+1)."";
            } else {
              echo "&lt;a href='".$link.($i*$nbpp)."'&gt;".($i+1)."&lt;/a&gt;";
            }
          }

          /** suivants **/
          if(isset($_GET['d']) && $_GET['d'] &gt;= 0 && $_GET['d'] &lt; ($total-$nbpp)){
            echo "&lt;a href='".$link.($_GET['d']+$nbpp)."'&gt;Suivants »&lt;/a&gt;";
          } else {
            echo "&lt;span&gt;Suivants »&lt;/span&gt;";
          }
        }
      echo "&lt;/div&gt;";
    }

La pagination va s&rsquo;effectuée en deux temps, d&rsquo;abord l&rsquo;appel de la fonction get(), puis l&rsquo;appel de la fonction pagination(). Si on réutilise l&rsquo;exemple précédent :

    $nbpp = 5; //5 articles par page
    $limite = array(intval($_GET['d']),$nbpp);
    $resultat = get($champs,'articles',$conditions,"AND",$trier,$limite);

    if(isset($resultat['reponse'])){
      foreach ($resultat as $row) {
        //affichage des articles
        ...
      }
      pagination($resultat['total'],$nbpp,'index.php?parametre=valeur&d=');
    } else echo $resultat['erreur'];

## Fin !

Merci de m&rsquo;avoir lu jusqu&rsquo;au bout. Je vous libère ici ! En espérant que ces quelques fonctions puissent vous être utiles. Elles ne sont pas parfaites et certaines pourraient être encore améliorées, alors si vous avez des idées, n&rsquo;hésitez pas à les partager dans les commentaires.