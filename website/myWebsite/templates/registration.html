<?php 
session_start();

include_once '../inc/dbconfig.inc.php';

$db_conn = mysqli_connect('localhost', 'iProject', '12345', 'webregistration') or die('Error connecting to database - registration ');

if(null !== ($_POST['password'] && $_POST['name'] && $_POST['dob'] && $_POST['user_email'] && $_POST['country'])){
  $user_email = trim($_POST['user_email']);
  $user_password = md5(trim($_POST['password']));
  $user_name = trim($_POST['name']);
  $user_dob = trim($_POST['dob']);
  $user_country = trim($_POST['country']);
  $user_gender = trim($_POST['gender']);

  $check_email = "SELECT user_id from tbl_users where user_email=".$user_email;
  $sql = "INSERT into tbl_users (user_name, user_email, user_password, user_gender, user_dob, user_country, joining_date) VALUES ('". $user_name ."','". $user_email ."','" . $user_password ."','" . $user_gender ."','" . $user_dob ."','". $user_country . "', now())";

  try {
    $retval = mysqli_query($db_conn, $check_email);
    if($retval != NULL){
      echo "same";
    }
    else {
    $retval = mysqli_query($db_conn, $sql);
      if(!$retval){
        die('Could not insert data into database '. mysqli_error($db_conn));
      }
      else{
        echo "ok";
      }
    }
 } catch (Exception $e) {
    echo $e->getMessage();
  }
}
else{
  echo "Please send all the details";
}
 ?>
