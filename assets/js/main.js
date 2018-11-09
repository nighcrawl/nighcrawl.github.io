var replaceFormspreeEmail = function() {
	var emailLink = document.querySelector(".contact-form"),
        emailName = "etisbew+aihcreihc.egna",
		emailTLD = "moc.liamg";

	emailLink.setAttribute("action", "https://formspree.io/" + emailName.split().reverse().join() + "@" + emailTLD.split().reverse().join());
};

document.addEventListener('DOMContentLoaded', function() {
	if (document.querySelector(".contact-form"))
		replaceFormspreeEmail();
});
