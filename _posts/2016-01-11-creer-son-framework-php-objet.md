---
id: 1913
title: Créer son framework PHP Objet
date: 2016-01-11T08:40:21+00:00
author: Ange Chierchia
layout: post
guid: http://chierchia.fr/?p=1913
permalink: /blog/creer-son-framework-php-objet/
image: /contents/uploads/technology-programming-code-wallpaper-hd-1920x1080-825x510.jpg
categories:
  - Non classé
tags:
  - framework
  - PHP
  - POO
  - programmation objet
---
Pour faire suite à un article que j&rsquo;avais écrit il y a un peu plus de quatre ans maintenant sur la [création d&rsquo;un framework PHP](http://chierchia.fr/blog/creer-son-framework-php/), je vous propose de créer un framework PHP Objet en utilisant les principes MVC.<!--more-->

Lorsque je travaillais encore chez CBC Informatique, nous n&rsquo;utilisions pas les principes de la programmation orientée Objet et nous préférions développer nous même les sites Web de nos clients plutôt que de s&rsquo;appuyer sur des solutions toutes faites, afin de garder la maitrise de notre code. C&rsquo;est dans cette optique que j&rsquo;avais développé <a href="https://github.com/nighcrawl/custom-cms" target="_blank">notre mini-framework/CMS</a>.

Depuis presque 1 an maintenant,  je travaille chez Ibakus Europe et à nouvelle équipe nouvelle façon de travailler. Pour concevoir les nouvelles applications Web IBAKUS, nous utilisons la programmation orientée Objet et les principes du MVC. Nos applications gérant des données plutôt sensibles, il a été décidé de développer notre propre framework PHP Objet, afin de garder au maximum la main sur le code et pouvoir le modifier plus facilement.

## Les bases du framework PHP Objet

D&rsquo;abord, nous avons écrit une classe maîtresse que l&rsquo;on a appelée _Container_. Elle nous permet entre autre d&rsquo;initialiser le framework avec un fichier de configuration, de définir les différentes routes et de charger les différents Modèles et Contrôleurs.

Une **classe abstraite** _Model_ définit les méthodes utilisées pour agir sur la base de données puis chacun de nos modèles étendent cette classe afin de gérer les spécificités qui leur sont propres.

Mon but n&rsquo;étant pas de publier le code source de notre framework, je m&rsquo;intéresserai uniquement aux méthodes CRUD de notre classe abstraite _Model_.

## Structure de la classe abstraite _Model_

La classe abstraite _Model_ est définie par deux propriétés `$db` et `$table` et cinq méthodes : `get()`, `getDatas()`, `set()`, `delete()` et `save()`.

La propriété `$db` est une instance de la classe PDO établissant la connexion à notre base de données, `$table` quand à elle contient le nom de la table sur laquelle les opérations des méthodes `save()` et `delete()` vont être faites. Voici la structure de notre classe :

    abstract class Model {
      protected $db;
      protected $table;
  
      public function __construct() {
        $this -> db = Container::getDb();
        $this -> table = $this; 
      }
  
      /**
       * Un echo de $this retournera le nom de la table associée au modèle.
       * Par exemple 'pages' pour le modèle 'PagesModel'
       */
      public function __toString() {
        return strtolower(substr(get_class($this), 0, -5));
      }
  
      // GETTERS
      public function get($attr) {
        return $this -> $attr;
      }
  
      /**
       * Retourne tous les attributs de l'objet
       */
      public function getDatas() {
        $datas = array();
        foreach (get_object_vars($this) as $key => $value)
            $datas[$key] = $value;
        
        return $datas;
      }
  
      // SETTER
      public function set($attr, $data) {
        if (property_exists($this, $attr)
            $this -> $attr = $data;
      }
  
      // METHODES
      public function delete() {}
  
      public function save() {}
    }

### La méthode `save()`

cette méthode permet d&rsquo;enregistrer l&rsquo;objet dans la base de données, que ce soit pour son insertion ou lors de sa modification. Pour définir si l&rsquo;on va faire un `INSERT` ou un `UPDATE`, on testera la valeur de l&rsquo;attribut `id` de l&rsquo;objet courant. Si elle n&rsquo;est pas nulle on souhaite modifier l&rsquo;objet, sinon on crée une nouvelle entrée dans la base.

    public function save($type = null) {
      if ($this -> get('id') == null) {
        $query = 'INSERT INTO ' . $this -> get('table') . ' SET';
        $nbDatas = count($this -> getDatas());

        $i = 0;
        foreach ($this -> getDatas() as $key => $value) {
          $i++;
          $query .= ' ' . $key . ' = :' . $key;
          if ($i < $nbDatas) 
            $query .= ','; 
          else 
            $query .= ';'; 
        } 
      } else {
        $query = 'UPDATE ' . $this -> get('table') . ' SET';
        $nbDatas = count($this -> getDatas());

        $i = 0;
        foreach ($this -> getDatas() as $key => $value) {
          $i++;
          if ($key != 'id') {
            $query .= ' ' . $key . ' = :' . $key;
            if ($i < $nbDatas)
              $query .= ','; 
          } 
        } $query .= ' WHERE id = :id;'; 
      } 
      $query = $this -> get('db') -> prepare($query);

      foreach ($this -> getDatas() as $key => $value)
        $query -> bindValue(':' . $key, $value);

      $executed = $query -> execute();

      if ($executed && $this -> get('id') == null)
        $this -> set('id', $this -> get('db') -> lastInsertId());

      return $executed;
    }

### La méthode `delete()`

Pour supprimer les données de l&rsquo;objet enregistré, rien de vraiment compliqué, on execute simplement une requête préparée avec la classe PDO et on supprime l&rsquo;enregistrement dont `id` correspond à l&rsquo;attribut `id` de l&rsquo;objet courant.

    public function delete() {
      $query = $this -> get('db') -> prepare('DELETE FROM ' . $this -> get('table') . ' WHERE id = :id;');
      $query -> bindValue(':id', $this -> get('id'));
  
      return $query -> execute();
    }

## Pour finir : construire un CMS

Construire un CMS sur base d&rsquo;une classe abstraite comme celle-ci permet d&rsquo;écrire très simplement les différents modules dont on aura besoin.

Si l&rsquo;on souhaite gérer des pages de contenu, il suffira d&rsquo;écrire un modèle héritant de la classe _Model_, par exemple _pagesModel_ et d&rsquo;y définir les attributs de l&rsquo;objet en regard de la structure de la table _pages_ de la base de données.

Cette classe héritant de la classe abstraite, nous n&rsquo;auront pas besoin de réécrire nos méthodes `save()` et `delete()` et l&rsquo;on pourra se concentrer sur des méthodes permettant par exemple, de retourner un menu de navigation, des méta-tags pour le référencement naturel, etc.

Bien sûr, il faudra écrire un contrôleur permettant de traiter les données à passer au modèle, qui se chargera ensuite de les enregistrer en base de données, mais ça se fait rapidement  .

Là dessus, bonne semaine (et bonne année) !