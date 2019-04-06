var navToggle = document.querySelector('.site-nav-toggle');
var body = document.querySelector('body');

var replaceFormspreeEmail = function() {
	var emailLink = document.querySelector(".contact-form");
	var emailName = "etisbew+aihcreihc.egna";
	var emailTLD = "moc.liamg";

	emailLink.setAttribute("action", "https://formspree.io/" + emailName.split('').reverse().join('') + "@" + emailTLD.split('').reverse().join(''));
};

document.addEventListener('DOMContentLoaded', function() {
	if (document.querySelector(".contact-form")) {
		replaceFormspreeEmail();
	}

	inView('[data-animate]').on('enter', function(selector) {
		selector.classList.add('inview');
	});

	navToggle.addEventListener('click', function() {
		navToggle.classList.toggle('open');
		body.classList.toggle('no-scroll');
	});
});
