function styleIT( backg : string , color : string , ins : string , el : string ) : string
{
    var html = '<text style="' ;

    if ( backg ) html += 'background-color:' + backg +   ';' ;
    if ( color ) html += 'color:'            + color +   ';' ;

    return html = html + '">' +
    
        ( ins ?  '<ins>' : '' ) + el + 
        ( ins ? '</ins>' : '' ) +

    '</text>' ;
}

//------------------------------------------------------------------
//------------------------------------------------------------------

function newline( numb : number , size : number ) : string
{
    var line = styleIT( '' , 'darkred' , '' , numb.toString() ) ;
    
    for ( var is = 0 ; is < ( size - numb.toString().length ) ; is ++ )

           line += '&nbsp;' ;
    return line +  '&nbsp;' ;
}

//------------------------------------------------------------------
//------------------------------------------------------------------

function miniHTMLfromTEXT( text : string , colors : any ) : string
{
    if ( text && ( text in colors ) )
    {
        var color : string[] = colors[ text ] ;

        return styleIT( color[ 0 ] , color[ 1 ] , color[ 2 ] , text ) ;
    }
    else return '' ;
}

//------------------------------------------------------------------
//------------------------------------------------------------------

function HTMLfromTEXT( text : string , colors : any ) : string
{
    const rows = text.split( '\n' ) ;
    
    var html  : string   = '' ;
    var row   : string   = '' ;
    var word  : string   = '' ;
    var words : string[] = [] ;
    var lines : number   =  1 ;

    while
    (
        text && text.length &&
        (
            text.indexOf( '<' ) > -1 ||
            text.indexOf( '>' ) > -1 || 
            text.indexOf( '/' ) > -1 
        )
    )
        text =  text.replace( '<' ,  '&lt;' )
                    .replace( '>' ,  '&gt;' )
                    .replace( '/' , '&sol;' ) ;

    for ( var i1 = 0 ; i1 < rows.length ; i1 ++ )
    {
        html = html + newline( lines ++ , 3 );
        row = rows[ i1 ] ;
        words = row.split( ' ' ) ;

        if ( row.length > 0 )

            for ( var i2 = 0 ; i2 < words.length ; i2 ++ )
            {
                word = words[ i2 ] ;

                if ( word.length > 0 )
                {
                    var mini : string = miniHTMLfromTEXT( word , colors ) ;

                    if ( mini ) html = html + mini ;
                    else html = html + '<text>' + word + '</text>' ;
                }
            
                if ( i2+1 < words.length ) { html = html + '&nbsp;' ; }
            }

        if ( i1+1 < rows.length ) { html = html + '<br>' ; }
        
        } return html ;
}
