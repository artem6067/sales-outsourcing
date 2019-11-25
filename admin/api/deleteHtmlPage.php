<?php

$deletableFile = '../../' . $_POST['name'] . '.html';

if (!file_exists($deletableFile)) {
  header('HTTP/1.0 404 Not Found');
}
else {
  unlink($deletableFile);
}
