/**
 * Ensemble des scripts Javascript utilisés par le site
 **/

/** Definition d'une console minimum pour éviter des erreurs Javascript **/
window.console||(console={log:function(){},warn:function(){},error:function(){}});

/** *************************************************************************************** **/

/* CSS.supports() Polyfill
* https://gist.github.com/codler/03a0995195aa2859465f
* Copyright (c) 2014 Han Lin Yap http://yap.nu; MIT license */
if(!("CSS" in window)){window.CSS={}}if(!("supports" in window.CSS)){window.CSS._cacheSupports={};window.CSS.supports=function(a,d){var b=[a,d].toString();if(b in window.CSS._cacheSupports){return window.CSS._cacheSupports[b]}function c(e,i){var g=document.createElement("div").style;if(typeof i=="undefined"){function j(l,m){var k=l.split(m);if(k.length>1){return k.map(function(p,o,n){return(o%2==0)?p+n[o+1]:""}).filter(Boolean)}}var f=j(e,/([)])\s*or\s*([(])/gi);if(f){return f.some(function(k){return window.CSS.supports(k)})}var h=j(e,/([)])\s*and\s*([(])/gi);if(h){return h.every(function(k){return window.CSS.supports(k)})}g.cssText=e.replace("(","").replace(/[)]$/,"")}else{g.cssText=e+":"+i}return !!g.length}return window.CSS._cacheSupports[b]=c(a,d)};
/* CSS3 Finalize - v4.1.0 - 2014-10-18 - Automatically add vendor prefixes. 
* https://github.com/codler/jQuery-Css3-Finalize
* Copyright (c) 2014 Han Lin Yap http://yap.nu; MIT license */
}(function(a){if(a.cssFinalize){return}a.cssFinalizeSetup={node:"style,link",append:true,callback:function(b){}};a.fn.cssFinalize=function(b){if(!b||typeof b!="object"){b={}}b.node=this;a.cssFinalize(b);return this};a.cssFinalize=function(e){if(document.documentMode&&document.documentMode<=9){return true}var p=document.createElement("div");p.style.cssText="background-image:linear-gradient(#9f9, white);";e=a.extend({},a.cssFinalizeSetup,e);var x=function(i){return i.replace(/[A-Z]/g,function(A){return"-"+A.toLowerCase()})};var f=[];var u;var l=window.getComputedStyle(document.documentElement,null);for(var t=0;t<l.length;t++){if(l[t].charAt(0)==="-"){var g=l[t].indexOf("-",1);f.push(l[t].substr(g+1));u=l[t].substr(1,g-1)}}if(u=="ms"&&f.indexOf("flex")===-1){f.push("flex")}else{if(u=="webkit"){for(var t in p.style){if(t.indexOf("webkit")===0){var v=x(t);if(a.inArray(v.substr(7),f)===-1){f.push(v.substr(7))}}}}}function k(i){var A=a.camelCase(i);return(u=="ms")?A.charAt(0).toLowerCase()+A.substr(1):A}function w(i){i=i.replace(/\/\*((?:[^\*]|\*[^\/])*)\*\//g,"");i=i.replace(/\n/g,"");i=i.replace(/\r/g,"");i=i.replace(/\@import[^;]*;/g,"");return i}function z(i,A){i.after('<style class="css-finalized" '+((i.attr("media")&&i.attr("media").length>0)?'media="'+i.attr("media")+'"':"")+">"+a.cssFinalize.cssObjToText(A)+"</style>")}function c(A,B){B=w(B);if(a.trim(B)===""){return}var C=d(B);var i=[];i=D(C);function D(F){var E=[];a.each(F,function(G,I){if(I.attributes){var H=q(I.attributes);if(!a.isEmptyObject(H)){E.push({selector:m(I.selector),attributes:H})}else{if(b(I.selector)){E=E.concat(q(I.attributes,true))}else{if(m(I.selector)!=I.selector){E.push({selector:m(I.selector),attributes:q(I.attributes,true)})}else{if((H=D(I.attributes))&&H.length>0){E.push({selector:I.selector,attributes:H})}}}}}});return E}A.addClass("css-finalize-read");if(i.length>0&&e.append){z(A,i)}if(a.isFunction(e.callback)){e.callback.call(A,i)}}function d(H){var C=H.split(/({[^{}]*})/);if(C[C.length-1].indexOf("}")==-1){C.pop()}var D=[];var A=false;var I;var F=0;var G;var E=0;while(E<C.length){if(E%2===0){var B=a.trim(C[E]);if(A){if(B.indexOf("}")!=-1){B=B.substr(1);C[E]=B;G=C.splice(F,E-F);G.shift();G.unshift(I[1]);D[D.length-1].attributes=d(G.join(""));A=false;E=F;continue}}else{if(B.indexOf("{")!=-1){I=B.split("{");B=a.trim(I[0]);A=true;F=E}if(B!==""){D.push({selector:B})}}}else{if(!A){D[D.length-1].attributes=y(C[E].substr(1,C[E].length-2))}}E++}return D}function y(B){var A;B=B.replace(/url\(([^)]+)\)/g,function(C){return C.replace(/;/g,"[cssFinalize]")});A=B.split(/(:[^;]*;?)/);A.pop();var i={};a.map(A,function(D,C){if(C%2==1){i[a.trim(A[C-1])]=a.trim(D.substr(1).replace(";","").replace(/url\(([^)]+)\)/g,function(E){return E.replace(/\[cssFinalize\]/g,";")}))}});return i}function q(A,i){if(a.isArray(A)){if(i){return a.map(A,function(D,C){return{selector:D.selector,attributes:q(D.attributes,i)}})}else{return{}}}var B={};a.each(A,function(F,E){var H=false;var C=r(F);if(C){H=true;B[C]=E}var G=n(F,E,C);if(G){H=true;B[(C)?C:F]=G}var D=s(F,E);if(D){H=true;a.each(D,function(I,J){if(I=="filter"&&B[I]){B[I]+=" "+J}else{B[I]=J}})}if(i&&!H){B[F]=E}});return B}function r(i){if(a.inArray(i,f)>-1){if(!(k(i) in p.style)){if(k("-"+u+"-"+i) in p.style){return"-"+u+"-"+i}}}return false}function n(C,B,i){i=i||C;if(C=="transition"||C=="transition-property"){var A=B.split(/\s?,\s?/);var D=[];a.each(A,function(E){var F,G;if(C=="transition"){F=A[E].split(" ")[0]}else{F=A[E]}if((G=r(F))!==false){D.push(G+A[E].substr(F.length))}else{D.push(A[E])}});return D.join(",")}if(u=="moz"){if(B.indexOf("element")===0){return"-moz-"+B}}if(C=="display"){if(!("flexBasis" in p.style)){if(u=="ms"){if(B.indexOf("flex")===0){return"-ms-flexbox"}else{if(B.indexOf("inline-flex")===0){return"-ms-inline-flexbox"}}}if(B.indexOf("flex")===0||B.indexOf("inline-flex")===0){return"-"+u+"-"+B}}if(B.indexOf("grid")===0||B.indexOf("inline-grid")===0){return"-"+u+"-"+B}}return false}function s(A,i){if(u=="ms"&&!("flexBasis" in p.style)){if(A=="justify-content"||A=="align-content"||A=="align-items"||A=="align-self"){var B=i;if(i=="space-between"){B="justify"}else{if(i=="space-around"){B="distribute"}else{if(i=="flex-start"){B="start"}else{if(i=="flex-end"){B="end"}}}}if(A=="justify-content"){return{"-ms-flex-pack":B}}else{if(A=="align-content"){return{"-ms-flex-line-pack":B}}else{if(A=="align-items"){return{"-ms-flex-align":B}}else{if(A=="align-self"){return{"-ms-flex-item-align":B}}}}}}if(A=="order"){return{"-ms-flex-order":i}}if(A=="flex-wrap"){var B=i;if(i=="nowrap"){B="none"}return{"-ms-flex-wrap":B}}}return false}function m(i){switch(u){case"moz":i=i.replace("::selection","::-moz-selection");i=i.replace(":input-placeholder","::-moz-placeholder");break;case"webkit":i=i.replace("@keyframes","@-webkit-keyframes");i=i.replace(":input-placeholder","::-webkit-input-placeholder");break;case"ms":i=i.replace(":input-placeholder",":-ms-input-placeholder");i=i.replace("@viewport","@-ms-viewport");break}return i}function b(i){if(!!window.CSS._cacheSupports){if(i.indexOf("@supports")==0){return CSS.supports(i.substring("@supports".length))}}}if(!(e.node instanceof jQuery)){e.node=a(e.node)}e.node.each(function(i,A){var B=a(this);if(B.hasClass("css-finalize-read")||B.hasClass("css-finalized")){return true}if(this.tagName=="LINK"&&B.attr("rel")=="stylesheet"){j(this.href,B)}else{if(this.tagName=="TEXTAREA"){c(B,B.val())}else{c(B,B.html())}}});function j(i,A){var F=document.location,E=F.protocol||"http:";var D=/^(\w+:)\/\/([^\/?#:]+)(?::(\d+))?/.exec(i.toLowerCase());var B=!!(D&&(D[1]!=E||D[2]!=F.hostname||(D[3]||(D[1]==="http:"?80:443))!=(F.port||(E==="http:"?80:443))));if(B){return}try{a("<div />").load(i,function(G){if(G){c(A,G)}})}catch(C){}}var h="background background-image transition transition-property".split(" ");a.each(h,function(i){if(a.inArray(h[i],f)===-1){o(h[i],h[i])}});function o(A,i){i=k(i);a.cssHooks[k(A)]={get:function(D,C,B){if(!C){return D.style[i]}},set:function(B,D){var F=n(A,D,i);try{B.style[i]=(F)?F:D}catch(E){}var C=s(A,D);if(C){a.each(C,function(G,H){try{if(G=="filter"&&B.style[G]){B.style[G]+=" "+H}else{B.style[G]=H}}catch(I){}})}}}}};a.cssFinalize.cssObjToText=function(d,c,b){var e="";c=c||false;b=b||1;a.each(d,function(f,g){if(c){e+=Array(b).join("  ")}e+=g.selector+"{";if(a.isArray(g.attributes)){if(c){e+="\r\n"+Array(b).join("  ")}e+=a.cssFinalize.cssObjToText(g.attributes,c,b+1)}else{a.each(g.attributes,function(i,h){if(c){e+="\r\n"+Array(b+1).join("  ")}e+=i+":"+h+";"});if(c){e+="\r\n"+Array(b).join("  ")}}e+="}";if(c){e+="\r\n"}});return e};a(function(){if(window.cssFinalize!==false){a.cssFinalize()}})})(jQuery);


/** *************************************************************************************** **/

(function($){
    'use strict';
    /** C'est parti ! **/
    $(function(){
        /* Fonctions */
            // On lance le jeu !
        const start_game = function(){
                console.log( 'Initialisation des paramètres du jeu...' );
                /*
                if ( parseInt( $board.attr( 'data-flipped' ) ) > 0 ){
                    reset_flipped();
                }
                */
                // Initialisation des données stockées
                $board.attr({
                    'data-flipped': 0,
                    'data-value'  : '',
                    'data-score'  : 0
                });
                // On affiche les meilleurs scores
                display_best_scores( scores_list );
                // On mélange les cartes
                let shuffled_list = shuffle( cards_list );
                // On place les cartes sur le plateau
                draw_board( shuffled_list );
                // On permet aux cartes de se retourner lorsqu'on clique dessus
                flip_card();
                // Lancement du chronomètre
                start_timer();
                console.log( 'Le jeux commence !' );
                console.log( '> ------------------------------------------------ <' );
            },
            // On re-lance le jeu !
            restart_game =  function(){
                console.log( 'Aller ! On rejoue !' );
                console.log( '> ------------------------------------------------ <' );
                // On retourne les cartes découvertes
                $( '.is-flipped' ).removeClass( 'is-flipped' );
                $( '.was-found' ).removeClass( 'was-found' );
                // On lance le jeux, après que les cartes aient été retournées
                let start = setTimeout( start_game, 1200 );
            },
            // On fabrique un tableau contenant toutes les cartes
            get_cards_list = function(){
                console.log( 'On fabrique un tableau contenant toutes les cartes...' );
                let cards = [];
                for ( let i = 0; i < cards_number; i = i + 2 ){
                    cards[i] = cards[i + 1] = {
                        // valeur de la carte pour déterminer si 2 cartes découvertes forment une paire lorsqu'elles ont la même valeur
                        value   : i,
                        // ordonné négative du bord supperieur de la carte sur la planche utilisée comme sprite css
                        // voir https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Images/Sprites_CSS
                        start_y : - ( ( i + 1 ) * card_size.h - card_size.h ) / 2,
                    };
                }
                console.log( 'Voici ce tableau :' );
                console.log( cards );
                return cards;
            },
            // On mélange les cartes
            // @source https://javascript.info/task/shuffle
            shuffle = function( array ){
                console.log( 'On mélange les cartes...' );
                // On clone le tableau pour éviter de modifier l'original car les tableaux sont
                // passés par référence et non par valeur en javascript. Ce sont des objets.
                let shuffled_list = array.slice( 0 );
                for ( let i = shuffled_list.length - 1; i > 0; i-- ){
                    // Index aléatoire entre 0 et i
                    let j = Math.floor( Math.random() * ( i + 1 ) );
                    // Permutation des éléments shuffled_list[i] et shuffled_list[j] utilisant la syntaxe de l'affectation par décomposition
                    // Voir https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs/Affecter_par_d%C3%A9composition
                    // La même opération pourrait être écrite ainsi :
                    // let t = shuffled_list[i]; shuffled_list[i] = shuffled_list[j]; shuffled_list[j] = t
                    [shuffled_list[i], shuffled_list[j]] = [shuffled_list[j], shuffled_list[i]];
                }
                console.log( 'Voici le tableau des cartes mélangées :' );
                console.log( shuffled_list );
                return shuffled_list;
            },
            // On pose les cartes sur le plateau
            draw_board = function( shuffled_list ){
                // Utilisation des littéraux de gabarits pour une meilleur lisibilité des chaines de caractères qui intègrent des variables
                // Voir https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Litt%C3%A9raux_gabarits
                $board.html( `<ul style="grid-template-columns: repeat(${rows}, ${card_size.w}px);"></ul>` );
                for ( let i = 0; i < cards_number; i++ ) {
                    $( '#board ul' ).append(
                        `<li class="scene" style="width:${card_size.w}px;height:${card_size.h}px;">` +
                            `<div class="card" data-value="${shuffled_list[i].value}">` +
                                `<div class="card__face card__face--front" style="background-position: 0 ${shuffled_list[i].start_y}px;"></div>` +
                                `<div class="card__face card__face--back" style="line-height: ${card_size.h }px;"></div>` +
                            '</div>' +
                        '</li>'
                    );
                }
            },
            // Les cartes se découvrent lorsqu'on clique dessus
            flip_card = function(){
                // Une carte est cliquée...
                $( '#board .card' ).click(function(){
                    console.log( 'Une carte est cliquée...' );
                    let $that = $( this ),
                        // Nombre de cartes déjà retournées mais non encore appariées
                        flipped = parseInt( $board.attr( 'data-flipped' ) );
                    // Si la carte est cliquable...
                    if ( 2 > flipped && ! $that.hasClass( 'unclickable' ) && ! $that.hasClass( 'was-found' ) && ! $that.hasClass( 'is-flipped' ) ){
                        // On la découvre donc
                        $that.addClass( 'is-flipped' );
                        console.log( 'Elle est découverte...' );
                        // Si c'est la 1ère des 2 cartes qui est découverte, on stock sa valeur pour la comparer à celle de la 2nde
                        register_card_value( $that.attr( 'data-value' ) );
                        // et on stock également qu'une nouvelle carte vient d'être découverte
                        $board.attr( 'data-flipped', flipped + 1 );
                        // Lorsque 2 cartes sont découverte...
                        if ( parseInt( $board.attr( 'data-flipped' ) ) === 2 ){
                            console.log( '2 cartes sont maintenant découvertes.' );
                            // ... plus aucune autre carte ne peux être découverte...
                            toggle_flippable();
                            console.log( 'Plus aucune carte ne peux l\'être.' );
                            // ... et on vérifie si on a une paire...
                            if ( check_for_a_match( $that.attr( 'data-value' ) ) ){
                                // Puisqu'on a une paire, les 2 cartes découvertes deviennent "trouvées" !
                                $( '.is-flipped' ).addClass( 'was-found' );
                                console.log( 'Ces 2 cartes ne doivent plus être retournées...' );
                                // On gagne 1 point ! Et on le stock également.
                                $board.attr( 'data-score', parseInt( $board.attr( 'data-score' ) ) + 1 );
                                console.log( `On marque 1 pt. On a désormais ${$board.attr( 'data-score' )} pts.` );
                                // On vérifie immédiatement si on a gagné la partie...
                                if ( check_for_a_win() ){
                                    // Gagné !
                                    game_won();
                                }
                                else {
                                    // Les 2 cartes ne sont plus simplement "découvertes" : elles sont "trouvées".
                                    reset_flipped();
                                }
                            }
                            // Si on a pas de paire...
                            else {
                                // ... on retourne ces 2 cartes après 1.2 secondes, le temps que l'animation ait lieu...
                                let clear_flipped = setTimeout( reset_flipped, 1200 );
                            }
                            // On efface la valeur de la 1ère carte qui était stockée
                            $board.attr( 'data-value', '' );
                        }
                    }
                    // La carte n'est pas cliquable
                    else {
                        console.log( 'Clic sans effet...' );
                        console.log( '> ------------------------------------------------ <' );
                    }
                });
            },
            // On permet ou non de découvrir les cartes
            toggle_flippable = function(){
                $( '#board .card' ).toggleClass( 'unclickable' );
            },
            // On retourne les 2 cartes face cachée
            reset_flipped = function(){
                // Le compteur des cartes découvertes est remis à 0
                $board.attr( 'data-flipped', 0 );
                // Les 2 cartes sont retournées (sauf si elles sont appariées = si elles ont la classe "was-found")
                $( '.is-flipped' ).removeClass( 'is-flipped' );
                console.log( 'Les cartes sont retournées si elles ne sont pas appariées...' );
                // Toutes les cartes retournées sont à nouveau découvrables
                toggle_flippable();
                console.log( '... et toutes les cartes peuvent à nouveau être découvertes...' );
                console.log( '> ------------------------------------------------ <' );
            },
            // On stock la valeur de la 1ère carte découverte pour la comparer à celle de la 2nde
            register_card_value = function( value ){
                if ( ! $board.attr( 'data-value' ) ){
                    $board.attr( 'data-value', value );
                    console.log( 'C\'est la 1ère carte. On stock sa valeur pour la comparer à celle de la 2nde carte.' );
                }
            },
            // Les 2 cartes retournées sont elle identiques ?
            check_for_a_match = function( value ){
                // On compare la valeur de la 2nde carte avec celle, préalablement stockée, de la 1ère
                if ( parseInt( value ) === parseInt( $board.attr( 'data-value' ) ) ){
                    console.log( 'Les 2 cartes forment une paire !' );
                    return true;
                }
                console.log( 'Les 2 cartes ne correspondent pas...' );
                return false;
            },
            // Toutes les cartes ont-elles été appariées ?
            check_for_a_win = function(){
                // On compare le nombre de cartes uniques avec le nombre de paires trouvées
                if ( pictures === parseInt( $board.attr( 'data-score' ) ) ){
                    console.log( 'La partie est gagnée !' );
                    return true;
                }
                console.log( 'La partie continue...' );
                return false;
            },
            // La partie est gagnée !
            game_won = function(){
                $("#progress_bar").stop()
                console.log( 'On arrête de compter le temps' );
                console.log( '> ------------------------------------------------ <' );
                // On laisse le temps à la dernière carte de se montrer avant d'envoyer le message !
                setTimeout( send_score, 1000 );
            },
            // La partie est perdue...
            game_lost = function(){
                console.log( 'La partie est perdue...' );
                // Plus aucune carte n'est cliquable...
                toggle_flippable();
                console.log( '> ------------------------------------------------ <' );
                if ( confirm( 'La partie est perdue...\n\nOn rejoue ?' ) ){
                    restart_game();
                }
            },
            // Lancement du chronomètre
            start_timer = function(){
                console.log( `On lance le chronomètre ! On a ${game_duration/1000} secondes pour finir le jeu !` );
                $( '#progress_bar' ).stop().css( 'width', 0 ).animate({
                        width    : '100%',
                    }, {
                        duration : game_duration,
                        progress : function( promise, progress, ms ){
                            $board.attr( 'data-progress', parseInt( progress * game_duration ) );
                        },
                        // Si le chrono arrive au bout, c'est perdu :(
                        done     : game_lost
                    }
                );
            },
            // On envoi le score en ajax pour être traité par php et inscrit dans la base
            send_score = function(){
                console.log( 'On envoi le score au serveur...' );
                let hms = ms_to_hms( $board.attr( 'data-progress' ) );
                // Envoi des données en POST vers gateway.php qui va se charger du traitement et de la réponse
                $.post( 'gateway.php', { value: $board.attr( 'data-progress' ), action: "add" }, function( response ){
                    console.log( 'Réponse du serveur :' );
                    console.log( response );
                    // Tout s'est bien passé ! On rejoue ?
                    if ( response.status ){
                        if ( confirm( `BRAVO !\nVous avez gagné en ${hms.m} min et ${hms.s} sec !!!\n\nOn rejoue ?` ) ){
                            restart_game();
                        }
                    }
                    // Il y eu un problème... On rejoue quand même ?
                    else{
                        if ( confirm( `BRAVO !\nVous avez gagné en ${hms.m} min et ${hms.s} sec !!!\nMais une erreur est survenue lors de l'enregistrement de votre score :\n${response.msg}\n\nOn rejoue ?` ) ){
                            restart_game();
                        }
                    }
                });
            },
            display_best_scores = function( n ){
                let hms = ms_to_hms( $board.attr( 'data-progress' ) );
                $.post( 'gateway.php', { value: n, action: "getList" }, function( response ){
                    console.log( `On récupère les ${n} meilleurs scores stockés en base...` );
                    console.log( 'Réponse du serveur :' );
                    console.log( response );
                    if ( response.status ){
                        let best_scores = '<h3>Meilleurs temps</h3>',
                            score = '',
                            l = response.msg.length;
                        if ( 0 < l ){
                            best_scores += '<ol>';
                            for ( let i = 0; i < l; i++ ){
                                score = ms_to_hms( response.msg[i][0] );
                                best_scores += `<li>00:${(score.m<10?'0'+score.m:score.m)}:${(score.s<10?'0'+score.s:score.s)}</li>`;
                            }
                            best_scores += '</ol>';
                        }
                        else {
                            best_scores += '<p>Aucun temps n\'a encore été enregistré.</p>';
                        }
                        $( '#best_scores' ).html('').append( best_scores);
                    }
                });
            },
            ms_to_hms = function( t ){
                let ms = parseInt( t ),
                    h = Math.floor( ms/1000/60/60 ),
                    m = Math.floor( ( ms/1000/60/60 - h ) * 60 ),
                    s = Math.floor( ( ( ms/1000/60/60 - h ) * 60 - m ) * 60 );
                return { h: h, m: m, s: s };
            };

        // Executez vos scripts Javascript ici...
        console.log( 'Execution des scripts javascript...' );
        
        const pictures      = 18,
              cards_number  = pictures * 2,
              card_size     = { w : 100, h : 100 },
              rows          = Math.floor( Math.sqrt( cards_number ) ),
              cards_list    = get_cards_list( cards_number, card_size ),
              game_duration = 180000, // 60000 x 3 minutes
              scores_list   = 5;
         let  $board        = $( '#board' );

        // On crée un bouton qui permet de relancer le jeu
        $( '#restart_game button' ).click(function(){
            restart_game();
        });

        // On lance le jeu !
        start_game();


    });
}(jQuery));
