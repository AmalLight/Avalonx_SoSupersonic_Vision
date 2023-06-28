function onLoad( status : number , monitor : Monitor ) : void
{
    if ( status == 1 )
    {
        input.clearValue( 'name1' ) ;
        input.clearValue( 'name2' ) ;

        input.clearValue( 'hash1' ) ;
        input.clearValue( 'hash2' ) ;
        
        textarea.setValue( 'infos1' , 'long  infos'   ) ;
           label.setValue( 'infos2' , 'short infos\n' ) ;

        textarea.clearValue( 'values1' ) ;
        textarea.clearValue( 'values2' ) ;
    }

    const size : number = document.body.clientWidth ;

    if ( size < 700 )
    { // smartphone
        
        monitor.setDevice( Monitor.smartphone() ) ;
        
        document.body.style.backgroundImage = 'url( "/static/images/smartphone.jpg" )' ;
        
        noPcTablet( true ) ;
    }

    else
    { // tablet

        monitor.setDevice( Monitor.pc() ) ;

        document.body.style.backgroundImage = 'url( "/static/images/pc.jpg" )' ;
        
        noPcTablet( false ) ;
    }
}

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

function noPcTablet( decision : boolean ) : void
{
    const short_height : number = 100;
    const  long_height : number = 600;

    if ( decision )
    {
        forId.styleNone(   'top1' ) ;
        forId.styleNone(  'down1' ) ;
        forId.styleNone( 'table1' ) ;
        
        forId.styleBlock(   'top2' ) ;
        forId.styleBlock(  'down2' ) ;
        forId.styleBlock( 'table2' ) ;

        textarea.setStyle( 'values2' , 'height' , short_height + 'px' ) ;
    }

    else
    {
        forId.styleBlock(   'top1' ) ;
        forId.styleBlock(  'down1' ) ;
        forId.styleBlock( 'table1' ) ;

        forId.styleNone(   'top2' ) ;
        forId.styleNone(  'down2' ) ;
        forId.styleNone( 'table2' ) ;

        textarea.setStyle( 'values1' , 'height' , long_height + 'px' ) ;
        textarea.setStyle(  'infos1' , 'height' , long_height + 'px' ) ;
    }
}