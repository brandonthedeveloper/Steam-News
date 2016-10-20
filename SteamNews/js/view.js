var $srcAry = new Array();
    $(document).ready(
        function() {
            // LOAD NAVIGATION SOURCES
            loadSources();
            // LOAD UP A DEFAULT NEWS SOURCE
            getSrcNews("src_0");
        }
    );

    function loadSources() {
        // GET THE NAV SOURCES FROM OUR ARRAY OF NEWSSRC CLASS IN THE PHP FILE
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "response.php",
            data:{"action":"getSrcList"},
            success: function(data) {
                // EMPTY HTML STRING
                var $navItems = "";
                $.each(data["json"], function(key, value) {
                    $navItems += "<div id='src_" + value.index + "' class='navItem'><a href='#'>" + value.name + "</a></div>"
                });
                // ADD HTML TO THE NAV CONTAINER
                $("#navContainer").append($navItems);
                // LOOP THROUGH THE ARRAY OF NAV ITEMS AND ADD THE CLICK EVENT TO LOAD THAT FEED
                $.each($(".navItem"), function(key, value) {
                    $(this).click(function(){
                        getSrcNews(value.id);
                    });
                });
                }, error:function(x,e) {
                    alert('Error.\nParsing JSON Request failed.');
                }
        });
        return false;
    }

    // GET THE NEWS FEED BASED ON THE NAV ID
    function getSrcNews($id) {
        $id = $id.split('_')[1];
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "response.php",
            // CALL THE GETNEWS METHOD IN THE PHP FILE TO GET THE FEED DATA
            data: {"action":"getNews", "srcID":$id},
            success: function(data) {
                // REMOVE ANY PREVIOUS DATA
                $(".newsItem").remove();
                $(".newsItemBody").remove();
                var $newsItems = "";
                var $retObj = $.parseJSON(data["json"]);
                // CREATE TITLE AND BODY ELEMENTS FOR EACH NEWS ITEM
                $.each($retObj, function(key, value) {
                    $.each(value.newsitems, function(key, value) {
                        $newsItems += "<div id='" + key + "' class='newsItem'>" + value.title + "</div>";
                        $newsItems += "<div class='newsItemBody'>" + value.contents + " <a href='" + value.url + "' target='_blank'> Read More</a></div>";
                    });
                })

                // APPEND TO THE NEWS CONTAINER
                $("#newsContainer").append($newsItems);

                // CREATE OUR
                var newsItemAry = $('.newsItem').toArray();

                // ADD CLICK EVENT TO ELEMENTS TO OPEN OR CLOSE TO SHOW CAR DETAILS
                $('.newsItem').click(function(data) {
                    var currTarget = $(newsItemAry[data.target.id]);

                    if ($(currTarget).next().is(':visible')) {
                        $(currTarget).next().hide(100, function() {});
                    }
                    else {
                        $(currTarget).next().toggle(100, function() {});
                    //    alert("VISIBLE : " + $(currTarget).next());
                    }

                    // COMPARE THE TARGET AND CURRENT KEY AND CLOSE IF NOT THE SAME
                    $.each(newsItemAry, function(key) {
                        if (key != data.target.id) {
                            $(newsItemAry[key]).next().hide(100, function() {});
                        }
                    });


                });

                }, error:function(x,e) {
                    alert('Error.\nParsing JSON Request failed.');
                }
        });
    }
