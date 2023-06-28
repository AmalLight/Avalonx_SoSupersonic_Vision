class Histor
{
    private collection  : any[]  = Array() ;
    private max_of_coll : number =      30 ;
    
    // 0 visit last else visit value - 1 ;

    private  stat : number  =    0 ;
    private ready : boolean = true ;

    constructor( max : number ) { this.max_of_coll = max ; }

    //------------------------------------------------------------------
    //------------------------------------------------------------------

    public getCollLength() : number { return this.collection.length ; }
    public getCollection() :  any[] { return this.collection        ; }
    public getStat()       : number { return this.stat              ; }

    //------------------------------------------------------------------
    //------------------------------------------------------------------

    public add( query : string ) : boolean
    {
        var todo : boolean = false ;

        if (this.ready) {
            this.ready = false ;

            const textp : string = textarea.getValue( query ) ;
            const  carp : number = textarea.getCaret( query ) ;

            if ( this.stat == 0 )
            {
                // cure3 ------------------------------------------
                if ( this.collection.length >= this.max_of_coll )
            
                    this.collection = this.collection.slice( 5 ) ;
                //-------------------------------------------------

                if ( this.collection.length == 0  ||
                     this.collection [
                     this.collection.length - 1
                   ].text != textp ) todo = true ;
                    
                if ( todo ) this.collection.push( { text : textp , car : carp } ) ;
            }
            this.ready = true ;
        }
        return todo ;
    }

    //------------------------------------------------------------------
    //------------------------------------------------------------------

    public reset()
    {
        if ( this.stat != 0 )
        {
            // splice is [ x , y [ like  substring for string is [ x , y [
            
            this.collection = this.collection.splice( 0 , this.stat ) ;
            this.stat = 0 ;
        }
    }

    //------------------------------------------------------------------
    //------------------------------------------------------------------

    public prev() : {}
    {
        if ( this.stat <= 0 )
             this.stat  = this.collection.length ;

        if ( this.stat > 1 )
             this.stat = this.stat - 1 ;

        return this.read() ;
    }

    public next() : {}
    {
        if ( this.stat != 0 )
             this.stat = this.stat + 1 ;

        if ( this.stat >= this.collection.length )
             this.stat  = 0 ;

        return this.read() ;
    }

    //------------------------------------------------------------------
    //------------------------------------------------------------------

    private read() : {}
    {
        // if read is 0 = index is len-1 !

        if (       this.stat <= 0 )
            return this.collection[
                   this.collection.length - 1
            ] ;
        
        else
            // if read is 1 = index is 0 !

            return this.collection[
                   this.stat - 1
            ] ;
    }
}