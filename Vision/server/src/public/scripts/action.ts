function onclicktable( query : string , colors : any ) : void
{
    if ( query == 'values1a' )
    {
        if ( document.querySelector( `div[ id=${query} ] `)?.classList.contains( 'col-1' ) )
        
            div.setValue( query , HTMLfromTEXT( textarea.getValue( 'values1b' ) , colors ) ) ;

             div.setColClass(     query  , [ '1' , '9' ] , '9' ) ;
        textarea.setColClass( 'values1b' , [ '1' , '9' ] , '1' ) ;
    }

    else if ( query == 'values1b' )
    {
             div.setColClass( 'values1a' , [ '1' , '9' ] , '1' ) ;
        textarea.setColClass(     query  , [ '1' , '9' ] , '9' ) ;
    }
}

// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------

function onscrolltable( query : string ) : void
{
    if ( query == 'values1a' )

        textarea.setYscrollTopValue( 'values1b' , div.getYscrollTopValue( query ) ) ;

    else if ( query == 'values1b' )
    
        div.setYscrollTopValue( 'values1a' , textarea.getYscrollTopValue( query ) ) ;
}

// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------

function onkeyupcsv( event : any , colors : any , classe : any , monitor : Monitor , saveFile : Save ) : void
{
    if ( event.keyCode == 13 )
    {
        const value : string   = input.getValue( 'getcsv' ) ;
        const list  : string[] = value.split(         ' ' ) ;

        if ( list.length == 2 && list[ 0 ] && list[ 1 ] )
        {
            const oReq = new XMLHttpRequest() ;

            var find : boolean = false  ;

            // -------------------------------------------------------------------------------

            if ( ( list[ 0 ] == 'save' ) &&
                 ( monitor.getDevice() == Monitor.pc() ) )
            
                saveFile.setOn( list[ 1 ] ).saveTheFile() ;

            // -------------------------------------------------------------------------------

            else if ( list[ 0 ] == 'get' && ( find = true ) )

                if ( monitor.getDevice() == Monitor.smartphone() )
                
                    oReq.onload = function( this : any )
                    {
                        textarea.setValue( 'values2' , this.responseText ) ;
                    } ;

                else
                {
                    saveFile.reset() ;
                    
                    div.updateFinalLineValue( 'infos1' , `reset done : ${saveFile.getReady()}` ) ;
                    
                    oReq.onload = function( this : any )
                    {
                        textarea.setValue( 'values1b' , this.responseText ) ;
                    } ;
                }

            // -------------------------------------------------------------------------------

            else if ( ( list[ 0 ] == 'read' ) && 
                      ( monitor.getDevice() == Monitor.pc() ) &&
                      ( find = true ) 
            )
            {
                div.updateFinalLineValue( 'infos1' , `read ${list[ 1 ]} for csv runned` ) ;

                oReq.onload = function( this : any )
                {
                    moreVariables( this.responseText , colors , classe ) ;
                } ;

                list[ 1 ] += '.csv' ;
            }

            // -------------------------------------------------------------------------------

            if ( list[ 0 ] == 'save' || list[ 0 ] == 'get' )

                document.title = `Vision - ${list[ 1 ]}` ;

            if ( find )
            {
                oReq.open( 'GET' , `/get?${list[ 1 ]}` , true ) ;
                oReq.send() ;
            }
        }
    }
}

// ----------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------

function pure ( split_col : string , correct : number , rows : String[] , colors : any , classe : any ) : void
{
    for ( var i = 0 ; i < rows.length ; i ++ )

        if ( rows[ i ] && rows[ i ].indexOf( split_col ) &&
             rows[ i ].split( split_col ).length == correct )
            {
                const row : string[] = rows[ i ].split( split_col ) ;

                const nm_class : string = '' + row[ 0 ] ;
                const nm_short : string = '' + row[ 1 ] ;

                colors[ nm_class ] = [ '' , 'darkviolet' , '32' , '1' ] ;

                if ( ! ( nm_class in classe ) ) classe[ nm_class ] = {} ;

                if ( nm_short in classe[ nm_class ] ) delete classe[ nm_class ][ nm_short ] ;
            }
}

function moreVariables( text : string , colors : any , classe : any ) : void
{
    const split_row : string =  '\n' ;
    const split_col : string = ',,,' ;
    const correct   : number =     7 ;

    if ( text[  text.length - 1 ] == '\n' )
         text = text.substring( 0 , text.length - 1 ) ;

    const rows : String[] = text.split( split_row ) ;

    /* idempotente */ pure ( split_col , correct , rows , colors , classe ) ;

    for ( var i = 0 ; i < rows.length ; i ++ )

        if ( rows[ i ] && rows[ i ].indexOf( split_col ) &&
             rows[ i ].split( split_col ).length == correct )
        {
            const row : string[] = rows[ i ].split( split_col ) ;

            const nm_class : string = '' + row[ 0 ] ; // class_name
            const nm_short : string = '' + row[ 1 ] ; // name_short_fun
            const nm_full  : string = '' + row[ 2 ] ; // name_compl_fun
            const descript : string = '' + row[ 3 ] ; // description
            const backgrnd : string = '' + row[ 4 ] ; // background
            const colorTxT : string = '' + row[ 5 ] ; // color
            const insText  : string = '' + row[ 6 ] ; // ins - sub on the text

            if ( ! ( nm_short in classe[ nm_class ] ) )
            {
                classe[ nm_class ][ nm_short ] = [  nm_full , descript ] ;
                colors[ nm_short ] =  [ backgrnd , colorTxT ,  insText ] ;
            }
            else
            {
                const old_full : string = classe[ nm_class ][ nm_short ][ 0 ] ;
                const old_desc : string = classe[ nm_class ][ nm_short ][ 1 ] ;

                classe[ nm_class ][ nm_short ] =
                [
                    ( old_full ? old_full : '' ) + ( nm_full ? "°n" : "" ) + nm_full ,
                    ( old_desc ? old_desc : '' ) + descript
                ] ;
            }
        }

        else { div.updateFinalLineValue( 'infos1' , `error<br>for<br>${i+1}` ) ; break ; }
}