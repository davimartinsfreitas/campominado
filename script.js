function initialize_game(){
    
    const select = document.getElementById( "select-bombs" );
    
    let selectBomb = select.options[ select.selectedIndex ].value;
    if( selectBomb == "" ){
        alert( "Você precisa selecionar uma quantidade de bomba para continuar" );
        return;
    }

    create_bombs( selectBomb )

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
                allSlots[pos].dataset.value = "BOMBA"
            }else{
                allSlots[pos].dataset.value = val;
            }

            allSlots[pos].dataset.position = key1+","+key2;

            pos++;
        } )
    } )

    allSlots.forEach( slot => {
    
        slot.innerHTML = "";

        slot.addEventListener( 'click', function( e ){
            e.preventDefault();

            slot.innerHTML = slot.dataset.value;
            show_parent_slots( slot.dataset.position, matGame, allSlots );
            
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
            retorno++;
        }

    } )
    return retorno;

}

function show_parent_slots( position, game, elements ){

    let positionClick = position.split( "," );
    
    elements.forEach( element => {

        let atualPosition = element.dataset.position.split( "," );
        if(
            atualPosition[0] == ( positionClick[0] + 1 ) && ( ( atualPosition[1] == positionClick[1] ) || ( atualPosition[1] == ( positionClick[1] - 1 ) ) || ( atualPosition[1] == ( positionClick[1] + 1 ) ) ) || 
            atualPosition[0] == ( positionClick[0] - 1 ) && ( ( atualPosition[1] == positionClick[1] ) || ( atualPosition[1] == ( positionClick[1] - 1 ) ) || ( atualPosition[1] == ( positionClick[1] + 1 ) ) ) || 
            atualPosition[1] == ( positionClick[1] + 1 ) && ( ( atualPosition[0] == positionClick[0] ) || ( atualPosition[0] == ( positionClick[0] - 1 ) ) || ( atualPosition[0] == ( positionClick[0] + 1 ) ) ) || 
            atualPosition[1] == ( positionClick[1] - 1 ) && ( ( atualPosition[0] == positionClick[0] ) || ( atualPosition[0] == ( positionClick[0] - 1 ) ) || ( atualPosition[0] == ( positionClick[0] + 1 ) ) )
        ){
            element.innerHTML = element.dataset.value;
        }

    } )

}