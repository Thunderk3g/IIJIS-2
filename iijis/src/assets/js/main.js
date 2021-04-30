"use strict";
jQuery(document).on('ready', function() {
	/* -------------------------------------
			PRELOADER
	-------------------------------------- */
		jQuery(document).ready(function($){
		    jQuery(".preloader-outer").delay(1000).fadeOut();
			jQuery(".loader").delay(500).fadeOut("slow");
		});
	/*--------------------------------------
			MOBILE MENU
	--------------------------------------*/
	function collapseMenu(){
		jQuery('.sj-navigation ul li.menu-item-has-children, .sj-navigation ul li.page_item_has_children, .sj-navigation ul li.menu-item-has-mega-menu').prepend('<span class="sj-dropdowarrow"><i class="fa fa-angle-down"></i></span>');
		jQuery('.sj-navigation ul li.menu-item-has-children span, .sj-navigation ul li.page_item_has_children span, .sj-navigation ul li.menu-item-has-mega-menu span').on('click', function() {
			jQuery(this).parent('li').toggleClass('sj-open');
			jQuery(this).next().next().slideToggle(300);
		});
	}
	collapseMenu();

	/* -------------------------------------
			PROGRESS BAR
	-------------------------------------- */
	appear({
		init: function init(){
			jQuery('.sj-ourskill .sj-skill').each(function(){
				jQuery(this).find('.sj-skillbar').animate({
					width: jQuery(this).find('.sj-skillholder').attr('data-percent')
				}, 2500);
			});

		},
	});
	/* -------------------------------------
			OPEN CLOSE
	-------------------------------------- */
	jQuery('#sj-languages-button').on('click', function(event){
		event.preventDefault();
		jQuery('.sj-languages > ul').slideToggle();
	});
	/*--------------------------------------
			COUNTER
	--------------------------------------*/
	if(jQuery('#sj-counters').length > 0){
		var _tg_counters = jQuery('#sj-counters');
		_tg_counters.appear(function () {
			jQuery('.sj-timer').countTo()
		});
	}
	/*--------------------------------------
			THEME ACCORDION
	--------------------------------------*/
	if(jQuery('.sj-panelheading').length > 0){
		var _tg_panelheading = jQuery('.sj-panelheading');
		_tg_panelheading.on('click',function () {
			jQuery('.panel-heading').removeClass('active');
			jQuery(this).parents('.panel-heading').addClass('active');
			jQuery('.panel').removeClass('active');
			jQuery(this).parent().addClass('active');
		});
	}
	/* -------------------------------------
			WELCOME SLIDER
	-------------------------------------- */
	var _sj_welcomeimgslider = jQuery('#sj-welcomeimgslider');
	if(_sj_welcomeimgslider.hasClass('sj-welcomeslider')){
		_sj_welcomeimgslider.owlCarousel({
			items: 1,
			nav:false,
			loop:true,
			dots: true,
			autoplay: true,
			dotsClass: 'sj-sliderdots',
			navClass: ['sj-prev', 'sj-next'],
			navContainerClass: 'sj-slidernav',
			navText: ['<span class="icon-chevron-left"></span>', '<span class="icon-chevron-right"></span>'],
		});
	}
	/* -------------------------------------
			EDITOR CHOICE SLIDER
	-------------------------------------- */
	var _sj_editorchoiceslider = jQuery('#sj-editorchoiceslider');
	if(_sj_editorchoiceslider.hasClass('sj-editorschoice')){
		_sj_editorchoiceslider.owlCarousel({
			items: 1,
			nav:true,
			loop:true,
			dots: false,
			autoplay: true,
			dotsClass: 'sj-sliderdots',
			navClass: ['sj-prev', 'sj-next'],
			navContainerClass: 'sj-slidernav',
			navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
		});
	}
	/* -------------------------------------
			ISSUES SLIDERS
	-------------------------------------- */
	var _sj_homeslidersame = jQuery('[id="sj-issuesslider-2018"], [id="sj-issuesslider-2017"], [id="sj-issuesslider-2016"], [id="sj-issuesslider-2015"], [id="sj-issuesslider-2014"], [id="sj-issuesslider-2013"]');
	if(_sj_homeslidersame.hasClass('sj-issuesslider')){
		_sj_homeslidersame.owlCarousel({
			items: 1,
			nav:true,
			loop:true,
			dots: false,
			autoplay: false,
			dotsClass: 'sj-sliderdots',
			navClass: ['sj-prev', 'sj-next'],
			navContainerClass: 'sj-slidernav',
			navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
		});
	}
	/* -------------------------------------
			UPCOMING BOOKS SLIDER
	-------------------------------------- */
	var _sj_upcomingbooksslider = jQuery('#sj-upcomingbooksslider');
	if(_sj_upcomingbooksslider.hasClass('sj-upcomingbooks')){
		_sj_upcomingbooksslider.owlCarousel({
			items: 4,
			nav:true,
			margin:20,
			loop:true,
			dots: false,
			autoplay: true,
			responsiveClass:true,
			dotsClass: 'sj-sliderdots',
			navClass: ['sj-prev', 'sj-next'],
			navContainerClass: 'sj-slidernav',
			navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
			responsive:{
				0:{items:2,},
				567:{items:3,},
				991:{items:4,},
				992:{items:5,}
			}
		});
	}
	/* -------------------------------------
			NEWS ARTICLES SLIDER
	-------------------------------------- */
	var _sj_newsarticlesslider = jQuery('#sj-newsarticlesslider');
	if(_sj_newsarticlesslider.hasClass('sj-newsarticles')){
		_sj_newsarticlesslider.owlCarousel({
			items: 3,
			nav:true,
			margin:30,
			loop:true,
			dots: false,
			autoplay: false,
			responsiveClass:true,
			dotsClass: 'sj-sliderdots',
			navClass: ['sj-prev', 'sj-next'],
			navContainerClass: 'sj-slidernav',
			navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
			responsive:{
				0:{items:1,},
				600:{items:2,},
				992:{items:3,}
			}
		});
	}
	/*--------------------------------------
			Google Map
	--------------------------------------*/
	if(jQuery('#sj-locationmap').length > 0){
		var _tg_locationmap = jQuery('#sj-locationmap');
		_tg_locationmap.gmap3({
			marker: {
				address: '1600 Elizabeth St, Melbourne, Victoria, Australia',
				options: {
					title: 'Robert Frost Elementary School'
				}
			},
			map: {
				options: {
					zoom: 16,
					scrollwheel: false,
					disableDoubleClickZoom: true,
				}
			}
		});
	}
	/*--------------------------------------
			PRETTY PHOTO GALLERY
	--------------------------------------*/
	if(jQuery('#sj-prettyphoto').length > 0){
		jQuery("a[data-rel]").each(function () {
			jQuery(this).attr("rel", jQuery(this).data("rel"));
		});
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
			animation_speed: 'normal',
			theme: 'dark_square',
			slideshow: 3000,
			autoplay_slideshow: false,
			social_tools: false
		});
	}
	/* -------------------------------------
			NEXT EVENT COUNTER
	-------------------------------------- */
	var _sj_upcomingeventcounter = jQuery('#sj-comingsooncounter');
	_sj_upcomingeventcounter.countdown('2020/12/12', function(event) {
		var $this = jQuery(this).html(event.strftime(''
			+ '<div class="sj-counterholder"><div class="sj-eventcounter"><span>%-D</span><span> Days</span></div></div>'
			+ '<div class="sj-counterholder"><div class="sj-eventcounter"><span>%H</span><span>Hours</span></div></div>'
			+ '<div class="sj-counterholder"><div class="sj-eventcounter"><span>%M</span><span>Minutes</span></div></div>'
			+ '<div class="sj-counterholder"><div class="sj-eventcounter"><span>%S</span><span>Seconds</span></div></div>'
		));
	});
	/* -------------------------------------
			TESTIMONIALS SLIDER
	-------------------------------------- */
	function focusSlider(){
		var sync1 = jQuery("#sj-ourfocusslider");
		var sync2 = jQuery("#sj-ourfocusthumbslider");
		var slidesPerPage = 5;
		var syncedSecondary = true;
		sync1.owlCarousel({
		items : 1,
		slideSpeed : 2000,
		loop: true,
		dots: false,
		autoplay: true,
		responsiveRefreshRate : 200,
	}).on('changed.owl.carousel', syncPosition);
	sync2
		.on('initialized.owl.carousel', function () {
		sync2.find(".owl-item").eq(0).addClass("current");
	})
	.owlCarousel({
		items : slidesPerPage,
		dots: false,
		nav: false,
		margin:10,
		autoplay: true,
		smartSpeed: 200,
		slideSpeed : 500,
		slideBy: slidesPerPage,
		responsiveRefreshRate : 100,
		responsive:{
			0:{ items:2, },
			568:{ items:2, },
			768:{ items:3, },
			992:{ items:5, },
		},
	}).on('changed.owl.carousel', syncPosition2);
	function syncPosition(el) {
		var count = el.item.count-1;
		var current = Math.round(el.item.index - (el.item.count/2) - .5);
			if(current < 0) {
				current = count;
			}
	if(current > count) {
			current = 0;
		}
	sync2
		.find(".owl-item")
		.removeClass("current")
		.eq(current)
		.addClass("current");
	var onscreen = sync2.find('.owl-item.active').length - 1;
	var start = sync2.find('.owl-item.active').first().index();
	var end = sync2.find('.owl-item.active').last().index();
		if (current > end) {
			sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
		sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}
	function syncPosition2(el) {
	if(syncedSecondary) {
		var number = el.item.index;
		sync1.data('owl.carousel').to(number, 100, true);
		}
	}
	sync2.on("click", ".owl-item", function(e){
		var number = jQuery(this).index();
		sync1.data('owl.carousel').to(number, 300, true);
	});
	}
	focusSlider();
	/*--------------------------------------
			TOTAL VIEWS CHART
	--------------------------------------*/
	if(jQuery('#sj-viewchart').length > 0){
		var chart = new Chartist.Bar('#sj-viewchart', {
			labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
			series: [1400, 2200, 1700, 1550, 2400, 1900, 1600],
		}, {
			distributeSeries: true
		});
	}
	/* -------------------------------------
			THEME ACCORDION
	-------------------------------------- */
	jQuery(function() {
		jQuery('.sj-panelcontent').hide();
		jQuery('.sj-accordion h4:first').addClass('active').next().slideDown('slow');
		jQuery('.sj-accordion h4').on('click',function() {
			if(jQuery(this).next().is(':hidden')) {
				jQuery('.sj-accordion h4').removeClass('active').next().slideUp('slow');
				jQuery(this).toggleClass('active').next().slideDown('slow');
			}
		});
	});

	/* ---------------------------------------
			SEARCH
	 -------------------------------------- */
	jQuery(function () {
		jQuery('a[href="#sj-searcharea"]').on('click', function (event) {
			event.preventDefault();
			jQuery('.sj-searcharea').addClass('open');
			jQuery('.sj-searcharea > form > input[type="search"]').focus();
		});
		jQuery('.sj-searcharea, .sj-searcharea button.close').on('click keyup', function (event) {
			if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
				jQuery(this).removeClass('open');
			}
		});
		jQuery('form').submit(function (event) {
			event.preventDefault();
			return false;
		})
	});
	/*--------------------------------------
			THEME VERTICAL SCROLLBAR
	--------------------------------------*/
	if(jQuery('.sj-verticalscrollbar').length > 0){
		var _sj_verticalscrollbar = jQuery('.sj-verticalscrollbar');
		_sj_verticalscrollbar.mCustomScrollbar({
			axis:"y",
		});
	}
	if(jQuery('.sj-horizontalthemescrollbar').length > 0){
		var _sj_horizontalthemescrollbar = jQuery('.sj-horizontalthemescrollbar');
		_sj_horizontalthemescrollbar.mCustomScrollbar({
			axis:"x",
			advanced:{autoExpandHorizontalScroll:true},
		});
	}
	/* -------------------------------------
				SCROLL TO TOP
	-------------------------------------- */
	var _sj_btnscrolltotop = jQuery(".sj-btnscrolltotop");
	_sj_btnscrolltotop.on('click', function(){
		var _scrollUp = jQuery('html, body');
		_scrollUp.animate({ scrollTop: 0 }, 'slow');
	});
	/* -------------------------------------
				OPEN CLOSE
	-------------------------------------- */
	jQuery('.sj-userdropdownbtn').on('click', function(event){
		var _this = jQuery(this);
		event.preventDefault();
		_this.closest('.sj-categorysinfo').siblings('.sj-categorysinfo').find('.sj-userdropdownmanu').slideUp();
		_this.siblings('.sj-userdropdownmanu').slideToggle();
	});
});
