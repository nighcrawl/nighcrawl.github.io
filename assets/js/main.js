var navToggle = document.querySelector('.site-nav-toggle');
var body = document.querySelector('body');
var nav = document.querySelector('.site-nav');
var themeToggle = document.querySelector('.site-theme-switcher');
var useDark = window.matchMedia("(prefers-color-scheme: dark)");
var isDarkMode = useDark.matches;
var themeColorNavOpen = "#b50055";

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

var switchTheme = function(darkModeState) {
	if (darkModeState) {
		document.querySelector('html').setAttribute('data-theme', 'dark');
		document.querySelector('[name="theme-color"]').setAttribute('content', themeColorDark);
		themeToggle.querySelector('i').classList.remove('far');
		themeToggle.querySelector('i').classList.add('fas');
		themeToggle.setAttribute('data-switch-theme', 'light');
	} else {
		document.querySelector('html').removeAttribute('data-theme');
		document.querySelector('[name="theme-color"]').setAttribute('content', themeColorLight);
		themeToggle.querySelector('i').classList.remove('fas');
		themeToggle.querySelector('i').classList.add('far');
		themeToggle.setAttribute('data-switch-theme', 'dark');
	}
};


var timeSince = function(date) {
	var timestamp = new Date(Date.parse(date));
	var now = new Date(),
	secondsPast = (now.getTime() - timestamp) / 1000;
	
	return 'déjà ' + parseInt(secondsPast / (60 * 60 * 24 * 365)) + ' ans';
} 

document.addEventListener('DOMContentLoaded', function() {
	switchTheme(isDarkMode);

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
		var themeColorOld = document.querySelector('[name="theme-color"]').getAttribute('content');
		navToggle.classList.toggle('open');
		body.classList.toggle('no-scroll');

		if (!navToggle.classList.contains(open)) {
			document.querySelector('[name="theme-color"]').setAttribute('content', themeColorOld);
			var navItems = document.querySelectorAll('.nav-item.inview');
			navItems.forEach(function(selector) {
				selector.classList.remove('inview');
			});
		} else {
			document.querySelector('[name="theme-color"]').setAttribute('content', themeColorNavOpen);
		}
	});

	themeToggle.addEventListener('click', function() {
		console.log('themeToggle click', themeToggle.getAttribute('data-switch-theme'));
		var setDarkMode = themeToggle.getAttribute('data-switch-theme') === 'dark' ? true : false;
		switchTheme(setDarkMode);
	});

	if (document.querySelector('#js-career-start')) {
		var careerStart = document.querySelector('#js-career-start');
		var careerStartedSince = timeSince(careerStart.getAttribute('datetime'));

		careerStart.innerHTML = careerStartedSince;
	}
});
