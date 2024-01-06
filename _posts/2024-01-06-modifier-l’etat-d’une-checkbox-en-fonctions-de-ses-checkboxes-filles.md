---
layout: post
title: Modifier l’état d’une checkbox en fonctions de ses checkboxes filles
date: 2024-01-06T14:10:05.877Z
categories:
  - Front-End
tags: []
format: post
publish_social:
  - yes
---
Cette semaine je travaillais sur un projet dans lequel une page affiche une liste de documents que l'on peut filtrer à l'aide de checkboxes. Dans cet article je vais vous exposer un cas d'usage que j'ai rencontré et comment je l'ai solutionné.<!--more-->

La fonctionnalité que j'avais a créer était un genre d'arborescence de checkboxes. En d'autres termes, l'un des filtres présentait une liste d'options avec des sous-options, chacune pouvant être cochée ou non. Si  une option « mère » est cochée, toutes les sous options qui lui appartiennent doivent être cochées automatiquement. À l’inverse, si on ne coche pas toutes les options « filles », l’état de l’option « mère » doit être indéfini.

Voici le résultat final [est visible sur Codepen](https://codepen.io/nighcrawl/pen/gOEPdzR).

## Structure HTML

La structure HTML que j’ai utilisé est plutôt basique, ce sont simplement des `<input type="checkbox">` regroupez dans une `<div class="children"></div>` pour les checkboxes « filles ». L’attribut `id` de la checkbox « mère » va nous permettre de la cibler plus facilement en JavaScript.

```
<div class="options">
  <div class="input input--checkbox">
    <input type="checkbox" name="parent" id="checkAll">
    <label for="checkAll">Tout sélectionner</label>
  </div>
  <div class="children">
    <div class="input input--checkbox">
      <input type="checkbox" name="child[]" id="child1">
      <label for="child1">Option 1</label>
    </div>

    <div class="input input--checkbox">
      <input type="checkbox" name="child[]" id="child2">
      <label for="child2">Option 2</label>
    </div>

    <div class="input input--checkbox">
      <input type="checkbox" name="child[]" id="child3">
      <label for="child3">Option 3</label>
    </div>
  </div>
</div>
```

Passons maintenant au JavaScript.

## Ajouter un écouteur d'évènement sur les checkboxes

Nous allons d’abord créer un écouteur pour le clic sur les checkboxes. Pour plus de simplicité, notre écouteur exécutera une fonction que l’on nomme `changeOptionsHandler()` et dans laquelle on traitera les changement d’état de chaque checkbox. Voici comment ajouter l’’écouteur sur nos checkboxes:

```
document.querySelectorAll('[type="checkbox"]').forEach((input) => {
  input.addEventListener("click", (event) => {
    changeOptionsHandler(event.target);
  });
});
```

D’abord on cible tous les checkboxes avec `document.querySelectorAll('[type="checkbox"]')` puis on attache l’écouteur d'évènement `click` sur chacune d’elle. 

```
forEach((input) => {
  input.addEventListener("click", (event) => {
    // …
  })
}
```

Passons maintenant à la fonction `changeOptionsHandler()`.

## Gérer les changement d’état des checkboxes

D’abord on gérer le clic sur la checkbox dont l’id est « checkAll », puis dans une fonction différente on gèrera le clic sur les checkboxes « filles » et leur conséquences sur la checkbox « mère »

```
if (input.id === "checkAll") {
  if (input.checked === true) {
    input
      .closest(".options")
      .querySelectorAll('[type="checkbox"][name="child[]"]')
      .forEach((child) => {
        child.checked = true;
      });
  } else {
    input
      .closest(".options")
      .querySelectorAll('[type="checkbox"][name="child[]"]')
      .forEach((child) => {
        child.checked = false;
      });
  }
```

Si la checkbox est cochée, alors on récupères toutes les checkboxes contenues dans la `<div></div>’ dont l’attribut ‘class’ contient « options », puis pour chaque on modifie l’attribut`checked`avec la même valeur (`true`).  

```
if (input.checked === true) {
  input
    .closest(".options")
    .querySelectorAll('[type="checkbox"][name="child[]"]')
    .forEach((child) => {
      child.checked = true;
    });
}
```

Puis on fait la même chose si la checkbox est décochée. Ici ‘false’.

Maintenant on va s’intéresser aux différents états que pourra avoir la checkbox « mère » lors d’un clic sur l’une de ses « filles ».

## Gérer les états de la checkbox « mère »

La checkbox « mère » pourra avoir trois états : 

* coché
* décoché
* indéterminé

Pour déterminer sont état, il faudra que l’on compte le nombre d’options disponibles et le nombre de « filles » cochées. Si le total d’options est égal au nombre d’options cochées, alors l’état de la checkbox « mère » est « coché ». Si le nombre d'options décochées est égal au total d'options, alors celle-ci sera « décochée ». Dans tout les autres cas, la checkbox « mère » sera dans un état « indéterminé ».

Voilà comment cela se traduit en code :

```
let checkAllState = (input) => {
  let countOptions = input
    .closest(".options")
    .querySelectorAll('[type="checkbox"][name="child[]"]').length;
  let checkedOptions = input
    .closest(".options")
    .querySelectorAll('[type="checkbox"][name="child[]"]:checked').length;
  let checkAll = input.closest(".options").querySelector("#checkAll");

  if (countOptions !== checkedOptions) {
    if (checkedOptions == 0) {
      checkAll.indeterminate = false;
      checkAll.checked = false;
    } else {
      checkAll.indeterminate = true;
      checkAll.checked = false;
    }
  } else {
    checkAll.indeterminate = false;
    checkAll.checked = true;
  }
};
```

Et voilà !  Je vous met ici le code JavaScript complet. 

```
let changeOptionsHandler = (input) => {
  if (input.id === "checkAll") {
    if (input.checked === true) {
      input
        .closest(".options")
        .querySelectorAll('[type="checkbox"][name="child[]"]')
        .forEach((child) => {
          child.checked = true;
        });
    } else {
      input
        .closest(".options")
        .querySelectorAll('[type="checkbox"][name="child[]"]')
        .forEach((child) => {
          child.checked = false;
        });
    }
  }
  checkAllState(input);
};

let checkAllState = (input) => {
  let countOptions = input
    .closest(".options")
    .querySelectorAll('[type="checkbox"][name="child[]"]').length;
  let checkedOptions = input
    .closest(".options")
    .querySelectorAll('[type="checkbox"][name="child[]"]:checked').length;
  let checkAll = input.closest(".options").querySelector("#checkAll");

  if (countOptions !== checkedOptions) {
    if (checkedOptions == 0) {
      checkAll.indeterminate = false;
      checkAll.checked = false;
    } else {
      checkAll.indeterminate = true;
      checkAll.checked = false;
    }
  } else {
    checkAll.indeterminate = false;
    checkAll.checked = true;
  }
};

document.querySelectorAll('[type="checkbox"]').forEach((input) => {
  input.addEventListener("click", (event) => {
    changeOptionsHandler(event.target);
  });
});
```

## Conclusion

Grâce à un peu de magie JavaScript, on a réussi à créer une petite danse entre une checkbox « mère » et ses petites « filles », tout ça pour rendre notre interface utilisateur encore plus cool et intuitive.

Si vous avez des astuces, des idées pour améliorer cette petite méthode ou même si vous avez juste envie de partager vos expériences, n'hésitez pas à me répondre sur Mastodon. J'adorerais entendre vos retours et idées. 

*[Happy Birthday Matt!](https://ma.tt/2024/01/birthday-gift/) Hope you like your gift* 😉