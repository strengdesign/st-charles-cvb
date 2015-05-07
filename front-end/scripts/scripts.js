$(function () {

	/* ==========================================================================
	   variables
	   ========================================================================== */
	var navContainer = $('.site-nav');
	var mainNav = $('.main-nav');
	var slideContainer = $('.carousel');


	/* ==========================================================================
	   mobile navigation
	   ========================================================================== */
	navContainer.prepend('<span class="nav-icon" title="Menu">&nbsp;<span class="icon"></span></span>');
	mainNav.find('.menu').before('<span class="subnav-icon" title="Toggle">&nbsp;</span>');

	$('.nav-icon').click(function () {
		mainNav.toggleClass('active');
		$(this).toggleClass('active');
	});

	mainNav.find('.subnav-icon').click(function () {
		$(this).next('ul').slideToggle(250);
		$(this).toggleClass('active');
	});


	/* ==========================================================================
	   Site search popup
	   ========================================================================== */
	$('.search-icon').click(function (e) {
		e.preventDefault();
		$('.site-search').toggleClass('active');
		if ($('.site-search').hasClass('active')) {
			$('.site-search input').focus();
		}
	});

	// close filter menu on click outside
	$(document).mouseup(function (e) {
		var container = $('.site-search');
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.removeClass('active');
		}
	});

		
	/* ==========================================================================
	   Date picker
	   ========================================================================== */
	$('.date-from').datepicker({
		defaultDate: '+1w',
		numberOfMonths: 1,
		onClose: function (selectedDate) {
			$('.date-to').datepicker('option', 'minDate', selectedDate);
		}
	});

	$('.date-to').datepicker({
		defaultDate: '+1w',
		numberOfMonths: 1,
		onClose: function (selectedDate) {
			$('.date-from').datepicker('option', 'maxDate', selectedDate);
		}
	});


	$('.book-room .header').click(function () {
		if ($(this).css('cursor') == 'pointer') {
			$('.book-room').toggleClass('active');
		}
	});

	/* ==========================================================================
	   Carousel
	   ========================================================================== */
	if (slideContainer.length) {
		var slideInterval;
		var slideshowPosition = 0;
		var totalSlides = slideContainer.find('.slide').length;
		var slideSpeed = slideContainer.data('speed') || 6000;

		slideContainer.append('<ul class="slide-nav"></ul>');
		for (i = 1; i <= totalSlides; i++) {
			slideContainer.find('.slide-nav').append('<li' + (i == 1 ? " class=\"active\"" : "") + ' title="' + i + ' of ' + totalSlides + '">' + i + '</li>');
		}

		slideContainer.find('.next').click(function () {
			clearInterval(slideInterval);
			nextSlide();
		});

		slideContainer.find('.prev').click(function () {
			clearInterval(slideInterval);
			prevSlide();
		});

		function nextSlide() {
			if (slideshowPosition >= totalSlides - 1) {
				slideshowPosition = 0;
			} else {
				slideshowPosition++;
			}
			newSlide();
		}

		function prevSlide() {
			if (slideshowPosition == 0) {
				slideshowPosition = totalSlides - 1;
			} else {
				slideshowPosition--;
			}
			newSlide();
		}

		function newSlide() {
			slideContainer.find('.slide:eq(' + slideshowPosition + ')').addClass('animating').fadeIn(function () {
				/* hide all images except active slide */
				slideContainer.find('.slide').not(':eq(' + slideshowPosition + ')').hide();

				/* remove animating class from active slide and show it
				 (use display: block instead of show because images will default to inline) */
				slideContainer.find('.slide:eq(' + slideshowPosition + ')').css('display', 'block').removeClass('animating');

				/* update the slideshow pagination */
				slideContainer.find('.slide-nav li').removeClass('active');
				slideContainer.find('li:eq(' + slideshowPosition + ')').addClass('active');
			});
		};

		slideInterval = setInterval(nextSlide, slideSpeed);
	}


});