<?php
namespace SMeric\Apps\Memory;

use \SMeric\Utilities\DB;

/**
 * Model : ScoresManager
 *
 * Permet d'ajouter de nouveaux scores en BDD.
 * Permet d'acceder aux scores stockés en BDD.
 */

class ScoresManager {

    /***************
     *
     * Attributs
     *
     **************/

    // Accès BDD.
    private $_db_config;
    // Instance de \SMeric\Utilities\DB
    private $_db;

    // Données nétoyées et validées
    private $value;
    private $action;

    // Réponse du manager
    private $response;

    /***************
     *
     * Constructeur
     *
     **************/

    public function __construct( array $db_config ) {
        // On récupère les éléments de connexion à la BDD
        // au moment de l'instanciation
        $this->_setDbConfig( $db_config );
        $this->_setDb();
    }

    /***************
     *
     * Mutateurs
     *
     **************/

    /**
     * On stock la config des accès BDD
     */
    private function _setDbConfig( array $db_config ){
        $this->_db_config = $db_config;
    }

    /**
     * Instanciation de la classe d'accès à la BDD
     */
    private function _setDb(){
        $this->_db = new DB( $this->dbConfig() );
    }

    /**
     * On stock l'action
     */
    public function setAction( string $action ){
        $this->_action = $action;
    }

    /**
     * On stock la valeur "value"
     */
    public function setValue( int $value ){
        $this->_value = $value;
    }

    /**
     * On stock la réponse du controleur
     */
    private function _setResponse( \stdClass $response ){
        $this->_response = $response;
    }

    /***************
     *
     * Accesseurs
     *
     **************/

    /**
     * Accès à la config des accès BDD
     */
    public function dbConfig(){
        return $this->_db_config;
    }

    /**
     * Accès à l'instance de la classe d'accès à la BDD
     */
    private function _db(){
        return $this->_db;
    }

    /**
     * Accès à l'action
     */
    public function action(){
        return $this->_action;
    }

    /**
     * Accès à la valeur "value"
     */
    public function value(){
        return $this->_value;
    }

    /**
     * Accès à la réponse du manager
     */
    public function response(){
        return $this->_response;
    }

    /***************
     *
     * Fonctions
     *
     **************/

    /**
     * Ajout de données
     *
     * Retourne l'id de l'enregistrement ou -1 s'il a échoué
     */
    public function add(){
        $db = $this->_db();
        $db_config = $this->dbConfig();
        $table = $db_config['table'];
        $col   = $db_config['col'];
        $score = $this->value();
        // Préparation de la requête d'insertion.
        $query = "INSERT INTO $table($col) VALUES($score)";
        
        // Exécution de la requête.
        if ( $db->query( $query ) ){
            return $db->id();
        }
        else {
            return -1;
        }
    }

    /**
     * Suppression de données
     *
     * Pas utilisé...
     */
    public function delete(){
        $db        = $this->_db();
        $db_config = $this->dbConfig();
        $table     = $db_config['table'];
        $col       = $db_config['col'];
        $score     = $this->value();
        // Préparation de la requête de supression.
        $query     = "DELETE FROM $table WHERE $col='$score';";

        // Exécution de la requête.
        if ( $db->query( $query ) ){
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Récupération des données d'un enregistrement
     *
     * Pas utilisé...
     */
    public function get(){
        // Exécute une requête de type SELECT avec une clause WHERE.
        $db         = $this->_db();
        $db_config  = $this->dbConfig();
        $table      = $db_config['table'];
        $col        = $db_config['col'];
        // id de l'éléments à retrouver
        $id         = $this->value();

        // Liste sous forme d'un tableau
        $db->setFetchMode(1);
        // Préparation de la requête de selection.
        $query = "SELECT $col FROM $table WHERE id=$id;";
        // Exécution de la requête.
        $db->query( $query );

        // Récupération des données.
        return $db->get();
    }

    /**
     * Récupération d'une liste d'enregistrements
     *
     * Retourne une liste des meilleurs scores.
     */
    public function getList(){
        $db = $this->_db();
        $db_config = $this->dbConfig();
        $table      = $db_config['table'];
        $col        = $db_config['col'];
        // Nombre d'éléments dans la liste
        $scoresList = $this->value();

        // Liste sous forme d'un tableau
        $db->setFetchMode(1);
        // Préparation de la requête de selection.
        $query = "SELECT DISTINCT $col FROM $table ORDER BY $col ASC LIMIT $scoresList";
        // Exécution de la requête.
        $db->query( $query );

        // Récupération des données.
        return $db->get();
    }

    /**
     * Mise à jour d'un enregistrement
     *
     * Pas utilisé...
     */
    public function update(){
        // Prépare une requête de type UPDATE.
        // Exécution de la requête.
    }

    /**
     * Traitement des données par le manager
     */
    public function processAction(){
        $response = new \stdClass;
        // Réponse du manager si "value" est nulle
        if ( 0 === $this->value() ){
            $response->status = false;
            $response->msg    = 'processAction : valeur impossible !';
        }
        else {
            switch ( $this->action() ){
                case 'add':
                    // On ajoute le score et on récupère l'id de l'enregistrement qui vient d'être créé
                    $id = $this->add();
                    // Réponse du manager : id de l'enregistrement
                    if ( $id ){
                        $o = new \stdClass;
                        $o->id = $id;
                        $response->status = true;
                        $response->msg    = $o;
                    }
                    // Réponse du manager si l'id n'est pas valide et que l'enregistrement s'est mal passé.
                    else {
                        $response->status = false;
                        $response->msg    = 'processAction : le scrore n\'a pas pu être enregistré dans la base de données.';
                    }
                    break;
                case 'getList':
                    // On récupère la liste des meilleurs scores
                    $list = $this->getList();
                    // Réponse du manager : la liste des scores
                    if ( ! empty( $list ) ){
                        $response->status = true;
                        $response->msg    = $list;
                    }
                    // Réponse du manager si la liste est vide
                    else {
                        $response->status = true;
                        $response->msg    = array();
                    }
                    break;
                // Réponse du manager si aucune action ne correspond
                default:
                    $response->status = false;
                    $response->msg    = 'processAction : aucune action spécifiée !';
            }
        }
        $this->_setResponse( $response );
    }
}
