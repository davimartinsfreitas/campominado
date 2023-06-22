const cMinuts = document.getElementById( "c-minuts-crono" );
const cSeconds = document.getElementById( "c-seconds-crono" );
const cTotalPoints = document.getElementById( "total-points" );
const cResultGame = document.getElementById( "result-game" );
const cPopup = document.getElementById( "c-popup" );
const cTypeEnd = document.querySelector( "#c-popup #result-game" );
const btnRestart = document.getElementById( "btn-restart-game" );
const cTimeResult = document.getElementById( "c-result-time-game" );
const cPontuation = document.getElementById( "c-pontuacao-game" );

var countTime = null;

function initialize_game(){
    
    const select = document.getElementById( "select-bombs" );
    
    let selectBomb = select.options[ select.selectedIndex ].value;
    if( selectBomb == "" ){
        alert( "Você precisa selecionar uma quantidade de bomba para continuar" );
        return;
    }

    countTime = null;

    create_bombs( selectBomb );
    initialize_cronometer(  )

}

function create_bombs( bombs ){

    let allSlots = document.querySelectorAll( '.c-slot-game' );
    let positions = [];
    let max = 7;
    let min = 0;

    for( let i = 0; i < bombs; i++ ){

        let random1, random2;
        random1 = Math.floor (Math.random () * (max - min + 1) + min);
        random2 = Math.floor (Math.random () * (max - min + 1) + min);

        if( check_positions( random1, random2, positions ) ){
            positions.push( [ random1, random2 ] );
        }else{
            i--;
        }

    } 

    let matGame = fill_with_number_bombs( positions );
    let pos = 0;

    matGame.forEach( ( line, key1 ) => {
        line.forEach( ( val, key2 ) => {
            
            if( val == "b" ){
                allSlots[pos].dataset.value = "💣"                
            }else{
                allSlots[pos].dataset.value = val;
            }

            allSlots[pos].dataset.position = key2+","+key1;

            pos++;
        } )
    } )

    let totalPoints = 0;

    allSlots.forEach( slot => {
    
        slot.innerHTML = "";
        slot.style.backgroundColor = "#ccc"

        slot.addEventListener( 'click', function( e ){
            e.preventDefault();

            slot.innerHTML = slot.dataset.value;
            show_parent_slots( slot.dataset.position, matGame, allSlots );
            
            if( slot.dataset.value == "💣" ){

                slot.style.backgroundColor = "red";

                setTimeout( function(){
                    show_end_game( true );
                }, 500 )

            }else{

                totalPoints++;
                cTotalPoints.value = totalPoints;

            }
            
        } )
    } )

}

function check_positions( p1, p2, positions ){

    if( positions.length == 0 )
        return true;

    positions.forEach( value => {
        if( value[0] == p1 && value[1] == p2 ){
            return false;
        }
    } );

    return true;

}

function fill_with_number_bombs( bombs ){

    let mat = [];

    for( let i = 0; i < 8; i++ ){
        mat[i] = [];
        for( let j = 0; j < 8; j++ ){

            mat[i][j] = fill_field( i, j, bombs )

        }
    }

    return mat;

}

