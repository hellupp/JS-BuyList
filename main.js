var LIST = $('.bl-row');
var ITEM_TEMPLATE = $('.hidden-template').html();

$(document).ready(function () {
    $("#input-search").bind('keypress', function (e) {
        if (e.keyCode === 13) {
            addItem($("#input-search").val());
            $("#input-search").val('').focus();
        }
    })
    $(".bl-search-button").click(function (name) {
        addItem($("#input-search").val());
        $("#input-search").val('').focus();
    })

    $(".product-plus").click(function () {
        increaseAmount();
    })
    $(".product-minus").click(function () {
        decreaseAmount();
    })

    $(".product-bought-button").click(function () {
        buyProduct();
    })
    $(".product-unbuy-button").click(function () {
        unbuyProduct();
    })

    $(".product-cross").click(function () {
        $(ITEM_TEMPLATE).remove();
    })

    $(".product-name").click(function () {
        $(this).hide();
        $(".input-name-edit").css("display", "inline-block");
    })

    function addItem(title) {
        var node = $(ITEM_TEMPLATE);	//Create new HTML node
        node.find(".product-name").text(title);	//Set product title
        //Delete Action
        node.find(".product-cross").click(function () {
            node.remove();
        });
        node.find(".product-minus").click(function () {
            decreaseAmount();
        });
        node.find(".product-plus").click(function () {
            increaseAmount();
        });
        node.find(".product-bought-button").click(function () {
            buyProduct();
        })
        node.find(".product-unbuy-button").click(function () {
            unbuyProduct();
        })
        LIST.append(node);	//Add to the end of the list
    }

    function buyProduct() {
        $(".product-name").hide();
        $(".product-name-crossed").css("display", "inline-block");
        $(".product-unbuy-button").css("display", "inline-block");
        $(".product-bought-button").hide();
        $(".product-cross").hide();
        $(".product-minus").hide();
        $(".product-plus").hide();
        $(".tooltip-text").hide();
        $(".product-unbuy-button").hover(function () {
            $(".tooltip-text-hidden").css("visibility", "visible");
            $(".tooltip-text-hidden").css("opacity", "1");
        }, function () {
            $(".tooltip-text-hidden").css("opacity", "0.6");
        })
    }

    function unbuyProduct() {
        $(".product-name-crossed").hide();
        $(".product-name").css("display", "inline-block");
        $(".product-bought-button").css("display", "inline-block");
        $(".product-unbuy-button").hide();
        $(".product-cross").css("display", "inline-block");
        $(".product-minus").css("display", "inline-block");
        $(".product-plus").css("display", "inline-block");
    }

    function decreaseAmount() {
        var content =  parseInt($(".product-count-label").html());
        content -= 1;
        if (content <= 1) {
            $(".product-count-label").html(1);
            $(".product-minus").css("cursor", "");
            $(".product-minus").css("opacity", "0.6");
            $(".product-minus").css("transition-duration", "0");
            $(".product-minus").hover(function () {
                $(this).css("background-color", "#ec4831");
                $(this).css("box-shadow", "0 -3px 0 0", "#dd3e1b", "inset");
            }, function () {
                $(this).css("background-color", "#ec4831");
                $(this).css("box-shadow", "0 -3px 0 0", "#dd3e1b", "inset");
            })
        }
        else
            $(".product-count-label").html(content);
    }

    function increaseAmount() {
        var content =  parseInt($(".product-count-label").html());
        $(".product-count-label").html(++content);
        if (content > 1){
            $(".product-minus").css("cursor", "pointer");
            $(".product-minus").css("opacity", "1");
            $(".product-minus").css("transition-duration", "0.4s");
            $(".product-minus").hover(function () {
                $(this).css("background-color", "#ec4831");
                $(this).css("box-shadow", "0 -3px 0 0", "#dd3e1b", "inset");
            }, function () {
                $(this).css("background-color", "#ff5c4f");
                $(this).css("box-shadow", "0 -3px 0 0", "#d75347", "inset");
            })
        }
    }
});