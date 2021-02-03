var LIST = $('.bl-row');
var LIST_COUNTERS = $(".bl-left-products");
var LIST_BOUGHT = $(".bl-bought-products");
var ITEM_TEMPLATE = $('.hidden-template').html();
var ITEM_COUNTER = $(".hidden-count-label-template").html();
var ITEM_BOUGHT = $(".hidden-bought-label-template").html();

var ID = 4;

$(document).ready(function () {
    $("#input-search").bind('keypress', function (e) {
        if (e.keyCode === 13) {
            addItem($("#input-search").val());
            $("#input-search").val('').focus();
        }
    })
    $(".bl-search-button").click(function () {
        addItem($("#input-search").val());
        $("#input-search").val('').focus();
    })

    $(".product-plus").click(function () {
        increaseAmount(this);
    })
    $(".product-minus").click(function () {
        decreaseAmount(this);
    })

    $(".product-bought-button").click(function () {
        buyProduct(this);
    })
    $(".product-unbuy-button").click(function () {
        unbuyProduct(this);
    })

    $(".product-cross").click(function () {
        delProduct(this);
    })

    $(".product-name").click(function () {
        $(this).hide();
        var content =  $(".product-name").html();
        // $('.input-edit#' + $(this).data($(this.dataset.id))).css("display", "inline-block");
        // $(`.input-edit[data-id="${this.dataset.id}"]`).css("display", "inline-block");
        $(".input-edit").css("display", "inline-block");
        $(".input-edit").val(content).focus();
    })


    function addItem(title) {
        // var node = $(ITEM_TEMPLATE);
        // var nodeCounter = $(ITEM_COUNTER) //Create new HTML node
        // node.find(".product-name").text(title);	//Set product title
        // //Delete Action
        // node.find(".product-cross").click(function () {
        //     node.remove();
        //     nodeCounter.remove();
        // });
        // node.find(".product-minus").click(function () {
        //     decreaseAmount(this);
        // });
        // node.find(".product-plus").click(function () {
        //     increaseAmount(this);
        // });
        // node.find(".product-bought-button").click(function () {
        //     buyProduct(this);
        // })
        // node.find(".product-unbuy-button").click(function () {
        //     unbuyProduct(this);
        // })
        // LIST.append(node);	//Add to the end of the list
        //
        // nodeCounter.find(".left-prod-title").html(title);
        // nodeCounter.css("margin-right", "5px");
        // LIST_COUNTERS.append(nodeCounter);

        var product = $(ITEM_TEMPLATE);
        var productCounter = $(ITEM_COUNTER);
        var productBought = $(ITEM_BOUGHT);
        if (title !== ''){
            product.find('.product-name').text(title);
            product.find('.product-count-label').text(1);
            product.find('.product-minus').css('opacity', 0.4);
            product.find('.product-minus').attr("disabled", false);
            product.find('.id').text(ID);
            productCounter.find('.id').text(ID);
            productCounter.find('.left-prod-title').text(title);
            productCounter.find('.left-prod-count').text(1);
            productBought.find('.id').text(ID);
            productBought.find('.bought-prod-title').text(title);
            productBought.find('.bought-prod-count').text(1);
            LIST.append("<div class='bl-product' id='"+ID+"bl-product'>"+product.html()+"</div>");
            LIST_COUNTERS.append("<span class='left-product' id='"+ID+"left-product' style='margin-right: 5px'>"+productCounter.html()+"</div>");
            LIST_BOUGHT.append("<span class='bought-product' id='"+ID+"bought-product' style='display: none; margin-right: 5px'>"+productBought.html()+"</div>");
        }
        ID += 1;
    }

    function delProduct(object) {
        var _id = $(object).parent().parent().find('.id').text();
        $(object).parent().parent().remove();
        $('#'+_id+'left-product').remove();
        $('#'+_id+'bought-product').remove();
    }

    function buyProduct(object) {
        var _id = $(object).parent().parent().find('.id').text();
        $('#'+_id+'bl-product').find(".product-name").hide();
        $('#'+_id+'bl-product').find(".product-name-crossed").css("display", "inline-block");
        $('#'+_id+'bl-product').find(".product-unbuy-button").css("display", "inline-block");
        $('#'+_id+'bl-product').find(".product-bought-button").hide();
        $('#'+_id+'bl-product').find(".product-cross").hide();
        $('#'+_id+'bl-product').find(".product-minus").hide();
        $('#'+_id+'bl-product').find(".product-plus").hide();
        $('#'+_id+'bl-product').find(".tooltip-text").hide();
        $('#'+_id+'bl-product').find(".product-unbuy-button").hover(function () {
            $('#'+_id+'bl-product').find(".tooltip-text-hidden").css("visibility", "visible");
            $('#'+_id+'bl-product').find(".tooltip-text-hidden").css("opacity", "1");
        }, function () {
            $('#'+_id+'bl-product').find(".tooltip-text-hidden").css("opacity", "0.6");
        })

        $('#'+_id+'left-product').css("display", "none");
        $('#'+_id+'bought-product').css("display", "inline-block");
    }

    function unbuyProduct(object) {
        var _id = $(object).parent().parent().find('.id').text();
        $('#'+_id+'bl-product').find(".product-name-crossed").hide();
        $('#'+_id+'bl-product').find(".product-name").css("display", "inline-block");
        $('#'+_id+'bl-product').find(".product-bought-button").css("display", "inline-block");
        $('#'+_id+'bl-product').find(".product-unbuy-button").hide();
        $('#'+_id+'bl-product').find(".product-cross").css("display", "inline-block");
        $('#'+_id+'bl-product').find(".product-minus").css("display", "inline-block");
        $('#'+_id+'bl-product').find(".product-plus").css("display", "inline-block");

        $('#'+_id+'left-product').css("display", "inline-block");
        $('#'+_id+'bought-product').css("display", "none");
    }

    function decreaseAmount(object) {
        var _id = $(object).parent().parent().find('.id').html();
        var content1 =  parseInt($('#'+_id+'bl-product').find('.product-count-label').text());
        var content2 =  parseInt($('#'+_id+'left-product').find('.left-prod-count').text());
        var content3 =  parseInt($('#'+_id+'bought-product').find('.bought-prod-count').text());
        content1 -= 1;
        content2 -= 1;
        content3 -= 1;
        if (content1 <= 1) {
            $('#'+_id+'bl-product').find('.product-count-label').html(1);
            $('#'+_id+'left-product').find('.left-prod-count').html(1);
            $('#'+_id+'bought-product').find('.bought-prod-count').html(1);
            $(object).css("cursor", "");
            $(object).css("opacity", "0.6");
            $(object).css("transition-duration", "0");
            // $(object).css("disabled", "true");
            $(object).hover(function () {
                $(object).css("background-color", "#ec4831");
                $(object).css("box-shadow", "0 -3px 0 0", "#dd3e1b", "inset");
            }, function () {
                $(object).css("background-color", "#ec4831");
                $(object).css("box-shadow", "0 -3px 0 0", "#dd3e1b", "inset");
            })
        }
        else{
            $('#'+_id+'bl-product').find('.product-count-label').html(content1);
            $('#'+_id+'left-product').find('.left-prod-count').html(content2);
            $('#'+_id+'bought-product').find('.bought-prod-count').html(content3);
        }
    }

    function increaseAmount(object) {
        var _id = $(object).parent().parent().find('.id').html();
        var content1 =  parseInt($('#'+_id+'bl-product').find('.product-count-label').text());
        var content2 =  parseInt($('#'+_id+'left-product').find('.left-prod-count').text());
        var content3 =  parseInt($('#'+_id+'bought-product').find('.bought-prod-count').text());
        $('#'+_id+'bl-product').find('.product-count-label').html(++content1);
        $('#'+_id+'left-product').find('.left-prod-count').html(++content2);
        $('#'+_id+'bought-product').find('.bought-prod-count').html(++content3);
        if (content1 > 1){
            $(object).css("cursor", "pointer");
            $(object).css("opacity", "1");
            $(object).css("transition-duration", "0.4s");
            // $(object).css("disabled", "false");
            $(('#'+_id+'bl-product').find('.product-minus')).hover(function () {
                $(this).css("background-color", "#ec4831");
                $(this).css("box-shadow", "0 -3px 0 0", "#dd3e1b", "inset");
            }, function () {
                $(this).css("background-color", "#ff5c4f");
                $(this).css("box-shadow", "0 -3px 0 0", "#d75347", "inset");
            })
        }
    }
});