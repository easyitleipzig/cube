class Cube {
	constructor( setup ) {
		this.opt = {
			dVar:               "",
			addPraefix: 		"",
			class:				"",
			index:  			undefined,
		}
		Object.assign( this.opt, setup );
		let el = nj().cEl( "img" ), i;
		this.value = -1;
		this.isTop = false;
		el.id = this.opt.addPraefix + "cube_" + this.opt.index;
		nj( el ).atr( "src", "library/css/icons/cube_blau_" + this.shuffle() + ".png" );
		nj( el ).atr( "data-dvar", this.opt.dVar );
		if( this.isTop ) {
			nj( "#" + this.opt.addPraefix + "cubeAreaTop" ).aCh( el );
		} else {
			nj( "#" + this.opt.addPraefix + "cubeAreaBottom" ).aCh( el );
		}
		this.setBehavior();
	}
	setBehavior = function(e) {
		nj( "#" + this.opt.addPraefix + "cube_" + this.opt.index ).on( "click", function(e) {
			e.stopImmediatePropagation();
			if( nj( "#" + nj( this ).Dia().opt.addPraefix + "trialVal" ).htm() === "3" ) {
				dMNew.show({title: "Fehler", type: false, text: "Du musst erst würfeln."})
				return;	
			} 
			if( nj( this ).Dia().isTop ) {
				nj( "#" + nj( this ).Dia().opt.addPraefix + "cubeAreaBottom" ).aCh( this );
				nj( this ).Dia().isTop = false;
					let data = nj( this ).gRO().buildJSON( nj( this ).gRO().opt );
					console.log( data );
        			//nj().fetchPostNew("library/php/ajax_tricky.php", data, nj( this ).gRO().evaluateTricky );
				nj( "#" + this.id ).on( "click", function() {
					nj( "#" + nj( this ).Dia().opt.addPraefix + "cubeAreaTop" ).aCh( this );	
					nj( this ).Dia().isTop = true;
					nj( this ).Dia("dvar", 2 ).sortTopDeck();
					let data = nj( this ).gRO().buildJSON( nj( this ).gRO().opt );
					console.log( data );
        			//nj().fetchPostNew("library/php/ajax_tricky.php", data, nj( this ).gRO().evaluateTricky );
					nj( "#" + this.id ).on( "click", function(e) {
						e.stopImmediatePropagation();
						nj( "#" + nj( this ).Dia().opt.addPraefix + "cubeAreaBottom" ).aCh( this );	
						nj( this ).Dia().isTop = false;
					let data = nj( this ).gRO().buildJSON( nj( this ).gRO().opt );
					console.log( data );
        			//nj().fetchPostNew("library/php/ajax_tricky.php", data, nj( this ).gRO().evaluateTricky );
						nj( "#" + this.id ).on( "click", function() {
							nj( "#" + nj( this ).Dia().opt.addPraefix + "cubeAreaTop" ).aCh( this );	
							nj( this ).Dia().isTop = true;
					let data = nj( this ).gRO().buildJSON( nj( this ).gRO().opt );
					console.log( data );
        			//nj().fetchPostNew("library/php/ajax_tricky.php", data, nj( this ).gRO().evaluateTricky );
						});
					});
				});
			} else {
				nj( "#" + nj( this ).Dia().opt.addPraefix + "cubeAreaTop" ).aCh( this );
				nj( this ).Dia().isTop = true;
				nj( this ).Dia("dvar", 2 ).sortTopDeck();
					let data = nj( this ).gRO().buildJSON( nj( this ).gRO().opt );
					console.log( data );
        			//nj().fetchPostNew("library/php/ajax_tricky.php", data, nj( this ).gRO().evaluateTricky );
				nj( "#" + this.id ).on( "click", function(e) {
					e.stopImmediatePropagation();
					nj( "#" + nj( this ).Dia().opt.addPraefix + "cubeAreaBottom" ).aCh( this );	
					nj( this ).Dia().isTop = false;
					let data = nj( this ).gRO().buildJSON( nj( this ).gRO().opt );
					console.log( data );
        			//nj().fetchPostNew("library/php/ajax_tricky.php", data, nj( this ).gRO().evaluateTricky );
					nj( "#" + this.id ).on( "click", function() {
						nj( "#" + nj( this ).Dia().opt.addPraefix + "cubeAreaTop" ).aCh( this );	
						nj( this ).Dia().isTop = true;
					let data = nj( this ).gRO().buildJSON( nj( this ).gRO().opt );
					console.log( data );
        			//nj().fetchPostNew("library/php/ajax_tricky.php", data, nj( this ).gRO().evaluateTricky );
						nj( "#" + this.id ).on( "click", function(e) {
							e.stopImmediatePropagation();
							nj( "#" + nj( this ).Dia().opt.addPraefix + "cubeAreaBottom" ).aCh( this );	
							nj( this ).Dia().isTop = false;
					let data = nj( this ).gRO().buildJSON( nj( this ).gRO().opt );
					console.log( data );
        			//nj().fetchPostNew("library/php/ajax_tricky.php", data, nj( this ).gRO().evaluateTricky );
						});
					});
				});
			}
		});	
	}
	shuffle = function() {
		this.value = Math.ceil( Math.random() * 6 );
		return this.value;	
	}
	shuffleCube = function() {
		nj( "#" + this.opt.addPraefix + "cube_" + this.opt.index ).atr( "src", "library/css/icons/cube_blau_" + this.shuffle() + ".png" );
	}
	randomize = function() {
	}
	setValue = function( v ) {
		nj( this.opt.id ).atr( "src", "library/css/icons/cube_blau_" + v + ".png")
	}
	switchDeck = function( v ) {
		console.log( nj( this.opt.id ).Dia() );
	}
}