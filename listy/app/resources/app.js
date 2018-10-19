// name: app.js
// ver: 1.1.0
// date: 3/29/18
// main js file for Listy application 


/** an obj to hold the list information for Listy and display it in the html 
 * @param {array} list this is an empty array to add item objects to 
 * @method _displayItem(item) this method takes in the item obj and displays it in the ul. only used by other methods
 * @method addItem(ListItem) this is the main method that takes in the list item, adds it to the html template
 * then pushes the template to the 'list' array and displays the item. 
 */
var Listy = {
    staticCacheName: 'listy-v16',
    list: [],
    _registerSvcWorker: function(){
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(function (registration) {
                    console.log('Registration successful, scope is:', registration.scope);
                })
                .catch(function (error) {
                    console.log('Service worker registration failed, error:', error);
                });
        }
    },
    _displayItem: function (item) {
        $('ul').append(item.html);
    },
    addItem: function (listitem) {
        // template
        let listClass = listitem.trim().split(' ').join('-');
        let html = `<li class="">
                        <p class="item-name ${listClass}" >${listitem}</p>
                        <button type="button" class="close" aria-label="Close">
                            <span>&times;</span>
                        </button>
                    </li>`;
        window.localStorage.setItem(listitem, html); 
        let item = { listitem, html };  // the completed item layout 
        this.list.push(item);  // add to list array
        this._displayItem(item);  // display the item
    },
};

/**
 * fn to simulate a click and add the items to the list. no parameters.
 */
function addClick(list) 
{
    var listItem = $('input:text').val();
    
    if (listItem)
        Listy.addItem(listItem);
        $('input:text').val('');
    return
}


$(document).ready(function()
{
    var i;
    var localStorage = window.localStorage;
    
    // add items to listy.list and to localstorage
    for (i = 0; i < window.localStorage.length; i++) 
    {
        var storedItem = localStorage.getItem(localStorage.key(i));
        Listy.list.push({ listitem: localStorage.key(i), html: storedItem } );
        $('ul').append(storedItem);
    }
    
    // register the svc worker first 
    Listy._registerSvcWorker();

    // add item to list 
    $('#add-btn').click(function (e) {
        e.preventDefault();
        addClick(Listy.list);
    });

    // remove item from list 
    $('ul').on('click', '.close', function () {
        var pElement = $(this).parent().find('p').text();  // grab the text from the list item p element
        window.localStorage.removeItem(pElement); // remove the item from localstorage by key above
        $( this ).alert('close'); // close the item on the gui
    });

    // add item by pressing 'Enter'
    $(document).keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            addClick();
        }
    });
});