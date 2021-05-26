---

title: 'Impression et en-tête de page : casse-tête'
date: 2016-06-16T19:59:11+00:00
author: Ange Chierchia
layout: post
permalink: /blog/impression-en-tete-de-page-casse-tete/
image: /contents/uploads/pexels-photo-825x510.jpg
category: "Front-End"
---
Il y a quelques semaines, je travaillais sur un template de bilan comptable, destiné a être imprimé via notre application IBAKUS®COMPTA, dans lequel l&rsquo;en-tête de page devait se répéter sur chaque pages du document.

L&rsquo;en-tête de page était constitué de plusieurs éléments permettant d&rsquo;identifier le déposant (le nom de la société, son adresse, son numéro RC et TVA, etc.), la date d&rsquo;impression, le titre du document, etc. Quelque chose dans ce style là :<!--more-->

    <div class="document-head container">
      <div class="document-datas one-half">
        <h1>Titre du document</h1>
        <p>Édité le 16/06/2016</p>
        ...
      </div>
      <div class="declarer-datas one-half">
        <ul>
          <li>Numéro RC : 0123456789</li>
          <li>Numéro TVA : 0123456789</li>
        </ul>
        <p>Nom de la société</p>
        <p>1 Infinite Loop</p>
        ...
      </div>
    </div>

Plusieurs tableaux de données comptable venaient ensuite peupler le document. Bien entendu, n&rsquo;importe quel tableau pouvait s&rsquo;étaler sur plusieurs pages. Il fallait donc pouvoir répéter les en-têtes des tableaux à chaque saut de page !

## Répéter les en-têtes d&rsquo;un tableau

Pour répéter les en-têtes d&rsquo;un tableau sur toutes les pages imprimées qu&rsquo;il occupera, c&rsquo;est très simple. Attention les yeux : il suffit d&rsquo;utiliser les balises `<thead>`, `<th>` et `<tbody>` dans la structure du tableau pour que la magie opère ! C&rsquo;est tout !

    <table>
      <thead>
        <tr>
          <th>Colonne 1</th>
          <th>Colonne 2</th>
          <th>Colonne 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>bla bla</td>
          <td>bla bla</td>
          <td>bla bla</td>
        </tr>
        ...
      </tbody>
    </table>

## Répéter l&rsquo;en-tête de page

Lorsqu&rsquo;on veut imprimer un en-tête personnalisé en plus de répéter les en-têtes des tableaux sur chaque pages HTML, c&rsquo;est toujours un peu galère, il faut se débrouiller à grand coup de Javascript et de CSS pour arriver à ses fins. Mais, il y a plus simple ! Eh oui, un petit coup de `<thead>` !

    <table>
      <thead>
        <tr>
          <th colspan="3">
            <div class="document-head container">
              <div class="document-datas one-half">
                <h1>Titre du document</h1>
                <p>Édité le 16/06/2016</p>
                ...
              </div>
              <div class="declarer-datas one-half">
                <ul>
                  <li>Numéro RC : 0123456789</li>
                  <li>Numéro TVA : 0123456789</li>
                </ul>
                <p>Nom de la société</p>
                <p>1 Infinite Loop</p>
                ...
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th>Colonne 1</th>
          <th>Colonne 2</th>
          <th>Colonne 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>bla bla</td>
          <td>bla bla</td>
          <td>bla bla</td>
        </tr>
        ...
      </tbody>
    </table>

Il est effectivement possible d&rsquo;ajouter autant de lignes (`<tr>`) que l&rsquo;on souhaite dans un `<thead>`. Cette solution fonctionne assez bien.

## Attention !

Sauf si vous faites un `float: left` sur les `<div>`, et là tout fout le camp ! Votre en-tête s&rsquo;affichera bien sur la première page, par contre les suivantes se verront décorées d&rsquo;un bel espace vide en guise d&rsquo;en-tête. Dommage ! 