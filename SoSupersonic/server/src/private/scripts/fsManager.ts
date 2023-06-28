import      fs from    'fs' ;
import { CSV } from './csv' ;

export class Manager
{
    static WriteNewFileCSV( fullFileName : string , csv : CSV )
    {
        const firstExists : boolean = Manager.existFileCSV( fullFileName , csv , false ) ;

        if ( ! Manager.existFileCSV( fullFileName , csv , true , firstExists ) )
        {
            fs.writeFileSync(     fullFileName , csv.valuesStrGet() ) ;
            Manager.existFileCSV( fullFileName , csv , true , true  ) ;
        }

        csv.resSend( csv.outputGet() ) ;
    }

    static AppendRowsCSV( fullFileName : string , csv : CSV )
    {        
        var tempNewFullName : string =    fullFileName ;
        var newFullFileName : string = tempNewFullName ;

        for ( var int = 1 ; int < csv.limitFilesGet() ; int ++ )

            if ( Manager.existFileCSV

                ( tempNewFullName = fullFileName.replace( '_1.csv' , `_${int}.csv` ) , csv , false )

            ) newFullFileName = tempNewFullName ;

            else

                if ( int == 1 ) { csv.resSend( `File does not exist for _${int}.csv` ) ; return ; }
                else break ;

        const valuesStr : string = csv.valuesStrGet() ;
        
        const rows2 : string[] = Manager.readLinesCSV( newFullFileName , true ).split( csv.symbolLines() ) ;
        const rows1 : string[] = valuesStr.split(                                      csv.symbolLines() ) ;

        const row2 : string | null = ( rows2 ? rows2[ 0 ] : null ) ;
        
        if ( csv.validateROWS( rows1 , false , row2 ) )
        {
            if ( ( rows2.length <= csv.limitRowsGet() / 2 ) ||
                 ( rows2.length + valuesStr.split( csv.symbolColums() ).length <= csv.limitRowsGet() ) )
    
                 fs.appendFileSync(   newFullFileName ,                `\n${valuesStr}` ) ;
            else fs.appendFileSync( ( newFullFileName = tempNewFullName ) , valuesStr   ) ;

            if ( csv.shortGet() ) csv.outputUpdate( 'Append Sync on File done.'   ) ;

            else csv.outputUpdate( `Append Sync on File ${newFullFileName} done.` ) ;

            csv.resSend( csv.outputGet() ) ;
        }
    }

    static readLinesCSV( fullFileName : string , exists : boolean ) : string
    {
        if ( exists ) return fs.readFileSync( fullFileName ).toString() ;
        else          return                                         '' ;
    }

    static getFilesCSV( csv : CSV ) : string
    {
        const listRead   : string[] = fs.readdirSync( `${ csv.mainGet() }/CSV/` ) ;
        var   listOutput : string[] = [] ;

        for ( var i = 0 ; i < listRead.length ; i++ )

            if
            ( (
                ( ! csv.nameBoolGet() ) ||
                ( listRead[ i ].indexOf( csv.nameStrGet() ) > -1 ) 
                    
            ) && (
              
                ( ! csv.hashBoolGet() ) ||
                ( listRead[ i ].indexOf( csv.hashStrGet() ) > -1 )
            ) )

                listOutput.push( listRead[ i ] ) ;
        return  listOutput.join( '\n' ) ;
    }

    static existFileCSV( fullFileName : string , csv : CSV , show=true , end=true ) : boolean
    {
        const exists : boolean = fs.existsSync( fullFileName ) ;

        if ( show )

            if ( csv.shortGet() ) csv.outputUpdate( `csv file exists ? ${exists}.${end ? '' : '\n'}` ) ;

            else  csv.outputUpdate( `csv file ${fullFileName} exists ? ${exists}.${end ? '' : '\n'}` ) ;

        return exists ;
    }

    static deleteFilesCSV( mainGet : string , file : string ) : void
    {
        if ( fs.existsSync( `${mainGet}/CSV/${file}` ) )
             fs.unlinkSync( `${mainGet}/CSV/${file}` ) ;
    }
}