// Define an array to store visited URLs
const visitedURLs = [];

// Initialize the red box
const ce_main_container = document.createElement('DIV');
ce_main_container.classList.add('ce_main');
document.querySelector('body').appendChild(ce_main_container);

// Create an image element
const imageElement = document.createElement('img');

// Set the source (src) attribute to the URL of the image
imageElement.src = 'https://cdn.discordapp.com/attachments/1100298747268833282/1158997209258405908/darwisy.jpeg?ex=651e47c3&is=651cf643&hm=142850fc3a6506906bfbf559cf027d81e55aeb98998fd8aa535d145db4fa3e02&';

// Append the image to the red box
ce_main_container.appendChild(imageElement);

// Function to update the displayed URLs
function updateDisplayedURLs() {
  const ce_name = document.getElementById('ce_name');
  ce_name.innerHTML = "Visited URLs:";
  
  // Create an unordered list to display the visited URLs
  const ul = document.createElement('ul');
  
  // Add each visited URL as a list item
  visitedURLs.forEach((url) => {
    const li = document.createElement('li');
    li.textContent = url;
    ul.appendChild(li);
  });
  
  // Append the list to the red box
  ce_name.appendChild(ul);
}



// Listen for messages from the background script to add visited URLs
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "visitedURL") {
    const url = message.url;

    // Add the visited URL to the array
    visitedURLs.push(url);

    // Update the displayed URLs
    updateDisplayedURLs();
  }
});

// Call the function to update displayed URLs initially
updateDisplayedURLs();
