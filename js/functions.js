;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);

	$doc.ready(function() {


		var resetContainerWidths = (function(){

			var minLockTime = 1000, //milliseconds to lock before can be run again 
				lastRun = 0;

			function updateIfNotTooSoon(){
				if( lastRun < new Date() - minLockTime ){
					update();
					lastRun = new Date();
					console.log(lastRun);
				}else{
					console.log("too soon");
				}
			}

			function update(){

				$(".select2-container")
					.each(function(){
						
						//Clear Widths
						$(this)
							.css("width","");
						$("input", this)
							.css("width","");

						//set new width to auto width (+ 1px)
						$(this)
							.css("width",$(this).width() + 1 );
					});				
			}



			return updateIfNotTooSoon;
		})()



		$('.form-add-inline').find('.field').each(function() {
			var $field = $(this);
			var fontStyle = {
				'font-size': $field.css('font-size'),
				'font-family': $field.css('font-family'),
				'font-weight': $field.css('font-weight')
			};

			var $fakeElement = $('<span />').css($.extend({
				position: 'absolute',
				top: -99999
			}, fontStyle)).appendTo('body');

			var value = this.value;
			var hasValue = false;

			$field.on('input', function() {
				value = this.value;

				hasValue = value.length > 0;

				this.style.width = null;
				
				if(hasValue) {
					$fakeElement.html(value.replace(/ /g, '&nbsp;'));

					this.style.width = $fakeElement.width() + 'px';
				};

				resetContainerWidths();

				$field.toggleClass('has-value', hasValue);
			});

		});

		$doc.on('click', function (){
			$('.j-rate em').on('click', function (){
				var percent = ( $(this).index() ) * 20;

				$(this).siblings('span').css({
					width: percent + '%'
				})
			})
		})

		$('.select2-multi')
			.select2({
				 theme: 'default alt',
				 width: "25px"
			})
			.on('change', function() {
				var $select = $(this);

				$select.toggleClass('has-selected-value', this.value !== '');

				if($select.nextAll('.form-next-step').length) {

					setTimeout(function() {
						$select.nextAll('.form-next-step').find('input[type="text"]').trigger('focus');
					}, 50);

				}
			})
			.on('select2:select', function(event) {
				if(!$(this).data('selected')) {
					$(this).data('selected', []);
				};

				if(event) {
					$(this).data('selected').push(event.params.data.id);
				};
			})
			.on('select2:unselect', function(event) {
				var $select = $(this);
				var itemIdx = $(this).data('selected').indexOf(event.params.data.id);

				$select.data('selected').splice(itemIdx, 1);

				$select.next().find('.select2-selection__choice').eq(itemIdx).find('.select2-selection__choice__remove').trigger('click');

				setTimeout(function() {
					$select.next().find('input').trigger('click');
				}, 20);

			})
			.on('select2:open', function(event) {
				var selected = $(this).data('selected');

				if(!selected || !selected.length) {

					$('.select2-container.select2-container--open .select2-dropdown')
						.removeClass('has-selected')
							.find('.select2-results__option[role=group]')
							.empty().remove();
					return;
				};

				$('.select2-container.select2-container--open .select2-dropdown')
					.addClass('has-selected')
						.find('.select2-results__option')
						.removeClass('active')
							.filter('[title="' + selected[selected.length - 1] + '"]')
							.addClass('active');

					$('.select2-container.select2-container--open .select2-dropdown')
						.find('.select2-results__option.active').find('.select2-results__option').addClass('active');


					$('.select2-container.select2-container--open .select2-dropdown')
						.find('.select2-results__option:not(.active)').empty().remove();
			})
			.on('select2:select', function(event) {
				var $select = $(this);

				$select.next().find('input').trigger('click');
				resetContainerWidths();

			})
			.on('select2:append', function() {
				var selected = $(this).data('selected');


				if(!selected || !selected.length) {

					$('.select2-container.select2-container--open .select2-dropdown')
						.removeClass('has-selected')
							.find('.select2-results__option[role=group]')
							.empty().remove();
					return;
				};

				$('.select2-container.select2-container--open .select2-dropdown')
					.addClass('has-selected')
						.find('.select2-results__option')
						.removeClass('active')
							.filter('[aria-label="' + selected[selected.length - 1] + '"]')
							.addClass('active');

				$('.select2-container.select2-container--open .select2-dropdown')
					.find('.select2-results__option.active').find('.select2-results__option').addClass('active');


				$('.select2-container.select2-container--open .select2-dropdown')
					.find('.select2-results__option:not(.active)').empty().remove();

			})
			.filter('[autofocus]').each(function() {

				var field = this;

				setTimeout(function(){
					resetContainerWidths();
					$(field).select2('open');
				}, 1000);
			});



		$('.j-btn').on('click', function (e){
			$('html, body').animate({
				scrollTop: $('.j-sect').offset().top
			},1000);

			e.preventDefault();
		})

		$.fn.equalizeHeight = function() {
			var maxHeight = 0, itemHeight;

			for (var i = 0; i < this.length; i++) {
				itemHeight = $(this[i]).height();
				if (maxHeight < itemHeight) {
					maxHeight = itemHeight;
				}
			}

			return this.height(maxHeight);
		}

		// $('.datepicker').each( function (){
		// 	$(this).datepicker({
		// 		changeYear: true,
		// 		yearRange: "-100:+0",
		// 		showOn: "button",
		// 		buttonImage: "images/calendar.png",
		// 		buttonImageOnly: true,
		// 		beforeShow: function(input, inst) {
		// 			insertMessage()
		// 		}
		// 	});
		// })
		
		$doc.on('click', '.ui-datepicker-prev, .ui-datepicker-next', insertMessage )

		function insertMessage(message) {

		    clearTimeout(insertMessage.timer);
		    
		    if ( $('#ui-datepicker-div .ui-datepicker-calendar').is(':visible') ){
		        $('.ui-datepicker-header').append('<div class="datepicker-curr">' + $('.ui-datepicker-today').text() + '</div>');
		    } else {
		        insertMessage.timer = setTimeout(insertMessage, 10);
		    }
		}

		$('.section-actions').on('click', '.j-load', function(e) {
			var href = $(this).attr('href');

			$.ajax({
			   url: href,
			   type: 'get',
			   success: function(data) {
					$('.articles-jobs').append($('.article-jobs', data));
					$('.section-actions').html($('.section-actions', data).html())
			   }
			})
			
			e.preventDefault();
		})

		$win
			.on('load', function (){

				$('.slider .slides').carouFredSel({
					auto: 3000,
					direction: 'up',
					swipe: {
						onTouch: true
					},
					scroll: {
						pauseOnHover: true
					},
					items: {
					}
				});

				$('.slider-logos .slides').carouFredSel({
					auto: 3000,
					responsive: true,
					height: 'variable',
					swipe: {
						onTouch: true
					},
					scroll: {
						pauseOnHover: true,
						fx: 'crossfade'
					},
					items: {
						// height: 'variable'
					}
				});

				if($('.skrollr-section').length && $(window).width() > 768 && !(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
					skrollr.init({
						mobileCheck: function() {
							return false;
						},
						forceHeight: false
					});

					$('.section-tabs').removeClass('fixed');
				};
			})
			.on('scroll', function (){
				fixedNav()
			})

		$(".j-height").equalizeHeight();

		$('.form-user .j-content').each(function() {
			new MiniUserDataEditor(this, {
				triggerSelector: '.j-btn-edit',
				fieldSelector: '.field, .select'
			});
		});

		$('.form-user form').on('submit', function(event) {
			var isValid = true;
			var hasEditedBlocks = false;

			$(this).find('.j-content').each(function() {
				if(!$(this).data('validator').valid) {
					isValid = false;
				};

				if($(this).data('validator').edited) {
					hasEditedBlocks = true;
				};
			});

			if(!isValid || !hasEditedBlocks) {
				event.preventDefault();
			};
		});


		$('.j-btn-edit2').on('click', function (e){
			var $parent = $(this).parents('.j-content2');
			
			$parent.addClass('edit-mode')

			$parent.find('.j-text span').each( function (){
				var field = $(this).attr('data-text');
				var text = $(this).text();

				$parent.find('.field[data-text="' + field + '"]').val(text);
			})

			e.preventDefault();
		})

		$('.j-btn-check2').on('click', function (e){
			var $parent = $(this).parents('.j-content2');
			
			$parent.removeClass('edit-mode')

			$parent.find('.field').each( function (){
				var field = $(this).attr('data-text');
				var place = $(this).attr('placeholder');
				var text = $(this).val();

				$parent.find('span[data-text="' + field + '"]').text(text);
			})

			e.preventDefault();
		})

		
		$('.btn-menu').on('click', function (e){
			$('body').addClass('visible-menu');

			e.preventDefault();
		})

		$('.close-menu').on('click', function (e){
			$('body').addClass('closing-menu').removeClass('visible-menu');

			setTimeout(function() {
				$('body').removeClass('closing-menu');
			}, 500);

			e.preventDefault();
		})

		$('.show-app').on('click', function (e){
			$(this).parents('.article').addClass('showed');

			e.preventDefault();
		})

		$('.art-overlay').on('click', function (){
			$(this).parents('.article').removeClass('showed');
		})

		$('.tabs-nav a').on('click', function (e){
			var tab = $(this).attr('href');

			$(this).parent().addClass('current').siblings().removeClass('current');
			$('body').find(tab).addClass('current').siblings().removeClass('current');

			if ( $(this).parent().index() > 1 ) {
				$('.section-why').hide();
			} else {
				$('.section-why').show();
			};

			$('html, body').animate({
					scrollTop: $('body').find(tab).offset().top - parseInt($('.tabs-nav').css('z-index')) - 40}
			, 500);

			e.preventDefault();
		})

		$('.btn-scroll').on('click', function (e){
			var sectHeight = $('.j-scroll').offset().top;

			$('body, html').animate({
				scrollTop: sectHeight
			});
			
			e.preventDefault();
		})

		$('.btn-scroll').on('click', function (e){
			var sectHeight = $('.j-scroll').offset().top;

			$('body, html').animate({
				scrollTop: sectHeight
			});
			
			e.preventDefault();
		})

		$('.article-team a').on('click', function (e){
			$('.article-bio').empty();
			$('.articles-team').removeClass('visible');
			$('.article-team').removeClass('current');

			var $parent = $(this).parents('.article-team');
			var $wrapper = $parent.parents('.articles-team');
			var text = $parent.find('.article-intro').clone();

			$wrapper.parent().addClass('ex-visible');
			$parent.addClass('current');
			$wrapper.addClass('visible').find('.article-bio').append(text);

			e.preventDefault();
		})

		$doc.on('click', '.close-bio', function (e){
			$wrapper.parent().removeClass('ex-visible');
			$('.article-team').removeClass('current');
			$('.articles-team').removeClass('visible');
			$('.article-bio').empty();

			e.preventDefault();
		})

		$('.overlay-bio').on('click', function (){
			$('.section-body').removeClass('ex-visible');
			$('.article-team').removeClass('current');
			$('.articles-team').removeClass('visible');
			$('.article-bio').empty();
		})

		$('.popup-open').magnificPopup({
			type: "ajax",
			closeOnBg: false,
			closeOnContentClick: false,
			callbacks: {
				ajaxContentAdded: function() {
					$('.popup-close').on('click', function (e){
						$('.mfp-close').trigger('click');

						e.preventDefault();
					})
					
					$('.date-slider .slides').carouFredSel({
						auto: false,
						responsive: true,
						height: 'variable',
						swipe: {
							onTouch: true
						},
						scroll: {
							pauseOnHover: true
						},
						items: {
							height: 'variable'
						},
						prev: ".date-slider .slider-prev",
						next: ".date-slider .slider-next"
					});
				}
			}
		});

		function fixedNav(){

			if($('.skrollr').length) {
				return;
			};
			var $tabHead = $('.tabs-head');
			
			if ( !$('.tabs-head').length ) {
				return
			};

			// if ( $win.width() < 768 ) {
			// 	$('.section-tabs').removeClass('fixed');

			// 	$tabHead.css({
			// 		paddingBottom: 0
			// 	})

			// 	return;
			// };

			var tabHeadHeight = $tabHead.outerHeight();
			var tabHeadPadding = parseInt($tabHead.css('padding-top'));
			var tabHeadingHeight = $tabHead.find('h1').outerHeight();
			var tabBodyTop = $('.tabs-body').offset().top;
			var winScrl = $win.scrollTop();

			if ( winScrl >= ( tabBodyTop - 70 ) ) {
				$('.section-tabs').addClass('fixed');

				$tabHead.css({
					paddingBottom: tabHeadHeight - tabHeadPadding - tabHeadingHeight
				})
			} else {
				$('.section-tabs').removeClass('fixed');

				$tabHead.css({
					paddingBottom: 0
				})
			}
		}



		resetContainerWidths();


	});
})(jQuery, window, document);





