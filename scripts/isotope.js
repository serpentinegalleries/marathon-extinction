	/* Activate jQuery Isotope */

	/*	var $container = $('#isotope-items');

	$container.imagesLoaded( function(){
	  $container.isotope({
		  itemSelector : '.item'
	  });
	});
	/*var $container = $('#isotope-items').isotope({
		  itemSelector : '.item'
		});*/

var $container = $('#isotope-items');

$(window).load(function(){
  $container.isotope({
	itemSelector : '.item'
  });
});

/* Filter function */
$('#filters').on( 'click', 'div', function() {
  var filterValue = $(this).attr('data-filter');
  $container.isotope({ filter: filterValue });
});

$(window).load(function(){
	$("#filters div").click(function() {
	    $('div').removeClass('active');
	    $(this).addClass("active");
	});
});