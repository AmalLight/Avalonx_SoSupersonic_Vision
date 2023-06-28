function reqListenerShare(      this : any ) { textarea.updateLineValue( 'infos1' , this.responseText ) ; }
function reqListenerSmartphone( this : any ) {    label.updateLineValue( 'infos2' , this.responseText ) ; }

function Ainsert( monitor : Monitor ) : void
{
    var readName   : string = '' ;
    var readHash   : string = '' ;
    var readValues : string = '' ;
    var readShort  : string = '' ;

    const oReq : XMLHttpRequest = new XMLHttpRequest() ;

    if ( monitor.getDevice() == Monitor.pc() ||
         monitor.getDevice() == Monitor.tablet() )
    {
        readName   = input.getValue(      'name1' ) ;
        readHash   = input.getValue(      'hash1' ) ;
        readValues = textarea.getValue( 'values1' ) ;

        textarea.updateLineValue( 'infos1' , `insert name=${readName}, hash=${readHash}, for values..` ) ;
        
        oReq.onload = reqListenerShare ;
    }

    else if ( monitor.getDevice() == Monitor.smartphone() )
    {
        readName   = input.getValue(      'name2' ) ;
        readHash   = input.getValue(      'hash2' ) ;
        readValues = textarea.getValue( 'values2' ) ;
        
        readShort  = '1' ;

        label.updateLineValue( 'infos2' , 'insert for values..' ) ;

        oReq.onload = reqListenerSmartphone ;
    }

    oReq.open( 'POST' , '/csv' , true ) ;
    oReq.setRequestHeader( 'Content-Type' , 'application/json' ) ;
    oReq.send( JSON.stringify (
    {
        'name'   : readName ,
        'hash'   : readHash ,
        'values' : readValues ,
        'short'  : readShort
    } ) ) ;
}

function Alist( monitor : Monitor , ip : string ) : void
{
    if ( monitor.getDevice() == Monitor.pc() ||
         monitor.getDevice() == Monitor.tablet() )
    
        textarea.updateLineValue( 'infos1' , `http://${ip}/csv/` ) ;

    else if ( monitor.getDevice() == Monitor.smartphone() )
    
           label.updateLineValue( 'infos2' , `http://${ip}/csv/` ) ;
}

function Aread() : void
{
    const readName : string = input.getValue( 'name1' ) ;
    const readHash : string = input.getValue( 'hash1' ) ;

    const oReq : XMLHttpRequest = new XMLHttpRequest() ;

    textarea.updateLineValue( 'infos1' , `read for name=${readName} , hash=${readHash} ..` ) ;

    oReq.onload = reqListenerShare ;
    
    oReq.open( 'POST' , '/read' , true ) ;
    oReq.setRequestHeader( 'Content-Type' , 'application/json' ) ;
    oReq.send( JSON.stringify (
    {
        'name' : readName ,
        'hash' : readHash
    } ) );
}