var MiniUserDataEditor = (function() {

	function Editor(element, settings) {
		this.element = element;
		
		this.settings = settings;

		this.fields = this.collectFields();

		this.triggerElement = element.querySelector(this.settings.triggerSelector);

		this.edited = false;

		this.editing = false;

		this.valid = true;

		this.init();

	};

	Editor.prototype.init = function() {

		$(this.element).data('validator', this);

		this.bind();
	};

	Editor.prototype.bind = function() {
		var that = this;

		$(this.element).find(this.triggerElement).on('click', function(event) {
			event.preventDefault();

			that.startEdit();
		});

	};

	Editor.prototype.collectFields = function() {
		var that = this;
		var $fields = $(this.element).find(this.settings.fieldSelector);
		var fields = [];

		$fields.each(function() {
			var field = {
				element  : this,
				regex    : new RegExp(this.getAttribute('data-validation-regex') || '\\S+'),
				valid    : false,
				validate : function() {
					this.valid = this.regex.test(this.element.value);
				}
			};

			$(this).on('input change keyup', function() {
				field.validate();

				that.validate();
			});

			fields.push(field);
		});

		return fields;
	};

	Editor.prototype.validate = function() {

		var valid = true;

		for (var i = 0; i < this.fields.length; i++) {
			if(!this.fields[i].valid) {
				valid = false;
			};
		};

		this.valid = valid;

		$(this.element).toggleClass('valid-block', valid);
	};

	Editor.prototype.startEdit = function() {
		this.editing = true;

		this.edited = true;

		this.validate();

		$(this.element).addClass('edit-mode');
	};

	Editor.prototype.endEdit = function() {
		this.editing = false;

		$(this.element).remvoeClass('edit-mode');
	};

	return Editor;

})();