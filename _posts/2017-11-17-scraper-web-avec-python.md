---
title: Scraper un site Web en Python
layout: post
permalink: /blog/scraper-web-python/
image: /contents/uploads/python.jpg
categories: "Back-End"
---
Aujourd'hui on va voir comment utiliser Python afin de scraper une page ou un site Web afin de récupérer les informations qui nous intéressent et ainsi se constituer une base de données.

<!--more-->

Le scraping de sites Web fait partie de mon quotidien chez Ibakus Europe ces derniers mois, dans le cadre du développement d'une fonctionnalité de notre application dédiée à la lutte contre le blanchiment d'argent et le financement du terrorisme.
Le scraping de différentes sources nous a permit de constituer une base de données des sociétés européennes, permettant à nos utilisateurs de compléter leur fichier KYC avec les informations publiques dont on dispose sur leurs clients, en plus des informations qu'ils ont en leur possession.

Assez parlé d'Ibakus, passons au vif du sujet : la création d'un scraper web.

## Création du scraper
Le but du scraper que l'on va écrire ici sera de récupérer les informations concernant les nouvelles sociétés luxembourgeoises créées. Nous allons donc faire un scraping du [site du RCSL](https://www.rcsl.lu/).

Pour cela nous allons utiliser la librairie Splinter, qui permettra à notre script de parcourir les pages comme si on le faisait nous même. Je vous invite à lire [la documentation de la librairie](http://splinter.readthedocs.io/en/latest/) pour ce qui concerne son installation et les différentes fonctions disponibles.

Nous allons enregistrer le code source de notre scraper dans un fichier `scraper.py` en déclarant que nous voulons utiliser l'encodage `UTF-8` et utiliser la fonction `Browser()` de la librairie Splinter. Notre fichier débutera alors comme ça :

    # coding: utf8
    from splinter import browser

Tout ce qui va se passer ensuite sera executer comme si on naviguait vraiment depuis une fenêtre de navigateur Web. On appelle alors la fonction `Browser()` puis on se rend sur le site Web à scraper comme suit :

    with Browser() as browser:
        url = "https://www.rcsl.lu"
        browser.visit(url)

Attention, il est important de bien faire attention à l'indentation du code. Ici, si on avait appellé la méthode `visit()` de l'objet `browser` sans l'indenter, ça n'aurait pas fonctionné car `browser` ne serait pas définit.
On aurait par contre pu écrire ceci :

    browser = Browser()
    browser.visit(url)

Notre scraper se trouve maintenant sur la page d'accueil du site Web du RCSL. Pour récupérer la liste des sociétés consituées aujourd'hui, il faut que l'on clique sur le lien "Journal des publications" que l'on peut trouver au bas de la page. La librairie Splinter dispose de plusieurs fonctions permettant de [retrouver un élément dans le DOM](http://splinter.readthedocs.io/en/latest/finding.html) et d'[intéragir avec](http://splinter.readthedocs.io/en/latest/elements-in-the-page.html). Dans notre cas nous aurons besoin des fonctions `is_element_present_by_css()`, `find_by_css()` et `click_link_by_partial_href()`.

Le lien que l'on cherche à cliquer contient la chaîne `DisplayOfficialJournalAction` dans son attribut `href`, nous allons donc cliquer dessus en faisant appelle à `click_link_by_partial_href()` ce qui nous amènera sur la page voulue :

    browser.click_link_by_partial_href('mjrcs/jsp/DisplayOfficialJournalAction')

Dans cette nouvelle page on veut cliquer sur l'icône de téléchargement du fichier XML le plus récent (en haut de la liste).
Pour être certain qu'il y a bien une liste de fichiers disponibles présente sur la page, on vérifie qu'un élément `table` ayant la classe `commonTable` existe dans le DOM. Si il existe, on récupère alors le quatrième élément `a` qu'il contient puis on visite l'URL contenue dans son attribut `href`

    if browser.is_element_present_by_css('table.commonTable'):
        # Récupère l'URL vers le fichier XML des publications du jour
        xmlfile = browser.find_by_css('table.commonTable')
                        .find_by_css('tbody')
                        .find_by_css('a')[3]
        browser.visit(xmlfile['href'])

On enregistre ensuite le contenu du fichier en local.

    response = browser.html.encode('utf8', 'xmlcharrefreplace')
    with open('notices.xml', 'w') as fh:
        fh.write(response)

Une fois le fichier récupéré en local, on peut imaginer un script Python ou PHP qui traiterai le contenu du fichier XML pour l'enregistrer dans une base de données.

Voilà le code source complet de notre scraper en Python :

    # coding: utf8
    from splinter import Browser # importe l'objet Browser de la librairie

    with Browser() as browser:
        url = "https://www.rcsl.lu"
        browser.visit(url)
        # Effectue un clic sur le lien vers les publications du journal officiel
        browser.click_link_by_partial_href('mjrcs/jsp/DisplayOfficialJournalAction')
        # Vérifie que le tableau ayant la classe `commonTable` existe avant de passer à la suite
        if browser.is_element_present_by_css('table.commonTable'):
            # Récupère l'URL vers le fichier XML des publications du jour
            xmlfile = browser.find_by_css('table.commonTable')
                            .find_by_css('tbody')
                            .find_by_css('a')[3]
            browser.visit(xmlfile['href'])
            response = browser.html.encode('utf8', 'xmlcharrefreplace')
            # Enregistre le contenu du fichier XML dans un fichier en local
            with open('notices.xml', 'w') as fh:
                fh.write(response)

J'espère que cet article vous aura appris quelque chose et comme toujours, si vous avez des remarques ou des conseils pour l'améliorer, n'hésitez pas à m'en faire part sur Twitter ou dans les commentaires.
