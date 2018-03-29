/** an obj to hold the list information for Listy and display it in the html 
 * @param {array} list this is an empty array to add item objects to 
 * @method displayItem(item) this method takes in the item obj and displays it in the ul
 * @method addItem(ListItem) this is the main method that takes in the list item, adds it to the html template
 * then pushes the template to the 'list' array and displays the item. 
 */
var Listy = {
    list: [],
    displayItem: function (item) {
        $('ul').append(item.html);
    },
    addItem: function (ListItem) {
        // template
        let html = `<li class="list-group-item alert">
                        <p class="item-name" >${ListItem}</p>
                        <button style="font-family: sans-serif;" type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </li>`;
        let item = { html };  // the completed item layout 
        this.list.push(item);  // add to list array 
        this.displayItem(item);
    },
};


/**
 * fn to simulate a click and add the items to the list. no parameters.
 */
function addClick() 
{
    var listItem = $('input:text').val();
    if (listItem === '') return;

    Listy.addItem(listItem);
    $('input:text').val('');
}


// Main
$(document).ready(function(){
    
    // add item to list 
    $('#add-btn').click(function (e) {
        e.preventDefault();
        addClick();
    });

    // remove item from list 
    $('ul').on('click', '.close', function () {
        $( this ).alert('close'); // close the item on the gui
    });

    $(document).keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            addClick();
        }
    });
});