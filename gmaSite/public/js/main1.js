(function($) {

	var $window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
	breakpoints({
		xlarge: [ '1281px', '1680px' ],
		large: [ '981px', '1280px' ],
		medium: [ '737px', '980px' ],
		small: [ '481px', '736px' ],
		xsmall: [ null, '480px' ]
	});

	// Hack: Enable IE flexbox workarounds.
	if (browser.name === 'ie')
		$body.addClass('is-ie');

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Forms.
	// Hack: Activate non-input submits.
	$('form').on('click', '.submit', function(event) {
		event.stopPropagation();
		event.preventDefault();
		$(this).closest('form').submit();
	});

	// Sidebar.
	if ($sidebar.length > 0) {

		var $sidebar_a = $sidebar.find('a');

		$sidebar_a
			.addClass('scrolly')
			.on('click', function() {

				var $this = $(this),
					href = $this.attr('href');

				// Validate href to avoid malformed ID or script injection.
				if (!href || href.charAt(0) !== '#' || !/^#[a-zA-Z0-9\-_]+$/.test(href))
					return;

				// Deactivate all links.
				$sidebar_a.removeClass('active');

				// Activate link and lock it.
				$this
					.addClass('active')
					.addClass('active-locked');
			})
			.each(function() {

				var $this = $(this),
					id = $this.attr('href');

				// Validate href.
				if (!id || id.charAt(0) !== '#' || !/^#[a-zA-Z0-9\-_]+$/.test(id))
					return;

				var $section = $(id);

				if ($section.length < 1)
					return;

				// Scrollex.
				$section.scrollex({
					mode: 'middle',
					top: '-20vh',
					bottom: '-20vh',
					initialize: function() {
						$section.addClass('inactive');
					},
					enter: function() {
						$section.removeClass('inactive');

						if ($sidebar_a.filter('.active-locked').length === 0) {
							$sidebar_a.removeClass('active');
							$this.addClass('active');
						} else if ($this.hasClass('active-locked')) {
							$this.removeClass('active-locked');
						}
					}
				});
			});
	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000,
		offset: function() {
			if (breakpoints.active('<=large') && !breakpoints.active('<=small') && $sidebar.length > 0)
				return $sidebar.height();

			return 0;
		}
	});

	// Spotlights.
	$('.spotlights > section')
		.scrollex({
			mode: 'middle',
			top: '-10vh',
			bottom: '-10vh',
			initialize: function() {
				$(this).addClass('inactive');
			},
			enter: function() {
				$(this).removeClass('inactive');
			}
		})
		.each(function() {
			var $this = $(this),
				$image = $this.find('.image'),
				$img = $image.find('img'),
				x;

			// Assign background image safely from src.
			var src = $img.attr('src');
			if (src)
				$image.css('background-image', 'url(' + encodeURI(src) + ')');

			// Set background position.
			if (x = $img.data('position'))
				$image.css('background-position', x);

			// Hide <img>.
			$img.hide();
		});

	// Features.
	$('.features')
		.scrollex({
			mode: 'middle',
			top: '-20vh',
			bottom: '-20vh',
			initialize: function() {
				$(this).addClass('inactive');
			},
			enter: function() {
				$(this).removeClass('inactive');
			}
		});

})(jQuery);

// Set copyright year.
const yearElement = document.getElementById('year');
if (yearElement) {
	yearElement.textContent = new Date().getFullYear(); // use textContent instead of innerHTML
}
