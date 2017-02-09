var locations = [];
$(function(){
	for(let i = 0; i < 10; i++) {
		if (i < 5)
			createHidingSpots(true);
		else
			createHidingSpots(false);
	}
});

function createHidingSpots(poke) {
	var loc = generateLocation();
	let div = document.createElement('div');
	if (poke)
		div.className += 'crate hit';
	else 
		div.className += 'crate miss';
	giveLocation(div,loc);
	$('#map').append(div);
}

function giveLocation(e, loc) {
	$(e).css({
		"top": loc.top,
		"left": loc.left
	});
}

function generateLocation() {
	var randomtop = Math.floor(Math.random() * ($('#map').height() - 250)) +200;
	var randomleft = Math.floor(Math.random() * ($('#map').width() - 50));
	if (!inLocation(randomtop,randomleft)) {
		locations.push({top:randomtop,left:randomleft});
		return {top:randomtop,left:randomleft};
	}
	generateNum();
};

function inLocation(top, left) {
	for(loc in locations) {
    	if((top <= loc.top && top >= loc.top - 50) && (left <= loc.left && left >= loc.left - 50))
			return true;
		else if((top <= loc.top && top >= loc.top - 50) && (left >= loc.left && left <= loc.left + 50))
			return true;
		else if((top >= loc.top && top <= loc.top + 50) && (left <= loc.left && left >= loc.left - 50))
			return true;
		else if((top >= loc.top && top <= loc.top + 50) && (left >= loc.left && left <= loc.left + 50))
			return true;
	}
   return false;
}
