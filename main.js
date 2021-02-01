var LIST = $('.bl-row');
var ITEM_TEMPLATE = $('.hidden-template').html();

$(document).ready(function () {
    $(".product-cross").click(function () {
        $(ITEM_TEMPLATE).remove();
    })
    $(".bl-search-button").click(function () {
        addItem("Hi");
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
        LIST.append(node);	//Add to the end of the list
    }
});