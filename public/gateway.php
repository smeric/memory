<?php
header("Content-type: application/json; charset=utf-8");

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/config.php';
//require __DIR__ . '/init.php';

//use \SMeric\Utilities\DB;
use \SMeric\Apps\Memory\ScoresManager;
use \SMeric\Apps\Memory\ScoreControler;
use \SMeric\Apps\Memory\ScoresViewer;

// Le "value" est un nombre :
//  compris entre 30000 et 600000 pour un score
//  compris entre 1 et 10 pour une liste de scores
//  un entier si c'est un id d'enregistrement
$value = isset( $_POST['value'] ) ? $_POST['value'] : 0;
$value = 100000;
//$value = 6;

// L'action peut être :
//  "add" : ajouter un score à la base de données
//  "getList" : récupérer une liste de scores dans la base de données
//  "update" ou "delete" : mettre à jour ou supprimer un score de la base de données (pas utilisé ici)
$action = isset( $_POST['action'] ) ? $_POST['action'] : "";
$action = "add";
//$action = "getList";

// Instanciation des 3 classes
$model = new ScoresManager( $config );
$controller = new ScoreControler( $model, $value, $action );
$view = new ScoresViewer( $controller, $model );

// Réponse du serveur au format json
die( $view->getJsonResponse() );


