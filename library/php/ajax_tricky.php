<?php
session_start();
if( !isset( $_SESSION["user_id"])) $_SESSION["user_id"] = 1;
error_reporting( E_ALL ^E_NOTICE );
date_default_timezone_set('Europe/Berlin');
// fetch call to $_POST variables
$json = file_get_contents("php://input");
if (!empty($json)) {
    $data = json_decode($json, true);
    foreach ($data as $key => $value) {
        $_POST[$key] = $value;
    }
}
// end fetch
define( "ROOT", "../../"); 
//var_dump( $_POST );
foreach($_POST  as $key => $val ){
  
    // Accessing individual elements
    $i =  $key;
    $j = json_decode( $i );
    if( !is_null( $j ) ) {
        foreach( $j as  $key => $val ) {
            //if( is_numeric( $val ) ) continue;
            $_POST[$key] = $val;
        }        
    }
}

$return = new \stdClass();
$return -> command = $_POST["command"];
if( isset( $_POST["param"] ) ) {
    $return -> param = $_POST["param"];
}
$settings = parse_ini_file('../../ini/settings.ini', TRUE);

$dns = $settings['database']['type'] . 
            ':host=' . $settings['database']['host'] . 
            ((!empty($settings['database']['port'])) ? (';port=' . $settings['database']['port']) : '') . 
            ';dbname=' . $settings['database']['schema'];
try {
    $db_pdo = new \PDO( $dns, $settings['database']['username'], $settings['database']['password'], array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8') );
    $db_pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db_pdo -> setAttribute( PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false );
}
catch( \PDOException $e ) {
    $return -> command = "connect_error";
    $return -> message = $e->getMessage();
    print_r( json_encode( $return ));
    die;
}
require_once("functions.php"); 
require_once("classes/Tricky.php"); 
foreach ( $_POST as &$str) {
    //var_dump($str);
    $str = replaceUnwantetChars($str);
}
$tr = new \Tricky( $db_pdo );
switch( $_POST["command"]) {
    // start functions
    case "saveValues":
        $return -> dVar = $_POST["dVar"];
        $return -> cubes = $_POST["cubes"];
        $return -> res = $_POST["res"];
        $res = $tr -> setValues( $_POST["game"], $_POST["player"], json_decode( $_POST["cubes"] ), json_decode( $_POST["res"] ) );
        print_r( json_encode( $return )); 
    break;
    case "getValues":
        $return -> dVar = $_POST["dVar"];
        $return -> res = $tr -> getValues( $_POST["game"], $_POST["player"] ); 
        print_r( json_encode( $return )); 
    break;
}
?>
