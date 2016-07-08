<?php
$loader = __DIR__.'/../vendor/autoload.php';

require_once $loader;

$errors = array();  	// array to hold validation errors
$data = array(); 		// array to pass back data
// validate the variables ======================================================
	if (empty($_POST['name']))
		$errors['name'] = 'Name is required.';
	if (empty($_POST['email']))
		$errors['email'] = 'E-mail is required.';
// return a response ===========================================================
	// response if there are errors
	if ( ! empty($errors)) {
		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
		
	} else {
		$mail = new PHPMailer(); // create a new object
		// $mail->IsSMTP(); // enable SMTP
		$mail->SMTPAuth = true; // authentication enabled
		$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
		$mail->Host = "smtp.gmail.com";
		$mail->Port = 465; // or 587
		$mail->IsHTML(true);
        $mail->setFrom($_POST['email'], $_POST['email']);
		$mail->Username = "alpham79@gmail.com"; //Email that you setup
		$mail->Password = "G00gl3l0gp@$$"; // Password
		$mail->Subject = "WatchHerWork Registration Email From " . $_POST['name']."";
		$mail->Body = "<strong>Name: </strong>".$_REQUEST['name']. "<br>";
        $mail->Body = "<strong>Email: </strong>".$_POST['email']. "<br>";
        $mail->Body = "<strong>Guests: </strong>".$_REQUEST['guests'];
		$mail->AddAddress("alpham79@gmail.com"); //Pass the e-mail that you setup
		 if(!$mail->Send())
		    {
		    		echo "Mailer Error: " . $mail->ErrorInfo;
		    }
		    else
		    {
		    	$data['success'] = true;
	    		$data['message'] = 'Thank you for registering.';
                $data['email'] = $_POST['email'];
                $data['name'] = $_POST['name'];
                $data['guests'] = $_REQUEST['guests'];
		    }
		
	}
	echo json_encode($data);

?>