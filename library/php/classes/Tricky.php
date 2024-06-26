<?php
class Tricky {
    private $pdo;
    public function __construct( $pdo ) {
        $this -> pdo = $pdo;
    }
    public function newMove( $id, $player ) {
        $result = new \stdClass();
        try {            
            $q = "UPDATE `game` SET `current_player` = $player, `current_move` = (SELECT MAX(current_move) + 1 FROM game) WHERE `game`.`id` = $id";
            $this -> pdo -> query( $q );
            $q = "select current_move FROM game WHERE id = $id";
            $s = $this -> pdo -> query( $q );
            $r = $s -> fetchAll( PDO::FETCH_ASSOC );
            return $r[0]["current_move"];
        } catch( Exception $e ) {
            return false;
        }
    }    
    public function setValues( $id, $player, $cubes, $results ) {
        $q = "delete from game_move where game_id = $id";
        $this -> pdo -> query( $q );
        $move = $this -> newMove( $id, $player );
        $q = "select player_id from game_player where game_id = $id";
        $s = $this -> pdo -> query( $q );
        $r = $s -> fetchAll( PDO::FETCH_ASSOC );
        $l = count( $r );
        $i = 0;
        while( $i < $l ) {
            $q = "UPDATE `game_move_isread` SET `move_id` = $move, `is_read` = false WHERE game_id = $id and player_id = " . $r[$i]["player_id"];
            $this -> pdo -> query( $q );
            $i += 1;
        }
        $l = count( $cubes -> top );
        $i = 0;
        while( $i < $l ) {
            $q = "INSERT INTO `game_move` (`game_id`, `type`, `val`) VALUES ($id, '0', '" . $cubes -> top[$i] . "')";
            $this -> pdo -> query( $q );
            $i += 1;
        }
        $l = count( $cubes -> bottom );
        $i = 0;
        while( $i < $l ) {
            $q = "INSERT INTO `game_move` (`game_id`, `type`, `val`) VALUES ($id, '1', '" . $cubes -> bottom[$i] . "')";
            $this -> pdo -> query( $q );
            $i += 1;
        }
        $l = count( $results -> result );
        $i = 0;
        while( $i < $l ) {
            $q = "INSERT INTO `game_move` (`game_id`, `type`, `val`) VALUES ($id, '2', '" . $results -> result[$i] . "')";
            $this -> pdo -> query( $q );
            $i += 1;
        }
        
    }
    public function getValues( $id, $player ) {
        $result = new \stdClass();
        $q = "select current_move from game where id = $id";
        $s = $this -> pdo -> query( $q );
        $r = $s -> fetchAll( PDO::FETCH_ASSOC );
        $cMove = $r[0]["current_move"];
        $q = "select val from game_move where game_id = $id and type = 0";
        $s = $this -> pdo -> query( $q );
        $r = $s -> fetchAll( PDO::FETCH_ASSOC );
        $result -> top = $r;
        $q = "select val from game_move where game_id = $id and type = 1";
        $s = $this -> pdo -> query( $q );
        $r = $s -> fetchAll( PDO::FETCH_ASSOC );
        $result -> bottom = $r;
        $q = "select val from game_move where game_id = $id and type = 2";
        $s = $this -> pdo -> query( $q );
        $r = $s -> fetchAll( PDO::FETCH_ASSOC );
        $result -> results = $r;
        $q = "UPDATE `game_move_isread` SET `is_read` = '1', move_id = $cMove WHERE game_id = $id and player_id = $player";
        $this -> pdo -> query( $q );
        $q = "select firstname from user, game_player where user.id = game_player.player_id and game_player.id = $player and game_id = $id";
        $s = $this -> pdo -> query( $q );
        $r = $s -> fetchAll( PDO::FETCH_ASSOC );
        $result -> name = $r[0]["firstname"];
        return $result;
    }
    public function isReady( $id ) {
        $result = new \stdClass();
        $q = "select current_move from game where id = $id";
        $s = $this -> pdo -> query( $q );
        $r = $s -> fetchAll( PDO::FETCH_ASSOC );
        $q = "select count( is_read ) as is_read from game_move_isread where game_id = $id and move_id = " . $r[0]["current_move"] . " and is_read = false";
        $s = $this -> pdo -> query( $q );
        $r = $s -> fetchAll( PDO::FETCH_ASSOC );
        if( $r[0]["is_read"] > 0 ) {
            $result -> isRead = false;
        } else {
            $result -> isRead = true;
        }        
        return $result;
    }
    public function getNextPlayer( $id ) {
        $result = new \stdClass();
        $q = "select max( current_player ) as maxPlayer from game where id = $id";
        $s = $this -> pdo -> query( $q );
        $r = $s -> fetchAll( PDO::FETCH_ASSOC );
        $maxPlayer = $r[0]["maxPlayer"];
        $q = "select current_player from game where id = $id";
        $s = $this -> pdo -> query( $q );
        $r = $s -> fetchAll( PDO::FETCH_ASSOC );
        $cPlayer = $r[0]["current_player"];
        if( $maxPlayer === $cPlayer ) {
            return 1;
        } else {
            return $cPlayer + 1;
        }
    }
}
?>
