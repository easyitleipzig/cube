const DIV_RESULTS = `<div id="row_0"><label>Einer</label><label>&nbsp;</label><label id="[prae]res_0">&nbsp;</label></div>
	<div id="row_1"><label>Zweier</label><label>&nbsp;</label><label id="[prae]res_1">&nbsp;</label></div>
	<div id="row_2"><label>Dreier</label><label>&nbsp;</label><label id="[prae]res_2">&nbsp;</label></div>
	<div id="row_3"><label>Vierer</label><label>&nbsp;</label><label id="[prae]res_3">&nbsp;</label></div>
	<div id="row_4"><label>Fünfer</label><label>&nbsp;</label><label id="[prae]res_4">&nbsp;</label></div>
	<div id="row_5"><label>Sechser</label><label>&nbsp;</label><label id="[prae]res_5">&nbsp;</label></div>
	<div id="row_6"><label>Prämie</label><label>mehr als 63</label><label id="[prae]res_6">0</label></div>
	<div id="row_7"><label>gesamt oben</label><label>&nbsp;</label><label id="[prae]res_7">0</label></div>
	<div id="row_8"><label>Dreierpasch</label><label>&nbsp;</label><label id="[prae]res_8">&nbsp;</label></div>
	<div id="row_9"><label>Viererpasch</label><label>&nbsp;</label><label id="[prae]res_9">&nbsp;</label></div>
	<div id="row_10"><label>Full House</label><label>25</label><label id="[prae]res_10">&nbsp;</label></div>
	<div id="row_11"><label>Kleine Straße</label><label>30</label><label id="[prae]res_11">&nbsp;</label></div>
	<div id="row_12"><label>Große Straße</label><label>40</label><label id="[prae]res_12">&nbsp;</label></div>
	<div id="row_13"><label>Kniffel</label><label>50</label><label id="[prae]res_13">&nbsp;</label></div>
	<div id="row_14"><label>Chance</label><label>&nbsp;</label><label id="[prae]res_14">&nbsp;</label></div>
	<div id="row_15"><label>gesamt unten</label><label>&nbsp;</label><label id="[prae]res_15">0</label></div>
	<div id="row_16"><label>gesamt</label><label>&nbsp;</label><label id="[prae]res_16">0</label></div>`;
const difficulty = [
	1,
	1,
	1,
	1,
	1,
	1,
	false,
	false,
	2,
	3,
	2,
	3,
	4,
	4,
	0
	]
