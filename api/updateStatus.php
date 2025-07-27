<?php
include 'setup.php';

$query = "INSERT INTO tblstatus(studentID, quizCode, quizComplete, score, lastUpdate) VALUES (?, ?, ?, ?, ?)";

$stmt = $mysqli->prepare($query);

if (!$stmt) {
    log_info("Prepare failed: " . $mysqli->error);
    send_response("Prepare failed: " . $mysqli->error, 500);
}

$timestamp = date('Y-m-d H:i:s');
$stmt->bind_param("isiis", 
    $receivedData['studentID'], 
    $receivedData['quizCode'], 
    $receivedData['quizComplete'], 
    $receivedData['score'], 
    $timestamp
);

if (!$stmt->execute()) {
    log_info("Execute failed: " . $stmt->error);
    send_response("Execute failed: " . $stmt->error, 500);
} else {
    log_info("Status update successful");
    send_response("Status update successful", 200);
}

$stmt->close();