var navToggle = document.querySelector('.site-nav-toggle');
var body = document.querySelector('body');
var nav = document.querySelector('.site-nav');

var replaceFormspreeEmail = function() {
	var emailLink = document.querySelector(".contact-form");
	var emailName = "etisbew+aihcreihc.egna";
	var emailTLD = "moc.liamg";

	emailLink.setAttribute("action", "https://formspree.io/" + emailName.split('').reverse().join('') + "@" + emailTLD.split('').reverse().join(''));
};

var navItemAnimDelay = function() {
	var needAnimation = document.querySelectorAll('.nav-item[data-animate]');
	needAnimation.forEach(function(elem, idx) {
		elem.style.transitionDelay = 100 * (idx+1) + 'ms';
	});
}

document.addEventListener('DOMContentLoaded', function() {
	if (document.querySelector(".contact-form")) {
		replaceFormspreeEmail();
	}

	if (document.querySelector('[data-animate')) {
		navItemAnimDelay();
		inView('[data-animate]').on('enter', function(selector) {
			selector.classList.add('inview');
		});
	}

	navToggle.addEventListener('click', function() {
		navToggle.classList.toggle('open');
		body.classList.toggle('no-scroll');

		if (!navToggle.classList.contains(open)) {
			var navItems = document.querySelectorAll('.nav-item.inview');
			navItems.forEach(function(selector) {
				selector.classList.remove('inview');
			});
		}
	});
});
