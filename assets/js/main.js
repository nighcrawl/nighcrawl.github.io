var navToggle = document.querySelector('.site-nav-toggle');
var body = document.querySelector('body');
var nav = document.querySelector('.site-nav');
var themeToggle = document.querySelector('.site-theme-switcher');

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

var switchTheme = function(theme, save) {
	if (theme == 'dark') {
		document.querySelector('html').setAttribute('data-theme', 'dark');
		document.querySelector('.site-theme-switcher i').classList.remove('far');
		document.querySelector('.site-theme-switcher i').classList.add('fas');
		document.querySelector('.site-theme-switcher').setAttribute('data-switch-theme', 'light');
	} else {
		document.querySelector('html').removeAttribute('data-theme');
		document.querySelector('.site-theme-switcher i').classList.remove('fas');
		document.querySelector('.site-theme-switcher i').classList.add('far');
		document.querySelector('.site-theme-switcher').setAttribute('data-switch-theme', 'dark');
	}

	save = typeof(save) == 'undefined' ? false : true;
	if (save) {
		localStorage.setItem('theme', document.querySelector('html').getAttribute('data-theme'));
	}
}

document.addEventListener('DOMContentLoaded', function() {

	if (localStorage.getItem('theme') !== null) {
		switchTheme(localStorage.getItem('theme'));
	}

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

	themeToggle.addEventListener('click', function() {
		switchTheme(themeToggle.getAttribute('data-switch-theme'), true);
	});
});
