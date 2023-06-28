function modelText( event : any , classe : any , colors : any ) : void // on key up
{
    const query : string = 'values1b' ;

    var car  : number = textarea.getCaret( query ) ;
    var text : string = textarea.getValue( query ) ;

    var word : string = getCurrentWord( text , car ) ;

    // del , shift , ctrl , end , left , up , right , down , canc , Y , Z
    
    const key_to_ignore : number[] = [8,16,17,35,37,38,39,40,46,89,90] ;

    const selected : string = '' + textarea.getSelection( query ) ;

    const vaildCombo = function ( event : any ) : boolean
    {
        return ( selected == '' ) && ( key_to_ignore.indexOf( event.keyCode ) == -1 ) ;
    }

    // alert( `car: ${car} , word: ${word} , e: ${event.keyCode}` ) ;
    // ------------------------------------------------------------------------------------------------

    if ( word == '.'  )
    {
        var collect = '' ;

        for ( var dict in classe )

            collect += miniHTMLfromTEXT( dict , colors ).replace
            (
                '>' , `onmouseover="hover_description( '${dict}' , '' , true     )" ` +
                          `onclick="click_textwrite(   '${dict}' , '' , true , 1 )" ` +
                '>'
            ) + '<br>';

        div.setValue( 'infos1' , collect ) ;
    }

    else if    ( word.length &&
               ( word.lastIndexOf( '.' )  ==  word.length - 1 ) &&
               ( word.replace(     '.' , '' ) in classe       )  )
    { var dict = word.replace(     '.' , '' ) ;
      
        var collect = '' ;

        for ( var nm_short in classe[ dict ] )
        
            collect += miniHTMLfromTEXT( nm_short , colors ).replace
            (
                '>' , `onmouseover="hover_description( '${dict}' , '${nm_short}' , false                      )" ` +
                          `onclick="click_textwrite(   '${dict}' , '${nm_short}' , false , ${dict.length + 1} )" ` +
                '>'
            ) + '<br>' ;

        div.setValue( 'infos1' , collect ) ;
    }
    
    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------

    if ( event.keyCode == 36 ) // home, tutta a sinistra --> deve andare a destra
    {
        var i = car ; while ( i + 1 < text.length && text[ i ] == ' ' ) i ++ ;
        
        textarea.setCaret( query , i );
    }

    // -------------------------------------------------------------------------------------------------------
    // end, tutta a destra --> deve andare a sinistra . caso da non considerare ; non esistono spazi alla fine

    else if ( event.keyCode == 13 ) // invio
    {
        var sub = text.substring( 0 , car - 1 ) ;

        var new_line_i = sub.lastIndexOf( '\n' ) ;

        var i = ( new_line_i > -1 ? new_line_i + 1 : 0 ) ;

        // --------------------------------------------------------------

        var space : string = '' ;
        
        while( i < text.length && text[ i ++ ] == ' ' ) space +=    ' ' ;

        if ( getCurrentWord( text , car - 1 )  == '{' ) space += '    ' ;

        // --------------------------------------------------------------

        textarea.updateCurrentRowValue( query , space ) ;
    }

    // ------------------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------

    else if ( word == '=' && vaildCombo( event ) ) textarea.updateCurrentRowValue( query , ' °'   ) ;
    else if ( word == ',' && vaildCombo( event ) ) textarea.updateCurrentRowValue( query , ' °'   ) ;
    else if ( word == ":" && vaildCombo( event ) ) textarea.updateCurrentRowValue( query , " °"   ) ;
    else if ( word == "'" && vaildCombo( event ) ) textarea.updateCurrentRowValue( query , "°'"   ) ;
    else if ( word == '"' && vaildCombo( event ) ) textarea.updateCurrentRowValue( query , '°"'   ) ;
    else if ( word == '[' && vaildCombo( event ) ) textarea.updateCurrentRowValue( query , ' ° ]' ) ;
    else if ( word == '(' && vaildCombo( event ) ) textarea.updateCurrentRowValue( query , ' ° )' ) ;
    else if ( word == '{' && vaildCombo( event ) ) textarea.updateCurrentRowValue( query , ' ° }' ) ;
    else if ( word == '}' && vaildCombo( event ) )
    {
        textarea.setCaret( query , car - 1 ) ;
        
        historZY( { keyCode : 8 } , new Histor( 0 ) , new Save () ) ;
    }
}