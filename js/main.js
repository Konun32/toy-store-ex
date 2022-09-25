
//slick slider
$(document).ready(function(){
	$('.example__slider').slick({
		arrows: true,
		dots: false,
		centerMode: true,
		slidesToShow: 1,
	});
});

//menu
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const links = document.querySelectorAll('.menu__link');
if (iconMenu) {
	iconMenu.addEventListener("click", function(e){
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	})
}

//Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

//header
const header = document.getElementsByClassName('header')[0];
let logoF = document.getElementsByClassName('logoF')[0];
let logoS = document.getElementsByClassName('logoS')[0];
window.onscroll = function(ev) {
	if (window.pageYOffset == 0) {
		
		if (!logoF.classList.contains('logo-none')) {
			logoF.classList.add('logo-none');
		}
		if (logoS.classList.contains('logo-none')) {
			logoS.classList.remove('logo-none');
		}
		if (header.classList.contains('header-scroll')) {
			header.classList.remove('header-scroll');
		}
	} else {
		
		if (!logoS.classList.contains('logo-none')) {
			logoS.classList.add('logo-none');
		}
		if (logoF.classList.contains('logo-none')) {
			logoF.classList.remove('logo-none');
		}
		if (!header.classList.contains('header-scroll')) {
			header.classList.add('header-scroll');
		}
	}
};

//stocks
let buttons = document.querySelectorAll('.stocks__btn');
if (buttons.length > 0) {
	buttons.forEach(btn => {
		btn.addEventListener("click", onButtonClick);
	});
	function onButtonClick(e) {
		let btn = e.target;
		let button = btn.parentElement;
		let text = button.previousElementSibling;
		let hidden = text.lastElementChild;
		let points = text.firstElementChild;
		button.classList.toggle('_act');
		points.classList.toggle('stocks__hidden');
		hidden.classList.toggle('stocks__hidden');
	}
}
const animItems = document.getElementsByClassName('_anim-item');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_activeI');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')){
					animItem.classList.remove('_activeI');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
	}
	animOnScroll();
}