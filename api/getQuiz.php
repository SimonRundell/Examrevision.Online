<?php
include 'setup.php';

$query = "SELECT * FROM tblquiz WHERE quizCode = ?";
$stmt = $mysqli->prepare($query);

if (!$stmt) {
    log_info("Prepare failed: " . $mysqli->error);
    send_response("Prepare failed: " . $mysqli->error, 500);
}

$stmt->bind_param("s", $receivedData['quizCode']);

if (!$stmt->execute()) {
    log_info("Execute failed: " . $stmt->error);
    send_response("Execute failed: " . $stmt->error, 500);
}

$result = $stmt->get_result();

if ($result) {
    $row = $result->fetch_assoc();
    if ($row) {
        $json = json_encode($row);
        send_response($json, 200);
    } else {
        log_info("No data found for the given quiz code.");
        send_response("No data found for the given quiz code.", 404);
    }
} else {
    log_info("Quiz Query failed: " . $mysqli->error);
    send_response("Quiz Query failed: " . $mysqli->error, 500);
}

$stmt->close();