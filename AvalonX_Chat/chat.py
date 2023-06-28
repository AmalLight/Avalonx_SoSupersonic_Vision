from time import sleep

class Servr:

    def __init__( self ) :

        self.miniServer = { 'msg': { 1 : [ 'chat online' , [ 'Admin' , None ] , 'send' ] } }
        self.threadList = {                                  'Admin' :   0                 }

        self.msgCount = 1
        self.lista    = []
        self.wait_sec = 0.2

    def adduser ( self, user ) :

        self.miniServer [ user ] = 0
        self.sendy ( 'Admin' , 'added ' + user , None )

    # ---------------------------------------------------------------------------
    # ---------------------------------------------------------------------------

    def wait ( self , user , type_of_request , is_thread = False ) :

        print ( type_of_request , 'wait received for:' , user , 'as thread:' , is_thread )

        if not is_thread :

           self.lista += [ [ user , type_of_request ] ]

           while not ( sum ( [ self.threadList [ key ] for key in self.threadList ] ) == 0 ) : sleep ( self.wait_sec )
           while not ( len ( self.lista ) and self.lista [ 0 ] [ 0 ] == user               ) : sleep ( self.wait_sec )

        else: self.threadList [ user ] = 1

        print ( type_of_request , 'wait done for:' , user , 'as thread:' , is_thread )

    def close ( self , user , type_of_request , is_thread = False ) :

        print ( type_of_request , 'close received for:' , user , 'as thread:' , is_thread )

        if not is_thread :

           self.lista = self.lista [ 1 : ]

        else: self.threadList [ user ] = 0

        print ( type_of_request , 'close done for:' , user , 'as thread:' , is_thread )

    # ---------------------------------------------------------------------------
    # ---------------------------------------------------------------------------

    def sendy( self , iam , sms , you ):

        type_of_action = 'send'

        print ( type_of_action , 'received for:' , iam )

        if sms and len( sms ) > 1:

            self.wait ( iam , type_of_action , False )

            if sms[ -1 ] == '\n': sms = sms[ :-1 ]
            msg = [ sms +' from: '+ iam +' to: '+ str( you ), [ iam, you ] , type_of_action ]

            self.miniServer[ 'msg' ][ self.msgCount+1 ] = msg
            self.msgCount += 1

            print ( type_of_action , 'done for:' , iam )

            self.close ( iam , type_of_action , False )

        return 'None'

    def Itake ( self , iam , list ) :

        type_of_action = 'take'

        print ( type_of_action , 'received for:' , iam )

        list_values = [ l [ 1 ] for l in self.lista ]
        is_thread = ( len ( list_values ) == 0 ) or ( not 'send' in list_values )

        if self.miniServer[ iam ] < self.msgCount:

            self.wait ( iam , type_of_action , is_thread )

            for key in reversed( range( self.miniServer[ iam ], self.msgCount ) ):
                msg = self.miniServer[ 'msg' ][ key+1 ]

                if ( msg and msg [ 1 ]       and msg [ 2 ] ) and \
                   ( None in msg [ 1 ] or iam in msg [ 1 ] ) and \
                   (         msg [ 2 ] == 'send'           ) : list += [ msg [ 0 ] ]

            self.miniServer[ iam ] = self.msgCount

            print ( type_of_action , 'done for:' , iam )
            
            self.close ( iam , type_of_action , is_thread )

        return '\n'.join( list ).replace( '.', '\n' ) if ''.join( list ) else ''

# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

def comandi ( myServr , i , user , sms , user2 ) :

    if i and myServr:

        if   i == '0' : return myServr.Itake   ( user, []         )
        elif i == '1' : return myServr.sendy   ( user, sms, user2 )
        elif i == '2' : return myServr.adduser ( user             )

    return 'None'
