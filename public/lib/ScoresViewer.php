<?php
namespace SMeric\Apps\Memory;

/**
 * View : ScoresViewer
 *
 * Responsable du formatage et de l'affichage de la réponse :
 *      du controler s'il y a eu un problème avec les données utilisateur, ou bien
*       du manager, qu'il y ait eu un problème de gestion des données, ou qu'il y ait une réponse valide.
 */

class ScoresViewer {

    /***************
     *
     * Attributs
     *
     **************/

    // Instance du controler
    private $_controler;
    // Instance du manager
    private $_manager;

    // Réponse du viewer
    private $_response;

    /***************
     *
     * Constructeur
     *
     **************/

    public function __construct( ScoreControler $controler, ScoresManager $manager ) {
        // Stockage de l'instance du controler
        $this->_setControler( $controler );
        // Stockage de l'instance du manager
        $this->_setManager( $manager );
    }

    /***************
     *
     * Mutateurs
     *
     **************/

    /**
     * On stock l'instance du controler
     */
    private function _setControler( ScoreControler $controler ){
        $this->_controler = $controler;
    }

    /**
     * On stock l'instance du manager
     */
    private function _setManager( ScoresManager $manager ){
        $this->_manager = $manager;
    }

    /**
     * On stock la réponse du controler, du manager ou du viewer
     */
    private function _setResponse(){
        $this->_response = new \stdClass;
        $controler = $this->_controler();
        $manager   = $this->_manager();
        if ( $controler->response() ){
            $this->_response = $controler->response();
        }
        elseif ( $manager->response() ){
            $this->_response = $manager->response();
        }
        else {
            $this->_response->status = false;
            $this->_response->msg    = 'displayResponse : aucun résultat à afficher.';
        }
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
     * Accès à l'instance du controler
     */
    private function _controler(){
        return $this->_controler;
    }

    /**
     * Accès à la réponse du viewer
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
     * Récupérer la réponse au format json
     */
    public function getJsonResponse(){
        $this->_setResponse();
        return json_encode( $this->response() );
    }
}
