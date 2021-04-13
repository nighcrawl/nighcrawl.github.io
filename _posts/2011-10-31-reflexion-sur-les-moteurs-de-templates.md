---

title: 'Moteurs de templates : fausse bonne idée ?'
date: 2011-10-31T09:24:56+00:00
author: Ange Chierchia
layout: post

permalink: /blog/reflexion-sur-les-moteurs-de-templates/
more-link-text:
  - Je lui laisse donc la place !

guest_author:
  - Nicolas Torres
guest_url:
  - ntorres.me
categories: "Front-End"
---
<span class="author_note">Aujourd&rsquo;hui, j&rsquo;inaugure le &laquo;&nbsp;Guest blogging&nbsp;&raquo; avec un article vraiment très intéressant de <a title="Nicolas Torres, élève ingénieur passionné de Web design" href="http://ntorres.me" target="_blank">Nicolas Torres</a> (@noclat) sur l&rsquo;intérêt mais aussi et surtout les &laquo;&nbsp;pièges&nbsp;&raquo; à éviter lorsqu&rsquo;on utilise un moteur de templates (comme Smarty par exemple).</span>

<!--more-->

PHP se suffit à lui-même pour effectuer du _templating_, en déclarant toutes les variables dans un fichiers de traitement, et en les appelant dans un fichier d&rsquo;affichage inclus à la fin du traitement. Pourquoi les développeurs utilisent-ils alors une surcouche ?

## Mauvaises excuses

J&rsquo;ai souvent entendu &laquo;&nbsp;pour que celui qui s&rsquo;occupe de l&rsquo;affichage n&rsquo;aie pas besoin de connaissances en PHP&nbsp;&raquo; ou &laquo;&nbsp;pour appliquer simplement un cache par fichier &laquo;&nbsp;parsé&nbsp;&raquo; (inclus et interprété)&nbsp;&raquo;.

Effectivement la plupart de ces moteurs recréent une syntaxe simplifiée qui raccourcis le temps de codage et permettent une meilleur lisibilité du code telle que :

    {variable}

au lieu de :

    <?php echo $variable; ?>

## La faiblesse d&rsquo;un tel procédé

&laquo;&nbsp;Parser&nbsp;&raquo;, c&rsquo;est consommer. Pour pouvoir interpréter correctement la syntaxe il faut utiliser des procédés de réécriture qui pèsent au chargement. Heureusement, lorsque le script est bien conçu, on n&rsquo;effectue cette réécriture (compilation) qu&rsquo;une seule fois après chaque modification du fichier _template_. Cela dit pour celui sur qui ça tombe, un mauvais &laquo;&nbsp;parseur&nbsp;&raquo; peut entraîner un lourd ralentissement pour une simple page.

Les programmeurs aimant bien s&rsquo;inventer leur propre syntaxe et l&rsquo;optimiser pour leur utilisation, ils sont parfois trop gourmands et confèrent à celle-ci bien plus de portée qu&rsquo;elle ne devrait en posséder.

En effet certains ont tendance à vouloir appliquer des fonctions (`date()`, `htmlspecialchars_decode()`, `nl2br()`) au moment de l&rsquo;appel de la variable. Hors il s&rsquo;agit de traitement, et le traitement des données **doit **s&rsquo;effectuer **avant **l&rsquo;affichage.

Plus la syntaxe est développée, moins elle a d&rsquo;intérêt, puisque son seul but est de **diminuer le temps de codage** et de **gagner en lisibilité**. J&rsquo;ai souvent vu des moteurs utiliser une syntaxe XML telle que :

    <foreach nom="nom_du_bloc">
      <var nom="variable" />
    </foreach>

qui possède un rapport performance/confort relativement faible par rapport à la syntaxe native :

    <?php foreach ($nom_du_bloc as $row) : ?>
      <?php echo $row['variable']; ?>
    <?php endforeach; ?>

A noter que la syntaxe PHP permet bien plus de souplesse dans la déclaration d&rsquo;une boucle (concaténation, et &laquo;&nbsp;variable double&nbsp;&raquo; (`$$variable`) autorisées).

De plus, le cache peut être totalement indépendant. Il n&rsquo;est donc pas nécessaire de passer par un moteur de _templates _pour pouvoir en appliquer un.

## Les bonnes pratiques

On utilise un tel outil pour **séparer le traitement de l&rsquo;affichage**, et optionnellement pour **minimiser son code** et le rendre **plus clair**.

Plusieurs approches sont alors pertinentes face à la question des performances. C&rsquo;est certain, regrouper ses variables dans une &laquo;&nbsp;boîte noire&nbsp;&raquo;, loin des variables servant uniquement au traitement, est dans une certaine mesure très agréable. Mais avant de se jeter sur un moteur de _templates_, rélféchissez_ _à quelle quantité de performance vous êtes prêt à céder.

### Un moteur sans syntaxe personnalisée

C&rsquo;est la solution la moins onéreuse. Le fameux framework [CodeIgniter](http://codeigniter.com/) y a établi son camp. Pour gagner en confort, il est conseillé de trouver une solution pour séparer ses variables d&rsquo;affichage à celles de traitement. L&rsquo;une d&rsquo;entre elles est de stocker ses variables dans un objet et inclure le fichier _template _dans une méthode en utilisant la fonction [extract()](http://php.net/manual/fr/function.extract.php).

### Un moteur à syntaxe

Prudence. Assurez-vous d&rsquo;avoir une syntaxe suffisamment légère, et peu de fonctionnalités. Un moteur mettant à disposition l&rsquo;appel de fonctions dans sa syntaxe doit être scrupuleusement analysé avant d&rsquo;être employé. Le minimum nécessaire ? Appel de variables, boucles (appel de blocs) et conditions. Vérifiez que `preg_replace()`, `preg_replace_callback()` et `preg_match_all()` sont utilisées avec parcimonie car ils consomment des quantités astronomiques de performances.

## Conclusion

Je ne me veux pas exhaustif sinon **préventif **quant à l&rsquo;optimisation des performances. Avouez qu&rsquo;écrire autant de code aussi complexe et moins souple que PHP pour perdre en performance est dénué de sens. Il est préconisé de chercher l&rsquo;équilibre entre la performance et le confort, et enfin de garder en tête que le traitement n&rsquo;est pas du ressort de l&rsquo;affichage.