import express, {Express} from 'express'     ;
import path               from 'path'        ;
import        {     CSV } from './csv'       ;
import        { Manager } from './fsManager' ;

const app : Express = express() ;

const mainPublic : string = `${__dirname}/../../public` ;
const limitRows  : number =  300 ;
const limitFiles : number =   99 ;

var ArrayCSV : CSV[] = [] ; ListenerSlice() ;

app.use( express.json()                         ) ;
app.use( express.urlencoded({ extended: true }) ) ;

app.use( '/static', express.static( `${mainPublic}` ) ) ;

app.get( '/', ( req , res ) =>
{
    res.sendFile( path.join( `${mainPublic}/html/index.html` ) , ( err ) =>
    {
        if ( err ) console.log( 'error occurred for "html send file"' ) ;
        else       console.log( 'html sent file' ) ;
    }) ;
}) ;

app.get( '/test', ( req , res ) =>
{
    if ( req.url == '/test?init' )
    {
        Manager.deleteFilesCSV( mainPublic , 'nome_file_0_457d3bd73bf722bdec9154828017cad9_1.csv' ) ;
        Manager.deleteFilesCSV( mainPublic , 'nome_file_0_457d3bd73bf722bdec9154828017cad9_2.csv' ) ;
        Manager.deleteFilesCSV( mainPublic , 'nome_file_0_457d3bd73bf722bdec9154828017cad9_3.csv' ) ;

        Manager.deleteFilesCSV( mainPublic , 'nome_file_1_457d3bd73bf722bdec9154828017cad9_1.csv' ) ;
        Manager.deleteFilesCSV( mainPublic , 'nome_file_1_457d3bd73bf722bdec9154828017cad9_2.csv' ) ;
        Manager.deleteFilesCSV( mainPublic , 'nome_file_1_457d3bd73bf722bdec9154828017cad9_3.csv' ) ;

        Manager.deleteFilesCSV( mainPublic , 'testmakecode1_c414b307f67ddee88d24da81e27aad8a_1.csv' ) ;
        Manager.deleteFilesCSV( mainPublic , 'testmakecode2_c414b307f67ddee88d24da81e27aad8a_1.csv' ) ;

        res.send( 'init done' ) ; res.end() ;
    }

    else
        res.sendFile( path.join( `${mainPublic}/html/test.html` ) , ( err ) =>
        {
            if ( err ) console.log( 'error occurred for "html send file"' ) ;
            else       console.log( 'html sent file' ) ;
        }) ;
}) ;

app.post( '/csv' , ( req, res ) => 
{
    const name   : string  = ( ( req.body.name   && req.body.name.length   > 0 ) ? req.body.name   : ''    ) ;
    const hash   : string  = ( ( req.body.hash   && req.body.hash.length   > 0 ) ? req.body.hash   : ''    ) ;
    const values : string  = ( ( req.body.values && req.body.values.length > 0 ) ? req.body.values : ''    ) ;
    const short  : boolean = ( ( req.body.short  && req.body.short.length  > 0 ) ? true            : false ) ;

    if ( ( ! name   ) || name.length   < 1 ||
         ( ! values ) || values.length < 1 )
    
        { res.send( 'body written wrong' ) ; res.end() ; }
    
    else ArrayCSV.push( new CSV( name, hash, values, mainPublic, limitFiles, limitRows, short, res ) ) ;
}) ;

app.post( '/read' , ( req, res ) => 
{
    var name : string = ( ( req.body.name && req.body.name.length > 0 ) ? req.body.name : '' ) ;
    var hash : string = ( ( req.body.hash && req.body.hash.length > 0 ) ? req.body.hash : '' ) ;

    const csv : CSV = new CSV( name, hash, '', mainPublic, 0, 0, false, res ) ;

    const output : string = Manager.getFilesCSV( csv ) ;

    csv.resSend( ( output ? output : 'none' ) ) ;
}) ;

app.listen( 8080 , '0.0.0.0' , () => { console.log( 'server started' ) ; } ) ;

function ListenerSlice()
{
    setInterval( () =>
    {
        while ( ArrayCSV.length > 0 )
        {
            ArrayCSV[ 0 ].actions() ;
            ArrayCSV = ArrayCSV.slice( 1 ) ;
        }
    
    } , 1000 ) ;
}