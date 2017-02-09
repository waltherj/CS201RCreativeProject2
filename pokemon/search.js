var locations = [];


$(function(){
	for(let i = 0; i < 10; i++) {
        locations = document.getElementsByClassName('crate');
		if (i < 1)
			createHidingSpots(true);
		else
			createHidingSpots(false);
	}

    $( ".miss" ).click(function() {
        $(this).remove();
    });
    $( ".hit" ).click(function() {
        var div = $(this);
        div.addClass('poke');
        div.removeClass('crate');
        var pos = div.position();
        var pokemon = getPokemon(div);
        // $(this).css('background-image',`url(${pokemon.sprite})`);
    });
});

function createHidingSpots(poke) {
	let div = document.createElement('div');
	if (poke)
		div.className += 'crate hit';
	else 
		div.className += 'crate miss';
	generateLocation(div);
	$('#map').append(div);
}

function generateLocation(el) {
    $(el).css({
		"top": Math.floor(Math.random() * ($('#map').height() - 350)) +300,
		"left": Math.floor(Math.random() * ($('#map').width() - 50))
	});
	if (!inLocation(el)) {
		return;
	}
	generateLocation(el);
};

function inLocation(div) {
	for(let i = 0; i < locations.length; i++) {
        // console.log('trying to get new');
        var p2 = getPositions(div);
        // console.log('trying to get old');
        var p1 = getPositions(locations[i]);
        if (comparePositions(p1,p2))
            return true;
    }
    return false;	
}

function getPositions( elem ) {
    var pos, width, height;
    pos = $( elem ).position();
    width = $( elem ).width();
    height = $( elem ).height();
    return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
}

function comparePositions( p1, p2 ) {
    var r1, r2;
    r1 = p1[0] < p2[0] ? p1 : p2;
    r2 = p1[0] < p2[0] ? p2 : p1;
    return r1[1] > r2[0] || r1[0] === r2[0];
}
function getPokemon(div) {
    var num = Math.floor(Math.random() * 721)
    console.log(num);
    var url = `http://pokeapi.co/api/v2/pokemon/${num}`;
    console.log(url);
    $.get( url , function( data ) {
        console.log('success');
    })
    .done(function(data){
        var poke = {};
        poke.name = data.forms[0].name;
        poke.sprite = data.sprites.front_default;
        div.css('background-image',`url(${poke.sprite})`);
        animateDiv();       
    })

}


/*
        ANIMATION
*/

function newAni() {
    //Create
    

    //Append
    $(".animatedDivs").append($div);

    //Animate
    animateDiv();    

    function animateDiv(){
        //same code with $('.a') replaced by $div
    };

}

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $('#map').height() - 50;
    var w = $('#map').width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $('.poke').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('.poke').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
    
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}