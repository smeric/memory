<?php
namespace SMeric\Apps\Memory;

/**
 * Controler : ScoreControler
 *
 * Permet de récupérer les données utilisateur.
 * Il les valide et les passe au manager.
 */

class ScoreControler {

    /***************
     *
     * Attributs
     *
     **************/

    // Données utilisateur
    private $_action;
    private $_value;

    // Score minimum : en deça de 30 secondes c'est de la triche !
    private $_value_min = 30000; // 1000 * 60 * .5 minutes
    // Score maximum : au delà de 10 minutes c'est de la triche !
    private $_value_max = 600000; // 1000 * 60 * 10 minutes
    // Affichage des 10 meilleurs scores au maximum
    private $_value_liste_max = 10;

    // Instance du manager
    private $_manager;

    // Réponse du controler
    private $_response;

    /***************
     *
     * Constructeur
     *
     **************/

    public function __construct( ScoresManager $manager, int $value, string $action ) {
        // Stockage de l'instance du manager
        $this->_setManager( $manager );

        // Données utilisateur
        $this->_setAction( $action );
        $this->_setValue( $value );

        // Nétoyage des données utilisateur
        $this->_sanitizeAction();
        $this->_sanitizeValue();

        // Validation de l'action requise : 'add' et 'getList' supportées
        $this->_validateAction();

        // Validation des données utilisateur nétoyées
        $this->_validateScore();
        $this->_validateScoresListe();

        // Passage des données utilisateur nétoyées et validées au manager
        $this->_manageValue();
    }

    /***************
     *
     * Mutateurs
     *
     **************/

    /**
     * On stock l'instance du manager
     */
    private function _setManager( ScoresManager $manager ){
        $this->_manager = $manager;
    }

    /**
     * On stock l'action
     */
    private function _setAction( string $action ){
        $this->_action = $action;
    }

    /**
     * On stock la valeur "value"
     */
    private function _setValue( int $value ){
        $this->_value = $value;
    }

    /**
     * On définit une valeur minimum pour le temps mis à terminer le jeu
     */
    public function setValueMin( int $value ){
        $this->_value_min = $value;
    }

    /**
     * On définit une valeur maximum pour le temps mis à terminer le jeu
     */
    public function setValueMax( int $value ){
        $this->_value_max = $value;
    }

    /**
     * On définit une valeur maximum pour le nombre de meilleurs scores à afficher
     */
    public function setValueListMax( int $value ){
        $this->_value_liste_max = $value;
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
     * Accès à l'instance du manager
     */
    private function _manager(){
        return $this->_manager;
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
     * Accès à la valeur minimum pour le temps mis à terminer le jeu
     */
    public function valueMin(){
        return $this->_value_min;
    }

    /**
     * Accès à la valeur maximum pour le temps mis à terminer le jeu
     */
    public function valueMax(){
        return $this->_value_max;
    }

    /**
     * Accès à la valeur maximum pour le nombre de meilleurs scores à afficher
     */
    public function valueListMax(){
        return $this->_value_liste_max;
    }

    /**
     * Accès à la réponse du controleur
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
     * Nétoyage de l'action
     */
    private function _sanitizeAction(){
        // On élimine tout ce qui n'est pas une lettre minuscule ou majuscule
        $this->_setAction( preg_replace( '/[^a-z]+/i', '', $this->action() ) );
    }

    /**
     * Nétoyage d'un entier
     */
    private function _sanitizeValue(){
        // On élimine tout ce qui n'est pas un chiffre
        // On coverti le résultat en entier
        // On ne garde que la valeur absolue du résultat
        $this->_setValue( abs( (int) preg_replace( '/\D/', '', $this->value() ) ) );
    }

    /**
     * Validation de l'action
     */
    private function _validateAction(){
        // Validation de l'action requise : 'add' et 'getList' supportées
        $allowed_actions = array( 'add', 'getList' );
        if ( ! in_array( $this->action(), $allowed_actions ) ) {
            $this->_setAction( '' );
            // Réponse du controler
            $response = new \stdClass;
            $response->status = false;
            $response->msg    = 'validateAction : action non valide !';
            $this->_setResponse( $response );
        }
    }

    /**
     * Validation du score
     *
     * En deça de 30 secondes c'est de la triche !
     * Au delà de 10 minutes c'est de la triche aussi !
     */
    private function _validateScore(){
        // Pour l'action "add"
        if ( 'add' === $this->action() && ( ! $this->value() || $this->value() <= $this->valueMin() || $this->value() > $this->valueMax() ) ) {
            $this->_setValue( 0 );
            // Réponse du controler
            $response = new \stdClass;
            $response->status = false;
            $response->msg    = 'validateScore : score impossible !';
            $this->_setResponse( $response );
        }
    }

    /**
     * Validation du nombre de scores à afficher
     *
     * Les 1 à 10 meilleurs scores
     */
    private function _validateScoresListe(){
        // Pour l'action "getList"
        if ( 'getList' === $this->action() ) {
            if ( ! $this->value() ) {
                $this->_setValue( 1 );
            }
            elseif ( $this->value() > $this->valueListMax() ) {
                $this->_setValue( $this->valueListMax() );
            }
        }
    }

    /**
     * Passage du relais au manager
     */
    private function _manageValue(){
        $manager = $this->_manager();
        // On indique l'action à accomplir à l'instance du manager référencée...
        $manager->setAction( $this->action() );
        // ... et la valeur associée à cette action
        $manager->setValue( $this->value() );
        // On demande au manager de procéder au traitement des données
        $manager->processAction();
    }
}