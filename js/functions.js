$(function() {
	$(document).on('focusin', '.field, textarea', function() {
		if(this.title==this.value) {
			this.value = '';
		}
	}).on('focusout', '.field, textarea', function(){
		if(this.value=='') {
			this.value = this.title;
		}
	});
	/*.on('mouseenter', '.home-services li', function(){
		$(this).find('.more').stop(true,true).slideDown(150);
	}).on('mouseleave', '.home-services li', function(){
		$('.more').stop(true,true).slideUp(150);
	});*/

	var $win = $(window);
	var $portfolioList = $('.portfolio-list ul');
	var $portfolioListItemHeight = 0;
	var highestItem = 0; 
	var itemHeight = 0;
	var $portfolioListItems = $portfolioList.find('li');

	//setPortfolioRows($portfolioListItems, 3);

	// Determine item rows
	function setPortfolioRows($items, colsPerRow) {
		var itemIdx = 1;
		var rowIdx = 1;

		$items.each(function() {
			if(itemIdx > colsPerRow) {
				itemIdx = 1;
				rowIdx++;
			}

			$(this).attr('data-row', rowIdx);

			itemIdx++;
		});

		getTallestHeightPerRow($items);
	}

	function getTallestHeightPerRow($items) {
		var maxHeight = 0;
		var rowIdx = 1;

		$items.each(function() {
			var $item = $(this);

			$item.attr('style', '');

			if(Number($item.attr('data-row')) != rowIdx) {
				$('.portfolio-list li[data-row="' + rowIdx + '"]').css({ height: maxHeight });

				maxHeight = 0;
				rowIdx++;
			}

			if($item.height() > maxHeight) {
				maxHeight = $item.height();
			}
		});

	}


	$('.home-services li').each(function(){
		if( itemHeight < $(this).height() ){
			itemHeight = $(this).height();
		}
	});

	$('.home-services ul').height(itemHeight + 40);
	$win.on("load", function(){


		var $sideNav = $('.portfolio-nav ul:first');
		var $sideNavLink = $sideNav.find('> li > a');

		$sideNavLink.on('click', function(){

			if( ($(this).parents('li').find('ul').length) && $(this).parents('li').find('ul').is(':hidden') ){
				$sideNavLink.removeClass("active");
				$sideNav.find('ul').stop(true,true).slideUp(150);	
				$(this).parents('li').find('ul').stop(true,true).slideDown(150)
				$(this).addClass('active');
				return false;
			} else {
				$(this).parents('li').find('ul').stop(true,true).slideUp(150)
				$(this).removeClass('active');
			}
		});

		if( $('.section-slider').length ){

			$(".slides-1").carouFredSel({
				responsive: true,
				circular: false,
				auto: 6000,
				items: 1,
				scroll: {
				    items: 1,
				    fx: "scroll",
				    easing: "quadratic",
				    duration: 1000
				},
				pagination: {
					container: ".pagination"
				}
			});

			$(".slides-2").carouFredSel({
				auto: 5000,
				responsive: true,
				circular: true,
				items: 1,
				scroll: {
				    items: 1,
				    fx: "scroll",
				    easing: "quadratic",
				    duration: 600
				},
				prev: ".prev",
				next: ".next"
			});
		};

		if( $('.portfolio-slider').length ){
			$(".portfolio-slider ul").carouFredSel({
				auto: false,
				responsive: true,
				circular: true,
				items: 1,
				scroll: {
				    items: 1,
				    fx: "scroll",
				    easing: "quadratic",
				    duration: 600
				},
				prev: ".prev",
				next: ".next"
			});
		};

		if( $('.custom-select').length ){
			$('.custom-select select').selectBoxIt({
				autoWidth: false
			});
		}

	});
});