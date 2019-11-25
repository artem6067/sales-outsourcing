<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$deletableFile = '../../' . $_POST['name'];

if (!file_exists($deletableFile)) {
  header('HTTP/1.0 404 Not Found');
}
else {
  unlink($deletableFile);
}
