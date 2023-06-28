class Save
{
    private name  : string  = ''    ;
    private ready : boolean = false ;

    constructor() { this.reset() ; }

    // -----------------------------------------------------

    public getName()  : string  { return this.name  ; }
    public getReady() : boolean { return this.ready ; }

    // -----------------------------------------------------

    public reset()
    {
        this.name  =    '' ;
        this.ready = false ;
    }

    public setOn( name : string ) : Save
    {
        this.name  = name ;
        this.ready = true ;

        div.updateFinalLineValue( 'infos1' , `setOn made for ${this.name}` ) ;

        return this ;
    }

    // -----------------------------------------------------

    public saveTheFile()
    {
        if ( this.ready )
        {
            const oReq : XMLHttpRequest = new XMLHttpRequest() ;

            oReq.onload = () =>
        
            { div.updateFinalLineValue( 'infos1' , `file ${this.name} saved` ) ; }

            oReq.open( 'POST' , '/save' , true ) ;
            oReq.setRequestHeader( 'Content-Type' , 'application/json' ) ;
            oReq.send( JSON.stringify (
            {
                'name' : this.name ,
                'text' : textarea.getValue( 'values1b' )
            } ) ) ;
        }
    }
}