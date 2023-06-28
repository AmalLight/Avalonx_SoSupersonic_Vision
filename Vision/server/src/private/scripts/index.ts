import express, {Express} from 'express' ;
import path               from 'path'    ;
import fs                 from 'fs'      ;

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

const app : Express = express() ;

const mainPublic : string = `${__dirname}/../../public` ;

app.use( express.json() ) ;
app.use( express.urlencoded( { extended: true } ) ) ;

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

function readFile( name : string , res : any ) : boolean
{
    var find : boolean = false ;

    if ( name.length > 0 )
    {
        find = true ;

        const dir : string = `${mainPublic}/FILES/${name}` ;

        if ( fs.existsSync( dir ) )

            res.sendFile( path.join( dir ) , ( err : any ) =>
            {
                if ( err ) console.log( `error occurred for "html send ${name}"` ) ;
                else       console.log( `html sent ${name}` ) ;
            }) ;

        else find = false ;
    }

    return find ;
}

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

app.use( '/static', express.static( `${mainPublic}` ) ) ;

app.get( '/get', ( req , res ) =>
{
    if ( ! readFile( req.url.replace( '/get?' , '' ) , res ) )

        { res.send( 'not find' ) ; res.end() ; }
}) ;

app.get( '/hack' , ( req , res ) =>
{
    if ( ! readFile( req.url.replace( '/hack?' , '' ) , res ) )

        { res.send( 'not find' ) ; res.end() ; }
}) ;

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

app.get( '/', ( req , res ) =>
{
    res.sendFile( path.join( `${mainPublic}/html/index.html` ) , ( err ) =>
    {
        if ( err ) console.log( 'error occurred for "html send index"' ) ;
        else       console.log( 'html sent index' ) ;
    }) ;
}) ;

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

app.post( '/save', ( req , res ) =>
{
    const text : string = ( req.body.text ? req.body.text : '' ) ;
    const name : string = ( req.body.name ? req.body.name : '' ) ;

    if ( text && name )
    {
        const dir : string = `${mainPublic}/FILES/${name}` ;

        fs.writeFileSync( dir , text ) ; // overwritten if it already exists.

        res.send( 'done' ) ;
    }   res.end()          ;
}) ;

app.listen( 8888 , '0.0.0.0' , () => { console.log( 'server started' ) ; } ) ;