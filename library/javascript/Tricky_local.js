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
			multi:  			true,
			game:  				1,
			player:  			1,
			modal:  			false,
		}
		let el;
		this.oldResult = { trial: -1, line: -1, result: -1 };
		this.isReady = false;
		window.setInterval( this.checkIsReady, 500 );
		Object.assign( this.opt, setup );
		nj( "body" ).sDs( "game", this.opt.dVar );
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
				modal: this.opt.modal,
			});
		nj( "label[id^=" + this.opt.addPraefix + "res_]").on( "click", function() {
			nj( this ).Dia().setResult( getIdAndName( this.id ).Id );
		});
	}
    evaluateTricky = function ( data ) {
        // content
        let jsonobject, l, i, m, j, tmp, decVal, strVal;
        if( typeof data === "string" ) {
            jsonobject = JSON.parse( data );
        } else {
            jsonobject = data;
        }
        if( !nj().isJ( jsonobject ) ) {
            throw "kein JSON-Objekt übergeben";
        }
        console.log( jsonobject );
        var tricky = window[ jsonobject.dVar ];
        switch( jsonobject.command ) {
        case "isReady":
        		tricky.isReady = jsonobject.ready;
        	break;
        }
    }
    newGame = function() {
    	this.oldResult = { trial: -1, line: -1, result: -1 };
    	this.deck.cubes = [];
    	let l = 17;
    	let i = 0;
    	while ( i < l ) {
    		if( i === 6 || i === 7 || i === 15 || i === 16 ) {
    			nj( "#" + this.opt.addPraefix + "res_" + i ).htm( "0" );
    		}
    		i += 1;
    	}
    	nj( "#" + this.opt.addPraefix + "trialVal" ).htm(3);
    	nj( "#" + this.opt.addPraefix + "shuffle" ).sty( "display", "block");
    	nj( "#" + this.opt.addPraefix + "cubeAreaTop" ).htm("");
    	nj( "#" + this.opt.addPraefix + "cubeAreaBottom" ).htm("");
		l = 5;
		i = 0;
		while ( i < l ) {
			this.deck.cubes.push( new Cube({dVar: this.opt.dVar + ".deck.cubes." + i, index: i, addPraefix: this.opt.addPraefix } ) );
		//this.deck.cubes.setBehavior();
			i += 1;
		}
    }
    newThrow = function() {
    	this.oldResult = { trial: -1, line: -1, result: -1 };
    	this.deck.cubes = [];
    	nj( "#" + this.opt.addPraefix + "trialVal" ).htm(3);
    	nj( "#" + this.opt.addPraefix + "shuffle" ).sty( "display", "block");
    	nj( "#" + this.opt.addPraefix + "cubeAreaTop" ).htm("");
    	nj( "#" + this.opt.addPraefix + "cubeAreaBottom" ).htm("");
		let l = 5;
		let i = 0;
		while ( i < l ) {
			this.deck.cubes.push( new Cube({dVar: this.opt.dVar + ".deck.cubes." + i, index: i, addPraefix: this.opt.addPraefix } ) );
		//this.deck.cubes.setBehavior();
			i += 1;
		}
    }
    checkIsReady = function() {
    	let data = {};
    	data.command = "isReady";
    	data.dVar = nj().bDV( nj("body").ds( "game" ) ).opt.dVar;
    	data.game = nj().bDV( nj("body").ds( "game" ) ).opt.game;
		//nj().fetchPostNew("library/php/ajax_tricky.php", data, nj().bDV( nj("body").ds( "game" ) ).evaluateTricky );    
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
		return slots.filter ((obj) => obj.v === "&nbsp;");
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
	sumOverAll = function( line ) {
		els = nj().els( "#" + this.opt.addPraefix + "cubeAreaTop img");
		let l = els.length, tmp=[], sum = 0;
		let i = 0;
		while ( i < l ) {
			tmp.push("#" + els[i].id);
			i += 1;
		}
		l = tmp.length;
		i = 0;
		while ( i < l ) {
			sum += nj(tmp[i]).Dia().value;
			i += 1;
		}
		return sum;
	}
	buildTopSum = function() {
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
	buildBottomSum = function() {
		let els = nj().els("#" + this.opt.addPraefix + "res_8, #" + this.opt.addPraefix + "res_9, #" + this.opt.addPraefix + "res_10,#" + this.opt.addPraefix + "res_11, #" + this.opt.addPraefix + "res_12, #" + this.opt.addPraefix + "res_13, #" + this.opt.addPraefix + "res_14"), sum = 0;
		let l = els.length;
		let i = 0;
		while ( i < l ) {
			if( nj( els[i] ).htm() !== "&nbsp;" && nj( els[i] ).htm() !== "X") sum += parseInt( nj( els[i] ).htm() );
			i += 1;
		}
		nj( "#" + this.opt.addPraefix + "res_15" ).htm( sum )
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
		if( counts === "1,1,1,1,1,0" || counts === "0,1,1,1,1,1" ) {
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
		if( counts === "1,1,1,1,0,0" || counts === "0,1,1,1,1,0" || counts === "0,0,1,1,1,1") {
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
	setNetResults = function( data ) {
		nj( "#" + this.opt.dVar + ".dGameHLTitle").htm( data.name );
		nj( "#" + this.opt.addPraefix + "cubeAreaTop" ).htm("");
		nj( "#" + this.opt.addPraefix + "cubeAreaBottom" ).htm("");
		nj( "#" + this.opt.addPraefix + "shuffle, #" + this.opt.addPraefix + "forward, #" + this.opt.addPraefix + "trialVal" ).sty("display", "none");
		let l = data.top.length, el;
		let i = 0;
		while ( i < l ) {
			el = nj().cEl( "img" ), i;
			el.id = this.opt.addPraefix + "cube_" + this.opt.index;
			nj( el ).atr( "src", "library/css/icons/cube_blau_" + data.top[i].val + ".png" );
			//nj( el ).atr( "data-dvar", this.opt.dVar );
				nj( "#" + this.opt.addPraefix + "cubeAreaTop" ).aCh( el );			
			i += 1;
		}
		l = data.bottom.length;
		i = 0;
		while ( i < l ) {
			el = nj().cEl( "img" ), i;
			el.id = this.opt.addPraefix + "cube_" + this.opt.index;
			nj( el ).atr( "src", "library/css/icons/cube_blau_" + data.bottom[i].val + ".png" );
			//nj( el ).atr( "data-dvar", this.opt.dVar );
				nj( "#" + this.opt.addPraefix + "cubeAreaBottom" ).aCh( el );			
			i += 1;
		}
		l = data.results.length;
		i = 0;
		while ( i < l ) {
			nj( "#" + this.opt.addPraefix + "res_" + i ).htm( data.results[i].val );			
			i += 1;
		}
	}
	setResult = function( line ) {
		console.log( this.oldResult.trial == nj( "#" + this.opt.addPraefix + "trialVal" ).htm(), this.oldResult );
		let cubes = nj().fOA( this.deck.cubes, "isTop", true), res, oldRes = nj( "#" + this.opt.addPraefix + "res_" + line ).htm();
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
			if( res === 0 ) res = "X";
			break;
		case "2":
			res = nj().fOA( cubes, "value", 3 ).length * 3;
			if( res === 0 ) res = "X";
			break;
		case "3":
			res = nj().fOA( cubes, "value", 4 ).length * 4;
			if( res === 0 ) res = "X";
			break;
		case "4":
			res = nj().fOA( cubes, "value", 5 ).length * 5;
			if( res === 0 ) res = "X";
			break;
		case "5":
			res = nj().fOA( cubes, "value", 6 ).length * 6;
			if( res === 0 ) res = "X";
			break;
		case "8":
			res = this.getCountValues( cubes, 3 );
			if( res > 0 ) {
				res = this.sumOverAll();
			}
			break;
		case "9":
			res = this.getCountValues( cubes, 4 );
			if( res > 0 ) {
				res = this.sumOverAll();
			}
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
			res = this.sumOverAll();
			break;
		default:
			break;
		}
		nj( "#" + this.opt.addPraefix + "res_" + line ).htm( res );
		if( line < 6 ) {
			this.buildTopSum();
		}
		if( line > 7 ) {
			this.buildBottomSum();
		}
		let all = parseInt( nj( "#" + this.opt.addPraefix + "res_7" ).htm() ) + parseInt( nj( "#" + this.opt.addPraefix + "res_15" ).htm() );
		nj( "#" + this.opt.addPraefix + "res_16" ).htm( all );
		if( this.oldResult.trial == nj( "#" + this.opt.addPraefix + "trialVal" ).htm() ) {
			nj( "#" + this.opt.addPraefix + "res_" + this.oldResult.line ).htm( this.oldResult.result );			
		}
		if( this.getFreeSlots().length === 0 ) {
			dMNew.show( { title: "Spielende", type: true, text: "Das Spiel ist beendet. Du hast " + all + " Punkte erreicht.", variables: { tricky: this }, buttons:[
					{
						title: "Neues Spiel",
						action: function() {
							dMNew.hide();
							nj( this ).Dia().opt.variables.tricky.newGame();
						}
					},
					{
						title: "Beenden",
						action: function() {
							location.assign( "intern.php");
						}
					}
				] } );
		}
		this.oldResult = {trial: nj( "#" + this.opt.addPraefix + "trialVal" ).htm(), line: line, result: oldRes }
	}
	buildJSON = function( opt ) {
		let data = {};
		data.res = {};
		data.command = "saveValues";
		let cTop = nj().els( "#" + opt.addPraefix + "cubeAreaTop img" );
		let cBot = nj().els( "#" + opt.addPraefix + "cubeAreaBottom img" );
		let cTopV = [];
		let cBotV = [];
		let cResV = [];
		let l = cTop.length;
		let i = 0;
		while ( i < l ) {
			cTopV.push( nj().bDV( nj(cTop[i]).ds("dvar") ).value );
			i += 1;
		}
		l = cBot.length;
		i = 0;
		while ( i < l ) {
			cBotV.push( nj().bDV( nj(cBot[i]).ds("dvar") ).value );
			i += 1;
		}
		let cRes = nj().els( "label[id^=" + opt.addPraefix + "res_]" );
		l = cRes.length;
		i = 0;
		while ( i < l ) {
			cResV.push( nj(cRes[i]).htm() );
			i += 1;
		}
		data.dVar = opt.dVar;
		data.game = opt.game;
		data.player = opt.player;
		let cubes = {top:cTopV,bottom:cBotV};
		let results = {result:cResV};
		data.cubes = JSON.stringify( cubes );
		data.res = JSON.stringify( results );
		return data;
	}
	forward = function( el ) {
		if( JSON.stringify( this.oldResult ) === '{"trial":-1,"line":-1,"result":-1}' ) {
			dMNew.show( { title: "Fehler", type: false, text: "Du musst erst ein Ergebnis anklicken." } );
			return;
		}
		if( this.opt.multi ) {
			dMNew.show( {title: "Weitergeben", type: "question", text: "Willst Du das Spiel wirklich an den nächsten Spieler weitergeben?", variables: {tricky: this }, buttons: [
					{
						title: "Ja",
						action: function( e ) {
							let data = nj( e.target ).Dia().opt.variables.tricky.buildJSON( nj( e.target ).Dia().opt.variables.tricky.opt );
	        				//nj().fetchPostNew("library/php/ajax_tricky.php", data, nj( e.target ).Dia().opt.variables.tricky.evaluateTricky );
						}
					},
					{
						title: "Nein",
						action: function( e ) {
							dMNew.hide();
						}
					}
				] } );
		} else {
			this.newThrow();
		}

	}
}