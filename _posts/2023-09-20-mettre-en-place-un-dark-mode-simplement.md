---
layout: post
title: Mettre en place un "dark mode" simplement
date: 2023-09-20T20:43:28.220Z
categories:
  - Font-End
tags: []
format: post
publish_social: yes
---
Cela fait un moment que j'avais mis en place la possibilité de choisir entre un thème sombre et un thème clair pour lire mon blog. Et ça fait presque aussi longtemps qu'il était éclaté au sol, dans le sens où même si on choisissait l'un des modes, les préférences du système prenaient de nouveau le dessus au rechargement de page. On va voir ensemble ce qui n'allait pas et donc ce qu'il ne faut pas faire.<!--more-->

## Conditionner le mode sombre dans JavaScript ET les styles CSS

Si il y a bien une chose à éviter, c'est celle-ci. En effet, il est préférable de décider qui, de JavaScript ou CSS, va gérer le mode sombre et de s'y tenir, afin d'éviter que des conditions définies en JavaScript soient écrasées par une feuille de style. C'est le soucis que j'avais ici : je définissais à la fois des règles CSS ciblées par un attribut `html[data-theme="dark"]` qui était modifié via JavaScript ainsi que des règles ciblées par une media query `@media (prefers-color-scheme: dark)`  .

```css
html[data-theme="dark"] body {
    background-color: #222222;
    color: #ffffff;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #222222;
    color: #ffffff;
  }
}
```