function fill_field( i, j, bomb ){
    
    let retorno = 0;

    bomb.forEach( pBomb => {

        if( pBomb[0] == j && pBomb[1] == i ){
            retorno = "b";
        }else if(
            ( ( j == ( pBomb[0] - 1 ) ) && ( i == ( pBomb[1] - 1 ) ) ) ||
            ( ( j == ( pBomb[0] - 1 ) ) && ( i == ( pBomb[1] - 1 ) ) ) ||
            ( ( j == ( pBomb[0] + 1 ) ) && ( i == ( pBomb[1] - 1 ) ) ) ||
            ( ( j == ( pBomb[0] + 1 ) ) && ( i == ( pBomb[1] - 1 ) ) ) ||
            ( ( j == ( pBomb[0] - 1 ) ) && ( i == ( pBomb[1] + 1 ) ) ) ||
            ( ( j == ( pBomb[0] - 1 ) ) && ( i == ( pBomb[1] + 1 ) ) ) ||
            ( ( j == ( pBomb[0] + 1 ) ) && ( i == ( pBomb[1] + 1 ) ) ) ||
            ( ( j == ( pBomb[0] + 1 ) ) && ( i == ( pBomb[1] + 1 ) ) ) ||
            ( ( j == ( pBomb[0] - 1 ) ) && ( i == pBomb[1] ) ) ||
            ( ( j == ( pBomb[0] + 1 ) ) && ( i == pBomb[1] ) ) ||
            ( ( j == pBomb[0] ) && ( i == ( pBomb[1] - 1 ) ) ) ||
            ( ( j == pBomb[0] ) && ( i == ( pBomb[1] + 1 ) ) )
        ){
            if( !( retorno == "b" ) )
                retorno++;
        }

    } )
    return retorno;

}

function show_parent_slots( position, game, elements ){

    let positionClick = position.split( "," );
    positionClick[0] = parseInt( positionClick[0] );
    positionClick[1] = parseInt( positionClick[1] );
    
    elements.forEach( element => {        

        let atualPosition = element.dataset.position.split( "," );
        atualPosition[0] = parseInt( atualPosition[0] );
        atualPosition[1] = parseInt( atualPosition[1] );

        if( 
            ( atualPosition[0] == positionClick[0] ) && ( atualPosition[1] == ( positionClick[1] + 1 ) ) || 
            ( atualPosition[0] == positionClick[0] ) && ( atualPosition[1] == ( positionClick[1] - 1 ) )
        ){
            console.log( atualPosition[0], atualPosition[1], atualPosition[1] + 1 );
        }

        if(
            ( atualPosition[0] == ( positionClick[0] + 1 ) ) && ( atualPosition[1] == positionClick[1] ) || 
            ( atualPosition[0] == ( positionClick[0] - 1 ) ) && ( atualPosition[1] == positionClick[1] ) || 
            ( atualPosition[0] == positionClick[0] ) && ( atualPosition[1] == ( positionClick[1] + 1 ) ) || 
            ( atualPosition[0] == positionClick[0] ) && ( atualPosition[1] == ( positionClick[1] - 1 ) ) || 
            ( atualPosition[0] == ( positionClick[0] - 1 ) ) && ( atualPosition[1] == ( positionClick[1] - 1 ) ) || 
            ( atualPosition[0] == ( positionClick[0] + 1 ) ) && ( atualPosition[1] == ( positionClick[1] - 1 ) ) || 
            ( atualPosition[0] == ( positionClick[0] - 1 ) ) && ( atualPosition[1] == ( positionClick[1] + 1 ) ) || 
            ( atualPosition[0] == ( positionClick[0] + 1 ) ) && ( atualPosition[1] == ( positionClick[1] + 1 ) )
            
        ){
            if( ! ( element.dataset.value == "💣" ) )
                element.innerHTML = element.dataset.value;                
        }

    } )

}

var time = 0;
function initialize_cronometer(  ){

    countTime = setInterval( function(){

        let minute = Math.floor( time/60 );
        let second = time - minute;

        cMinuts.value = minute;
        cSeconds.value = second;

        time++;
    }, 1000 );

}

function show_end_game( type ){

    btnRestart.addEventListener( "click", function( e ){
        e.preventDefault();

        location.reload();

    } )

    let min = Math.floor( time/60 );
    let max = time - min;

    min = min < 10 ? "0"+min : min;
    max = max < 10 ? "0"+max : max;


    cTimeResult.innerHTML = min + ":" + max;
    cPontuation.innerHTML = cTotalPoints.value;

    if( type ){
        cPopup.style.display = "flex";

        cTypeEnd.innerHTML = "perdeu";
        cTypeEnd.style.color = "red";
        return;

    }

    cTypeEnd.innerHTML = "ganhou";
    cTypeEnd.style.color = "green";

}