class Monitor
{
    private device : number ;
    constructor() { this.device = 0 ; }
    
    private setPC()         : void { this.device = 1 ; }
    private setTablet()     : void { this.device = 2 ; }
    private setSmartphone() : void { this.device = 3 ; }
    private setNull()       : void { this.device = 0 ; }

    static pc()         { return 1 ; }
    static tablet()     { return 2 ; }
    static smartphone() { return 3 ; }
    static nothing()    { return 0 ; }

    static margin_left()  { return 0.02 ; }
    static margin_right() { return 2 ;    }
    static width()        { return 0.96 ; }
    static padding()      { return 7*3 ;  }
    static border()       { return 2 ;    }

    public setDevice( value : number ) : void
    {
        if ( value == Monitor.pc() ) this.setPC() ;

        else if ( value == Monitor.tablet() )     this.setTablet()     ;
        else if ( value == Monitor.smartphone() ) this.setSmartphone() ;
        else                                      this.setNull()       ;
    }

    public getDevice() : number { return this.device ; }
}