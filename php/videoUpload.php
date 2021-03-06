<?php
$loader = __DIR__.'/../vendor/autoload.php';

require_once $loader;

$errors = array();  	// array to hold validation errors
$data = array(); 		// array to pass back data
// validate the variables ======================================================
	if (empty($_POST['author']))
		$errors['author'] = 'Name is required.';
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
		$mail->isSMTP(); // enable SMTP
		$mail->SMTPAuth = true; // authentication enabled
		$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
		$mail->Host = "smtp.gmail.com";
		$mail->Port = 465; // or 587
		$mail->isHTML(true);
        $mail->setFrom($_POST['email'], $_POST['email']);
		$mail->Username = "kfliphtx@gmail.com"; //Email that you setup
		$mail->Password = "javascript7!"; // Password
		$mail->Subject = "WatchHerWork- New Video Upload By " . $_POST['author']."";
		$mail->Body = '<html>';
		$mail->Body .= '<p>'.$_POST['author'].'</p>';
		$mail->Body .= '<p>'.$_POST['jobTitle'].'</p>';
		$mail->Body .= '<p>'.$_POST['company'].'</p>';
        $mail->Body .= '<p>'.$_POST['title'].'</p>';
        $mail->Body .= '<p>'.$_POST['category'].'</p>';
		$mail->Body .= '</html>';
		$mail->AddAddress("kfliphtx@gmail.com"); //Pass the e-mail that you setup
		 if(!$mail->Send())
		    {
		    		echo "Mailer Error: " . $mail->ErrorInfo;
		    }
		    else
		    {
		    	$data['success'] = true;
	    		$data['message'] = 'Thank you for sending an e-mail.';
                $data['email'] = $_POST['email'];
                $data['author'] = $_POST['author'];
                $data['post'] = $_POST;
		    }
		
	}
	echo json_encode($data);

?>