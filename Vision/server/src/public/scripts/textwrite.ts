declare var classe : any ;

function cure( match : string ) : string
{
    while ( match.includes(  '°t'  ) ) match = match.replace(  '°t'  , '    ' ) ;
    while ( match.includes(  '°n'  ) ) match = match.replace(  '°n'  ,   '\n' ) ;
    return  match;
}

function getCurrentWord( text : string , car : number ) : string
{
    var car_copy = car ;

    while ( car_copy > 0 &&

        text[ car_copy - 1 ] !=  ' ' && 
        text[ car_copy - 1 ] != '\n' &&
        text[ car_copy - 1 ] != '\t' &&
        text[ car_copy - 1 ] != '\r'
    
    ) car_copy -- ;
    
    return text.substring( car_copy , car ) ;
}

// --------------------------------------------------------------------
// --------------------------------------------------------------------

function readHist( query : string , readBefore : any ) : void
{
    const textH : string = readBefore.text ;
    const  carH : number = readBefore.car  ;

    textarea.setValue( query , textH ) ;
    textarea.setCaret( query ,  carH ) ;
}

// --------------------------------------------------------------------
// --------------------------------------------------------------------

function hover_description( dict : string , nm_short : string , direct : boolean ) : void
{
    if ( direct ) label.setValue( 'description' , dict                            ) ;
    else          label.setValue( 'description' , classe[ dict ][ nm_short ][ 1 ] ) ;
}

function click_textwrite( dict : string , nm_short : string , direct : boolean , del : number ) : void
{
    textarea.delPosCurrentRow( 'values1b' , del ) ;

    if ( direct ) textarea.updateCurrentRowValue( 'values1b' , dict                                    ) ;
    else          textarea.updateCurrentRowValue( 'values1b' , cure( classe[ dict ][ nm_short ][ 0 ] ) ) ;

    point_reset() ; textarea.focusOn( 'values1b' ) ;
}

// --------------------------------------------------------------------
// --------------------------------------------------------------------

function point_reset()
{
    label.setValue( 'description' , 'Description' ) ;
    div.clearValue( 'infos1' ) ;
}