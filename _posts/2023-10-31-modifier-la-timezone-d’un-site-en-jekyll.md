---
layout: post
title: "Modifier la Timezone d’un site en Jekyll "
date: 2023-10-31T21:51:57.025Z
categories:
  - Ressource
tags: []
format: post
publish_social: yes
---
Cela fait plusieurs mois que j’essaie de comprendre pourquoi lorsque je publiais quelque chose sur mon blog, la date était souvent incohérente. Ça m’embêtait mais pas au point de vouloir m’intéresser au problème. Et puis ce week-end, alors que j’essayais d’ajouter mon archive Twitter dans le flux d’articles du blog, je me suis rendu compte que c’était vraiment le moment de solutionner ce bug. En fait, le truc était tout bête.

Quand je compilais mon site en local, les dates et heures étaient correctes, mais dès que je déployais sur GitHub celles-ci n’étaient plus bonnes. Et là ça m’a sauté aux yeux : mon ordi et GitHub n’étaient pas sur le même fuseau horaire ! Du coup, j’ai cherché si il y avait possibilité de changer le fuseau horaire de GitHub et effectivement, pour un site généré avec Jekyll, il existe le paramètre `timezone` à configurer dans le fichier `_config.yml`.

Du coup, pour passer mon site sur le fuseau horaire de Paris, rien de plus simple :

```
timezone: Europe/Paris
```