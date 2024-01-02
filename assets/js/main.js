var navToggle = document.querySelector('.site-nav-toggle');
var body = document.querySelector('body');
var nav = document.querySelector('.site-nav');
var themeToggle = document.querySelector('.site-theme-switcher');
var useDark = window.matchMedia("(prefers-color-scheme: dark)") || window.matchMedia("(prefers-color-scheme: no-preference)") ? true : false;
var isDarkMode = document.querySelector('html').getAttribute('data-theme') === "dark";
var themeColorNavOpen = isDarkMode ? themeColorDark : "#b50055";
var themeColorOld = document.querySelector('[name="theme-color"]').getAttribute('content');

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
};

var timeSince = function(date) {
	var timestamp = new Date(Date.parse(date));
	var now = new Date(),
	secondsPast = (now.getTime() - timestamp) / 1000;
	
	return 'déjà ' + parseInt(secondsPast / (60 * 60 * 24 * 365)) + ' ans';
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
		if (!navToggle.classList.contains('open')) {
			document.querySelector('[name="theme-color"]').setAttribute('content', themeColorNavOpen);
			navToggle.classList.add('open');
			body.classList.add('no-scroll');

			var navItems = document.querySelectorAll('.nav-item.inview');
			navItems.forEach(function(selector) {
				selector.classList.remove('inview');
			});
		} else {
			document.querySelector('[name="theme-color"]').setAttribute('content', themeColorOld);
			navToggle.classList.remove('open');
			body.classList.remove('no-scroll');
		}
	});

	if (document.querySelector('#js-career-start')) {
		var careerStart = document.querySelector('#js-career-start');
		var careerStartedSince = timeSince(careerStart.getAttribute('datetime'));

		careerStart.innerHTML = careerStartedSince;
	}
});

const COOKIE = "dark";

function disableDarkTheme() {
	document.querySelector('html').removeAttribute('data-theme');
	document.querySelector('[name="theme-color"]').setAttribute('content', themeColorLight);
	themeToggle.querySelector('i').classList.remove('fas');
	themeToggle.querySelector('i').classList.add('far');
	themeToggle.setAttribute('data-switch-theme', 'dark');
	themeColorOld = document.querySelector('[name="theme-color"]').getAttribute('content');
	document.cookie = `${COOKIE}=false; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/"`;
}

function enableDarkTheme() {
	document.querySelector('html').setAttribute('data-theme', 'dark');
	document.querySelector('[name="theme-color"]').setAttribute('content', themeColorDark);
	themeToggle.querySelector('i').classList.remove('far');
	themeToggle.querySelector('i').classList.add('fas');
	themeToggle.setAttribute('data-switch-theme', 'light');
	themeColorOld = document.querySelector('[name="theme-color"]').getAttribute('content');
	document.cookie = `${COOKIE}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/"`;
}

if (document.cookie.split(";").some((item) => item.trim().startsWith(`${COOKIE}=true`))) {
	// If the user has the dark mode cookie, respect the cookie.
	enableDarkTheme();
} else if (document.cookie.split(";").some((item) => item.trim().startsWith(`${COOKIE}=false`))) {
	// If the user has the light mode cookie, respect the cookie.
	disableDarkTheme();
} else {
	if (
		window.matchMedia 
		&& (
			window.matchMedia("(prefers-color-scheme: dark)").matches 
			|| window.matchMedia("(prefers-color-scheme: no-preference)").matches
		)
	) {
		// If the user prefers dark mode, or doesn't care, enable dark mode.
		enableDarkTheme();
	} else {
		// User prefers light mode via system preferences.
		disableDarkTheme();
	}
}

addEventListener("DOMContentLoaded", () => {
	themeToggle.addEventListener('click', function() {
		console.log('themeToggle click', themeToggle.getAttribute('data-switch-theme'));
		var setDarkMode = themeToggle.getAttribute('data-switch-theme') === 'dark' ? true : false;
		if (setDarkMode) {
			enableDarkTheme();
		} else {
			disableDarkTheme();
		}
	});
});