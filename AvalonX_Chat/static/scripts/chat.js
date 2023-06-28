
var f1 = function()  { ai( 1 ); $( '#texa1' ).val( '' ); }; // manda messaggio
var f2 = function(e) { if ( e.keyCode == 13 )      f1(); }; // manda messaggio

function opensel() { $( 'audio' )[ 0 ].play(); }

function chansel()
{
    $( '#user2' ).val( '' );

    if ( $( '#chat' ).val() == 'smsAll' )
    {
        $( '#user2' ).css( 'display', 'none'  );

        $( '#row2' ).removeClass( 'col-3' );
        $( '#row3' ).removeClass( 'col-9' );

        $( '#row2' ).addClass( 'col-12' );
        $( '#row3' ).addClass( 'col-0'  );
    }
    else
    {
        $( '#user2' ).css( 'display', 'block' );

        $( '#row2' ).removeClass( 'col-12' );
        $( '#row3' ).removeClass( 'col-0' );

        $( '#row2' ).addClass( 'col-3' );
        $( '#row3' ).addClass( 'col-9' );
    }
}

function setosel()
{
    var osel= $( '#option' ).val();

    if ( osel == '+++' || osel == '------' )
    {
         var size = '';
         size = $( 'textarea' ).css( 'font-size' ).replace( 'px','' );
         size = parseInt( size );

         if ( osel == '+++' )
              $( 'textarea, input, b, select, button' ).css( 'font-size', (size+12) + 'px' );
         else $( 'textarea, input, b, select, button' ).css( 'font-size', (size-12) + 'px' );
    }

    else if ( osel == 'clear' ) $( '#texa2'  ).val( '' );
}

function ai( i )
{
    var dic = { 'prog' : '1' };
    dic[ 'id' ] = $( "#userId" ).text();

    if ( i == 0 ) dic[ 'i' ] = '0'; // legge messaggi
    else          dic[ 'i' ] = '1'; // manda messaggio
        
    dic[   'sms' ] = $( '#texa1' ).val();
    dic[ 'user2' ] = $( '#user2' ).val();

    $.post( 'p', dic ).done( function( data )
    {
        if ( data != 'None' && dic[ 'i' ] == '0' && data.length > 0 )
        {
            $( '#texa2' ).val( data + '\n' + $( '#texa2' ).val() );
            $( 'audio' )[ 1 ].play();
        }
    });
}
