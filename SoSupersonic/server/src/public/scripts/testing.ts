function reqListener( this : any )
{
    ( <HTMLTextAreaElement> document.getElementById( 'temporary' ) ).value = this.responseText ;
}

function testing( readName : string , readHash : string , readValues : string , readShort : string ) : void
{
    const oReq : XMLHttpRequest = new XMLHttpRequest() ;

    oReq.onload = reqListener ;

    oReq.open( 'POST' , '/csv' , true ) ;
    oReq.setRequestHeader( 'Content-Type' , 'application/json' ) ;
    oReq.send( JSON.stringify (
    {
        'name'   : readName   ,
        'hash'   : readHash   ,
        'values' : readValues ,
        'short'  : readShort
    } ) );
}

function testInit() : void
{
    const oReq : XMLHttpRequest = new XMLHttpRequest() ;

    oReq.onload = reqListener ;

    oReq.open( 'GET' , '/test?init' , true ) ;
    oReq.setRequestHeader( "Content-Type" , "application/json" ) ;
    oReq.send( JSON.stringify ( {} ) ) ;
}

function multiplyLine( str : string , int : number ) : string
{
    var da_ritorno : string = str ;

    for ( var i = 0 ; i < ( int-1 ) ; i++ )

        da_ritorno += `\n${str}` ;

    return da_ritorno ;
}