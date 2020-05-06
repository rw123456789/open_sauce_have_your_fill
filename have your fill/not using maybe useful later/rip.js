$('.outbound-link').hover(function() {
	$("body").addClass("noCursor")
}, function() {
	$("body").removeClass("noCursor")
})

$('.farewell').mousedown(function(e) {
	e.stopPropagation()
	e.preventDefault()
})
