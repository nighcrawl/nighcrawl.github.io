---
title: Contact
date: 2009-05-14T17:37:40+00:00
layout: page
body_class: "contact-page"
permalink: /contact/
---
Pour me demander de l&rsquo;aide sur une question ayant trait au développement Web en général, me proposer une opportunité ou tout simplement dire bonjour, vous pouvez [me contacter sur Twitter](https://twitter.com/nighcrawl) ou bien utiliser le formulaire ci-dessous.

<form class="contact-form" method="POST">
	<p>
		<label for="name">Nom</label>
		<input type="text" id="name" name="name" placeholder="Votre nom" required />
	</p>
	<p>
		<label for="email">Email</label>
		<input type="email" id="email" name="_replyto" placeholder="Votre adresse email" required />
	</p>
	<p>
		<label for="message">Message</label>
		<textarea id="message" name="message" placeholder="Votre message" required></textarea>
	</p>

	<input type="hidden" name="_format" value="html" />
	<input type="hidden" name="_language" value="fr">
	<input type="text" name="_gotcha" style="display:none" />
	
	<button type="submit">Envoyer</button>
</form>