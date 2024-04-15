<?php
                   
?>
               <!DOCTYPE html>
<html lang="de">
<head>
<meta http-equiv="Cache-Control" content="no-cache">
<meta charset="utf-8">
<meta name="author" content="Dipl.-Ing. Olaf Thiele">
<meta http-equiv="Reply-to" content="easyit.leipzig@gmail.com">
<meta name="description" content="">
<meta name="keywords" content="">
<title>resolve</title>
<link rel="stylesheet" type="text/css" href="library/css/main.css">
<link rel="stylesheet" type="text/css" href="library/css/kniffel.css">
</head>
<body>
<input type="button" id="resetInterval">
<input type="button" id="setInterval">
<script src="library/javascript/no_jquery.js"></script> 
<script src="library/javascript/easyit_helper_neu.js"></script> 
<script src="library/javascript/main.js"></script> 
<script src="library/javascript/DropResize.js"></script> 
<script src="library/javascript/DialogDR.js"></script> 
<script src="library/javascript/MessageDR.js"></script> 
<script src="library/javascript/Cube.js"></script> 
<script src="library/javascript/Deck.js"></script> 
<script src="library/javascript/Tricky.js"></script> 
<script src="library/javascript/init_tricky.js"></script> 
<script>
evaluate = function ( data ) {
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
    case "getValues":
        tricky.setNetResults( jsonobject.res );
        break;
    }
}
const showResults = function() {
    //console.log( this );
    let data = {};
    data.dVar = "tricky";
    data.command = "getValues";
    data.game = 1;
    data.player = 2;
    nj().fetchPostNew("library/php/ajax_tricky.php", data, evaluate );
}
let interval = window.setInterval( showResults, 1000);
nj( "#resetInterval" ).on( "click", function(){
    window.clearInterval( interval );
})
nj( "#setInterval" ).on( "click", function(){
    interval = window.setInterval( showResults, 1000);
})
( function(){
    init();
})()
</script> 
</body>
</html>
