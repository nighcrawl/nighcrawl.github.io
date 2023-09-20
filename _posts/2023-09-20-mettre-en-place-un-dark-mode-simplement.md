---
layout: post
title: Mettre en place un "dark mode" simplement
date: 2023-09-20T23:12:01.514Z
categories:
  - Font-End
tags: []
format: post
publish_social: yes
---
Cela fait un moment que j'avais mis en place la possibilité de choisir entre un thème sombre et un thème clair pour lire mon blog. Et ça fait presque aussi longtemps qu'il était éclaté au sol, dans le sens où même si on choisissait l'un des modes, les préférences du système prenaient de nouveau le dessus au rechargement de page. On va voir ensemble ce qui n'allait pas et donc ce qu'il ne faut pas faire.<!--more-->

## Conditionner le mode sombre en JavaScript ET via les styles CSS

Si il y a bien une chose à éviter, c'est celle-ci. En effet, il est préférable de décider qui, de JavaScript ou CSS, va gérer le mode sombre et de s'y tenir, afin d'éviter que des conditions définies en JavaScript soient écrasées par une feuille de style. C'est le soucis que j'avais ici : je définissais à la fois des règles CSS ciblées par un attribut `html[data-theme="dark"]` qui était ensuite modifié via JavaScript ainsi que des règles ciblées par une media query `@media (prefers-color-scheme: dark)`.

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

Et voici ce que je faisais en JavaScript :

Je sauvegardais dans un booléen `isDarkMode` le résultat de la condition media query `(prefers-color-scheme: dark)` ou de l'attribut `[data-theme="dark"]`. 

Au chargement de la page, le thème était défini sur "dark" ou "light" suivant la valeur du booléen `isDarkMode.` Puis lorsque un changement au niveau de la media query était détecté, j’appelai à nouveau ma fonction `switchTheme()`.

```javascript
var themeToggle = document.querySelector('.site-theme-switcher');
var useDark = window.matchMedia("(prefers-color-scheme: dark)")
var isDarkMode = useDark.matches || document.querySelector('html').getAttribute('data-theme') === "dark";

var switchTheme = function(darkModeState) {
	if (darkModeState) {
		document.querySelector('html').setAttribute('data-theme', 'dark');
		themeToggle.setAttribute('data-switch-theme', 'light');
	} else {
		document.querySelector('html').removeAttribute('data-theme');
		themeToggle.setAttribute('data-switch-theme', 'dark');
	}
};

document.addEventListener('DOMContentLoaded', function() {
	switchTheme(isDarkMode);
	useDark.addListener(function(event) {
		switchTheme(event.matches);
	});
});
```

En soit, cette méthode n'est pas mauvaise, mais à aucun moment elle ne prend en compte la volonté de l'utilisateur de visionner votre site Web en version sombre ou non. C'est le système d'exploitation de l'ordinateur qui prend la main.

## Ne pas utiliser de cookie

Une autre erreur à ne pas faire, si on veut que l'utilisateur garde la main, c'est de ne pas enregistrer son choix. C'est tout bête, mais je ne m'en suis rendu compte que ce soir en me penchant enfin sur le problème...

La correction est simple à mettre en place, il suffit de modifier la fonction `switchTheme()` comme suit :

```javascript
var switchTheme = function(darkModeState) {
	if (darkModeState) {
		document.querySelector('html').setAttribute('data-theme', 'dark');
		themeToggle.setAttribute('data-switch-theme', 'light');
		document.cookie = "darktheme=true; expires=Fri, 31 Dec 9999 23:59:59 GMT;";
	} else {
		document.querySelector('html').removeAttribute('data-theme');
		themeToggle.setAttribute('data-switch-theme', 'dark');
		document.cookie = "darktheme=false; expires=Fri, 31 Dec 9999 23:59:59 GMT;";
	}
};
```

Il conviendra ensuite de modifier l'écouteur de l’évènement `DOMContentLoaded` comme ceci :

```javascript
document.addEventListener('DOMContentLoaded', function() {
	if (document.cookie.split(";").some((item) => item.trim().startsWith("darktheme=true"))) {
		switchTheme(true);
	} else if (document.cookie.split(";").some((item) => item.trim().startsWith("darktheme=false"))) {
		switchTheme(false);
	} else {
		switchTheme(useDark.matches);
	}
}
```

Et voilà !