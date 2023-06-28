import         md5 from         'md5' ;
import { Manager } from './fsManager' ;

export class CSV
{
    private nameStr       ; private hashStr   ; private valuesStr  ;
    private mainDirPublic ; private limitRows ; private limitFiles ; private output = '' ;

    private colDelimiter = ',,,' ; private rowDelimiter = '\n' ; private res ;

    private nameBool ; private hashBool ; private valuesBool ; private shortBool ;

    constructor (
    
        name : string , hash : string , values : string , mainPublic : string , 
        limitFiles : number , limitRows : number , short : boolean , res : any
    )
    {
        this.nameStr   = name   ;
        this.hashStr   = hash   ;
        this.valuesStr = values ;

        this.nameBool   = <boolean>( this.nameStr   && this.nameStr.length   > 0 ) ;
        this.hashBool   = <boolean>( this.hashStr   && this.hashStr.length   > 0 ) ;
        this.valuesBool = <boolean>( this.valuesStr && this.valuesStr.length > 0 ) ;
        this.shortBool  = <boolean>( short ? true : false );

        this.mainDirPublic = mainPublic ;
        this.limitRows     = limitRows  ;
        this.limitFiles    = limitFiles ;
        this.res           = res        ;
    }

    public outputUpdate( message : string ) { this.output += message ; }

    public nameStrGet()   : string { return this.nameStr   ; }
    public hashStrGet()   : string { return this.hashStr   ; }
    public valuesStrGet() : string { return this.valuesStr ; }

    public nameBoolGet() : boolean { return this.nameBool  ; }
    public hashBoolGet() : boolean { return this.hashBool  ; }
    public shortGet()    : boolean { return this.shortBool ; }

    public outputGet() : string { return this.output        ; }
    public mainGet()   : string { return this.mainDirPublic ; }

    public limitFilesGet() : number { return this.limitFiles   ; }
    public limitRowsGet()  : number { return this.limitRows    ; }

    public symbolLines()  : string { return this.rowDelimiter ; }
    public symbolColums() : string { return this.colDelimiter ; }

    public resSend( message : string ) { this.res.send( message ) ; this.res.end() ; }

    public actions() : void
    {
        if ( this.inputValid() )
        {
            const rows : string[] | null =
            (
                this.valuesStr ?
                (
                    this.valuesStr.indexOf( this.rowDelimiter ) > -1 ?
                        this.valuesStr.split( this.rowDelimiter ) : [ this.valuesStr ]
                ) : null
            ) ;

            if ( this.validateROWS( rows ) )
            {
                this.hashValid( ( rows ? rows[ 0 ] : '' ) ) ;

                const fileName     : string = `${this.nameStr}_${this.hashStr}_1.csv` ;
                const fullFileName : string = `${this.mainDirPublic}/CSV/${fileName}` ;

                if ( ! this.hashBool )
                {
                    this.outputUpdate( `hash : ${this.hashStr}.\n` ) ;

                    Manager.WriteNewFileCSV( fullFileName , this ) ;
                }
                
                else Manager.AppendRowsCSV( fullFileName , this ) ;
            }
        }
    }

    public validateROWS( rows : string[] | null , self=true, firstRow:string|null=null ) : boolean
    {
        const vaild_input : Boolean = <boolean>
        (
            rows && ( self || ( ( ! self ) && firstRow ) )
        ) ;
        
        this.outputUpdate( `rows in values is valid ? ${vaild_input}.${vaild_input ? '\n' : ''}` ) ;
        
        if ( ( ! vaild_input ) || ( ! rows ) ) { this.resSend( this.output ) ; return false ; }

        var columns ;

        if ( self && ( ! firstRow ) ) firstRow = ( rows[ 0 ] ? rows[ 0 ] : null )

        // prima riga mai vuota !!
        if ( firstRow )
        
            if ( firstRow.indexOf( this.colDelimiter ) > -1 )

                 columns = firstRow.split( this.colDelimiter ).length ;
            else columns = 1 ;
        else     columns = 0;
            
        for( let i = ( self ? 1 : 0 ) ; i < rows.length ; i ++ )

            if  ( columns  > 0 && (
                ( columns == 1 ) ||
            
                ( rows[ i ] && rows[ i ].indexOf( this.colDelimiter ) > -1 &&
                               rows[ i ].split(   this.colDelimiter ).length == columns )
            ) ) { ; }

            else
            {
                this.outputUpdate( `rows ${i+1} in values is not valid.` ) ;

                this.resSend( this.output ) ; return false ;
            }

        return true ;
    }

    public inputValid() : boolean
    {
        const valid_input : boolean = ( this.nameBool && this.valuesBool ) ;
        
        this.outputUpdate( `input inserted is valid ? ${valid_input}.${valid_input ? '\n' : ''}` ) ;
        
        if ( valid_input ) return true ;
        
        else { this.resSend( this.output ) ; return false ; }
    }

    public hashValid( row : string ) : boolean
    {
        this.outputUpdate( `find hash value ? ${Boolean( this.hashBool )}.\n` ) ;

        if ( this.hashBool ) return true ;
        
        else if ( row ) this.hashStr = md5( row ) ;
        
        return false ;
    }
}