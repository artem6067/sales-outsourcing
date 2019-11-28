<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$savedFile = '../../' . $_POST['pageName'];
$newHtml = $_POST['html'];

if ($_POST['html']) {
  file_put_contents($savedFile, $newHtml);
}
else {
  header('HTTP/1.0 400 Bad Request');
}
