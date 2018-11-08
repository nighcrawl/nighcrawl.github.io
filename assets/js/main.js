var replaceFormspreeEmail = function() {
	var emailLink = document.querySelector(".contact-form"),
		emailName = "ange.chierchia+job",
		emailTLD = "gmail.com";

	emailLink.setAttribute("action", "https://formspree.io/" + emailName + "@" + emailTLD);
};

document.addEventListener('DOMContentLoaded', function() {
	if (document.querySelector(".contact-form"))
		replaceFormspreeEmail();
});