class Tricky {
	constructor( setup ) {
		this.opt = {
			dVar:               "",
			id: 				"",
			addPraefix:  		"tr_",
			class:				"",
			target: 			document.body,
			countCubes:  		5,
		}
		let el;
		this.oldResult = { line: -1, result: -1 };
		Object.assign( this.opt, setup );
		el = nj().cEl( "div" );
		if( this.opt.id === "" ) this.opt.id = "#" + this.opt.dVar;
		el.id = this.opt.id.substring( 1 );
		nj( el ).atr( "data-dvar", this.opt.dVar );
		nj( this.opt.target ).aCh( el );
		this.deck = new Deck( {dVar: this.opt.dVar + ".deck", addPraefix: this.opt.addPraefix, target: this.opt.id } );
		el = nj().cEl( "div" );
		el.id = this.opt.addPraefix + "results";
		nj( el ).htm( DIV_RESULTS.replaceAll( "[prae]", this.opt.addPraefix ) );
		nj( this.opt.id ).aCh( el );
		this.dGame = new DialogDR( 
			{
				dVar: this.opt.dVar + ".dGame", 
				id: this.opt.id,
				width: 280, 
				height: 400,
				autoOpen: true,
				hasHelp: true,
			});
		nj( "label[id^=" + this.opt.addPraefix + "res_]").on( "click", function() {
			nj( this ).Dia().setResult( getIdAndName( this.id ).Id );
		});
	}
	checkEmpty = function( v ) {
		return v == "&nbsp;"
	}
	checkDiffNumber = function( v ) {
		return 5 - nj().fOA( this.deck.cubes, "value", v ).length;
	}
	checkDiffPasch = function() {
		let res = [];
		let l = 6;
		let i = 0;
		while ( i < l ) {
			res.push( {v: i + 1, c: nj().fOA( this.deck.cubes, "value", i + 1 ).length } );
			i += 1;
		}
		return res;
	}
	checkDiffFullHouse = function() {
		let res = [];
		let l = 6;
		let i = 0;
		while ( i < l ) {
			res.push( {v: i + 1, c: nj().fOA( this.deck.cubes, "value", i + 1 ).length } );
			i += 1;
		}
		return res;
	}
	getFreeSlots = function() {
		let els = nj().els( "label[id^=" + this.opt.addPraefix + "res_]" ), slots = [];
		let l = els.length;
		let i = 0;
		let diff;
		while ( i < l ) {
			if(i<6) {
				diff = this.checkDiffNumber(i + 1);	
			} else {
				diff = 0;
			}
			slots.push( { i: i, v: nj( els[i] ).htm(), d: difficulty[i], diff: diff }  )
			i += 1;
		}
		console.log( slots, slots.filter ((obj) => obj.v === "&nbsp;") );

	}
	getCounts = function( cubes ) {
		let l = 7, counts = [];
		let i = 1;
		while ( i < l ) {
			counts.push( nj().fOA( cubes, "value", i ).length )
			i += 1;
		}
		return counts;
	}
	buildTopSum = function( cubes ) {
		let els = nj().els("#" + this.opt.addPraefix + "res_0, #" + this.opt.addPraefix + "res_1, #" + this.opt.addPraefix + "res_2,#" + this.opt.addPraefix + "res_3, #" + this.opt.addPraefix + "res_4, #" + this.opt.addPraefix + "res_5"), sum = 0, add = 0;
		let l = 6
		let i = 0;
		while ( i < l ) {
			if( nj( els[i] ).htm() !== "&nbsp;" && nj( els[i] ).htm() !== "X") sum += parseInt( nj( els[i] ).htm() );
			i += 1;
		}
		if( sum > 62 ) {
			nj( "#" + this.opt.addPraefix + "res_6" ).htm( 35 )
			add = 35;
		}
		nj( "#" + this.opt.addPraefix + "res_7" ).htm( sum + add )
	}
	getCountValues = function( cubes, minCount ) {
		let counts = this.getCounts( cubes );
		let l = 6;
		let i = 0;
		while ( i < l ) {
			if( counts[i] >= minCount ) return counts[i] * ( i + 1 );
			i += 1;
		}
		return "X";
	}
	checkFullHouse = function( cubes ) {
		let counts = this.getCounts( cubes );
		if( counts.indexOf( 2 ) > - 1 && counts.indexOf( 3 ) > - 1 ) {
			return 25;
		} else {
			return "X";
		}
	}
	checkBigStreet = function( cubes ) {
		let counts = this.getCounts( cubes );
		counts = counts.toString();
		if( counts === "1,1,1,1,1,1" ) {
			return 40;
		} else { 
			return "X"
		}
	}
	checkSmallStreet = function( cubes ) {
		let counts = this.getCounts( cubes );
		let l = counts.length;
		let i = 0;
		while ( i < l ) {
			//if( counts[i] > 1 ) counts[i] = 1;
			i += 1;
		}
		counts = counts.toString();
		console.log( counts );
		if( counts === "0,1,1,1,1,1" || counts === "1,1,1,1,1,0") {
			return 30;
		} else { 
			return "X"
		}
	}
	checkTricky = function( cubes ) {
		let counts = this.getCounts( cubes );
		counts = counts.toString();
		if( counts === "5,0,0,0,0,0" || counts === "0,5,0,0,0,0" || counts === "0,0,5,0,0,0" || counts === "0,0,0,5,0,0" || counts === "0,0,0,0,5,0" || counts === "0,0,0,0,0,5" ) {
			return 50;
		} else { 
			return "X"
		}
	}
	getChance = function( cubes ) {
		let counts = this.getCounts( cubes );
		let l = counts.length, chance = 0;
		let i = 0;
		while ( i < l ) {
			chance += counts[i] * ( i + 1 );
			i += 1;
		}
		return chance;
	}
	setResult = function( line ) {
		let cubes = nj().fOA( this.deck.cubes, "isTop", true), res;
		if( cubes.length === 0 ) {
			dMNew.show( {title: "Fehler", type: false, text: "Du musst mindestens einen Würfel im oberen Deck haben."} );
			return;
		}
		switch( line ) {
		case "0":
			res = nj().fOA( cubes, "value", 1 ).length * 1;
			if( res === 0 ) res = "X";
			break;
		case "1":
			res = nj().fOA( cubes, "value", 2 ).length * 2;
			break;
		case "2":
			res = nj().fOA( cubes, "value", 3 ).length * 3;
			break;
		case "3":
			res = nj().fOA( cubes, "value", 4 ).length * 4;
			break;
		case "4":
			res = nj().fOA( cubes, "value", 5 ).length * 5;
			break;
		case "5":
			res = nj().fOA( cubes, "value", 6 ).length * 6;
			break;
		case "8":
			res = this.getCountValues( cubes, 3 );
			break;
		case "9":
			res = this.getCountValues( cubes, 4 );
			break;
		case "10":
			res = this.checkFullHouse( cubes );
			break;
		case "11":
			res = this.checkSmallStreet( cubes );
			break;
		case "12":
			res = this.checkBigStreet( cubes );
			break;
		case "13":
			res = this.checkTricky( cubes );
			break;
		case "14":
			res = this.getChance( cubes );
			break;
		default:
			break;
		}
		nj( "#" + this.opt.addPraefix + "res_" + line ).htm( res );
		if( line < 6 ) {
			this.buildTopSum();
		}
		//nj( "#" + this.opt.addPraefix + "trialVal" ).htm( nj( "#" + this.opt.addPraefix + "trialVal" ).htm() - 1 )
		//nj( "#" + this.opt.addPraefix + "cubeAreaTop" ).htm("");
		this.oldResult = { line: line, result: res }
	}
	forward = function( el ) {
		console.log( JSON.stringify( this.oldResult ) );
		if( JSON.stringify( this.oldResult ) === '{"line":-1,"result":-1}' ) {
			dMNew.show( { title: "Fehler", type: false, text: "Du musst erst ein Ergebnis anklicken." } );
			return;
		}
		dMNew.show( {title: "Weitergeben", type: "question", text: "Willst Du das Spiel wirklich an den nächsten Spieler weitergeben?", buttons: [
				{
					title: "Ja",
					action: function( e ) {
						console.log( nj( e.target ).Dia() );
					}
				}
			] } );
	}
}