<?php
if ( ! isset( $config ) )
    die();

$table = $config['table'];

$conn = new mysqli( $config['host'], $config['user'], $config['pass'], $config['dbname'] );

if ( mysqli_connect_error() ){
    die( "Database connection failed: " . mysqli_connect_error() );
}
echo "Connected successfully\n";

if ( $sql = file_get_contents( '../scores.sql' ) ){
    if ( $conn->query( $sql ) === true ){
        echo "Table $table created successfully\n";
    }
    else {
        die( "Error creating table: " . $conn->error );
    }
}
else {
    die( "Error opening sql file." );
}

$conn->close();

die( "\nrequire __DIR__ . '/init.php'; instruction should be removed from gateway.php once table `$table` was successfully created." );