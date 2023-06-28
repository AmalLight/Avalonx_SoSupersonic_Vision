function onLoad( status : number , monitor : Monitor ) : void
{
    if ( status == 1 )
    {
        input.clearValue( 'getcsv' ) ;
          div.clearValue( 'infos1' ) ;

             div.clearValue( 'values1a' ) ;
        textarea.clearValue( 'values1b' ) ;
        textarea.clearValue( 'values2'  ) ;
    }

    const size : number = document.body.clientWidth ;

    if ( size < 700 )
    { // smartphone
        
        monitor.setDevice( Monitor.smartphone() ) ;
        
        document.body.style.backgroundImage = 'url( "/static/images/smartphone.jpg" )' ;
        
        noPcTablet( true ) ;
    }

    else
    { //pc

        monitor.setDevice( Monitor.pc() ) ;

        document.body.style.backgroundImage = 'url( "/static/images/Pc.jpg" )' ;
        
        noPcTablet( false ) ;
    }
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

function noPcTablet( decision : boolean ) : void
{
    const short_height : number = 200;
    const  long_height : number = 600;

    if ( decision )
    {
        forId.styleBlock( 'table2' ) ;
        forId.styleNone(  'table1' ) ;

        textarea.setStyle( 'values2' , 'height' , short_height + 'px' ) ;
    }

    else
    {
        forId.styleBlock( 'table1' ) ;
        forId.styleNone(  'table2' ) ;

             div.setStyle( 'values1a' , 'height' , long_height + 'px' ) ;
        textarea.setStyle( 'values1b' , 'height' , long_height + 'px' ) ;
             div.setStyle(   'infos1' , 'height' , long_height + 'px' ) ;
    }
}