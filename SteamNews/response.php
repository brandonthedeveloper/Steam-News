<?php
    // CUSTOM CLASS
    class newsSrc {
        public $index;
        public $url;
        public $name;
    }

    $src1 = new newsSrc();
    $src1 -> index = 0;
    $src1 -> url = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=620&count=10&maxlength=300&format=json';
    $src1 -> name = 'Portal 2 News';

    $src2 = new newsSrc();
    $src2 -> index = 1;
    $src2 -> url = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=377160&count=10&maxlength=300&format=json';
    $src2 -> name = 'Fallout 4 News';

    $src3 = new newsSrc();
    $src3 -> index = 2;
    $src3 -> url = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=240760&count=10&maxlength=300&format=json';
    $src3 -> name = 'Wasteland 2 News';

    // CREATE ARRAY OF OBJECTS TO PASS BACK TO THE VIEW
    $urlAry = array($src1, $src2, $src3);

    // ACTION METHODS FOR CALLS FROM THE VIEW

    // GET NEWS FOR A FEED
    function getNews($id, $urlAry) {
        $url = $urlAry[$id]->url;
        $response = file_get_contents($url);
        $return = $_GET;
        $return["json"] = $response;
        echo json_encode($return);
    }

    // RETURN THE NEW SOURCE LIST
    function getSrcList($urlAry) {
        $return = $_GET;
        $return["json"] = $urlAry;
        echo json_encode($return);
    }

    if (isset($_GET["action"]) && !empty($_GET["action"])) {
        $action = $_GET["action"];
        switch($action) {
            case "getSrcList":
                getSrcList($urlAry);
                break;

            case "getNews":
                getNews($_GET["srcID"], $urlAry);
                break;

        }
    }


    function is_ajax() {
      return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

?>
