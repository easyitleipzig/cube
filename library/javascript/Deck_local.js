const DIV_DECK_HTML = `<div id="[praefix]Top">
	<div id="[praefix]cubeAreaTop"></div>
</div>
<div id="[praefix]Bottom">
	<div id="[praefix]cubeAreaBottom"></div>
	<div id="[praefix]ctrlArea">
		<input type="button" id="[praefix]shuffle">
		<input type="button" id="[praefix]forward">
	</div>
	<div id="[praefix]trials"><label id="[praefix]trialVal" style="color: red" title="Anzahl Versuche">3</label></div>
</div>
`;
class Deck {
	constructor( setup ) {
		this.opt = {
			dVar:               "",
			target:  			"",
			class:				"",
			addPraefix:  		"",
			countCubes:  		5,
		}
		this.cubes = [];
		Object.assign( this.opt, setup );
		let l = this.opt.countCubes, el;
		el = nj().cEl( "div" );
		el.id = this.opt.addPraefix + "deck";
		nj( el ).atr( "data-dvar", this.opt.dVar );
		nj( el ).htm( DIV_DECK_HTML.replaceAll( "[praefix]", this.opt.addPraefix ).replaceAll( "[dvar]", this.opt.dVar ) );
		nj( this.opt.target ).aCh( el );
		this.top = { isTop: true };
		this.bottom = {isTop: false };
		let i = 0;
		while ( i < l ) {
			this.cubes.push( new Cube({dVar: this.opt.dVar + ".cubes." + i, index: i, addPraefix: this.opt.addPraefix } ) );
			i += 1;
		}
		nj( "#" + this.opt.addPraefix + "shuffle").on( "click", function() {
			let els = nj().els( "#" + nj(this).Dia("dvar").opt.addPraefix + "cubeAreaBottom img" ), valTrial = parseInt( nj( "#" + nj( this ).Dia().opt.addPraefix + "trialVal").htm() );
			let l = els.length;
			let i = 0;
			while ( i < l ) {
				nj( els[i] ).Dia().shuffleCube();
				i += 1;
			}
			if( --valTrial === 0 ) {
				nj( "#" + nj( this ).Dia().opt.addPraefix + "trialVal").htm( valTrial );
				nj( "#" + nj( this ).Dia().opt.addPraefix + "shuffle").sty( "display", "none" );
			} else {
				nj( "#" + nj( this ).Dia().opt.addPraefix + "trialVal").htm( valTrial );
			}
		});	
		nj( "#" + this.opt.addPraefix + "forward").on( "click", function() {
			nj(this).gRO().forward( this );
		});	
	}
	sortTopDeck = function() {
		let arr = nj().els( "#" + this.opt.addPraefix + "cubeAreaTop img" );
		let l = arr.length;
		let i = 0, cArr = [], el;
		while ( i < l ) {
			cArr.push( nj(arr[i]).Dia())
			i += 1;
		}
		cArr.sort( ( a, b ) => a.value - b.value );
		l = cArr.length;
		if( cArr.length > 0 ) {
			nj( "#" + this.opt.addPraefix + "cubeAreaTop" ).htm( "" );
			i = 0;
			while ( i < l ) {
				el = nj().cEl( "img" );
				el.id = this.opt.addPraefix + "cube_" + cArr[i].opt.index;
				nj( el ).atr( "data-dvar", cArr[i].opt.dVar );
				nj( el ).atr( "src", "library/css/icons/cube_blau_" + cArr[i].value + ".png" );
				nj( "#" + this.opt.addPraefix + "cubeAreaTop" ).aCh( el );
				nj().bDV( cArr[i].opt.dVar ).setBehavior();
				i += 1;
			}
		}
		//nj( "#" + this.opt.addPraefix + "cubeAreaTop" ).aCh( this );
		//this.cubes
	}
	shuffleDeck = function() {
		let cubes = nj().els( "img[id^=" + this.opt.addPraefix + "cube_" );
	}
}