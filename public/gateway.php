<?php
/**
 * Fichier appelé en ajax depuis le fichier /public/js/main.js.
 * Son rôle est de générer une réponse au format json qui corespondra aux commande et données qui lui seront envoyées en POST.
 */

// La réponse sera formatée en json
header("Content-type: application/json; charset=utf-8");

// autoloader des classes php utilisées
require __DIR__ . '/vendor/autoload.php';
// Informations de connexion à la base MySQL
require __DIR__ . '/config.php';
// Création de la table lors de la 1ère utilisation.
// A desactiver après la 1ère utilisation.
require __DIR__ . '/init.php';

// Espace de nommage des classes instanciées
use \SMeric\Apps\Memory\ScoresManager;
use \SMeric\Apps\Memory\ScoreControler;
use \SMeric\Apps\Memory\ScoresViewer;

// La "value" est un nombre reçu en POST par ce fichier lors de l'appel ajax :
//  compris entre 30000 et 600000 pour un score
//  compris entre 1 et 10 pour une liste de scores
//  (pas utilisé ici :) un entier si c'est un id d'enregistrement
$value = isset( $_POST['value'] ) ? $_POST['value'] : 0;

// L'"action" est une chaine de caractères alphabétique reçu en POST par ce fichier lors de l'appel ajax.
// Elle peut être :
//  "add" : ajouter un score à la base de données
//  "getList" : récupérer une liste de scores dans la base de données
//  (pas utilisé ici :) "get", "update" ou "delete" : récupérer un enregistrement, mettre à jour ou supprimer un score de la base de données
$action = isset( $_POST['action'] ) ? $_POST['action'] : "";

// Instanciation des 3 classes suivant le modèle MVC :
// Les données utilisateur sont reçu par le controler qui se charge de les nétoyer, de les valider et de les passer au manager.
// Les données sont inscrites ou lues en base et une réponse adaptée est générée par le manager.
// La réponse générée au niveau du controler ou du manager est formatée et servie comme réponse à la requête ajax par le viewer.

$model      = new ScoresManager( $config );
$controller = new ScoreControler( $model, $value, $action );
$view       = new ScoresViewer( $controller, $model );

// Réponse du serveur au format json
die( $view->getJsonResponse() );


