$(function () {

	/* ==========================================================================
	   variables
	   ========================================================================== */
	var navContainer = $('.site-nav');
	var mainNav = $('.main-nav');


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


});