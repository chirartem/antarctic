$(function(){
	$(".menu__link, .logo").on("click", function (event) {
		event.preventDefault();

		var id  = $(this).attr('href'),

		top = $(id).offset().top;

		$('body,html').animate({scrollTop: top}, 500);
	});

	$('.menu__btn').on('click', function(){
		// $('.menu__list').toggleClass('menu__list--active');
		$('.header__top').toggleClass('header__top--active');
		$('.menu__btn').toggleClass('menu__btn--active');
	});

	var mixer = mixitup('.portfolio__content');
})

$('.back-to-top').hide();
function backToTop() {
	let button = $('.back-to-top');
	$(window).on('scroll', () => {
		if ($(this).scrollTop() >= 50) {
			button.fadeIn();
		} else {
			button.fadeOut();
		}
	});

	button.on('click', (e) => {
		e.preventDefault();
		$('html').animate({scrollTop: 0}, 500);
	})
}

backToTop();