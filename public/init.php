<?php
/**
 * Ce fichier n'est destiné à être utilisé que lors de la mise en route de l'application.
 * Son rôle est de créer, dans la base de données, la table dans laquelle seront enrigistrés les temps.
 * Il est inclus dans le fichier gateway.php et devrait être desactivé une fois qu'il aura rempli son rôle.
 * Les informations de connexion à la base se trouvent dans le fichier config.php également inclus dans le fichier gateway.php.
 */

if ( ! isset( $config ) )
    die();

$table = $config['table'];

$conn = new mysqli( $config['host'], $config['user'], $config['pass'], $config['dbname'] );

if ( mysqli_connect_error() ){
    die( "La connexion à la base de données a échoué: " . mysqli_connect_error() );
}
echo "Succès de la connexion.\n";

if ( $sql = file_get_contents( '../scores.sql' ) ){
    if ( $conn->query( $sql ) === true ){
        echo "La table $table a bien été créée.\n";
    }
    else {
        die( "Erreur lors de la création de la table $table: " . $conn->error );
    }
}
else {
    die( "Erreur lors de la tetative d'ouverture et/ou de lecture du fichier sql." );
}

$conn->close();

die( "\nL'instruction <code>require __DIR__ . '/init.php';</code> devrait être retirée du fichier gateway.php une fois la table '$table' créée." );
