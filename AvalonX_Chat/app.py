import _thread as thread

from flask     import Flask , render_template , request
from threading import Thread
from time      import sleep
from chat      import *

#-------------------------------------------------------------------------------

online = []
users = [ 'Admin' , 'Guest' , 'Intruder' ]
registred = { '0000' : users [ 0 ], '1111' : users [ 1 ] , '3333' : users [ 2 ] }

myServr = Servr ()
for user in users: comandi ( myServr, '2', user, '', '' )

class Distruggi ( Thread ):

    def __init__        ( self , durata ) :
        Thread.__init__ ( self )

        self.durata   = durata
        self.last_min = 1

    def run ( self ) :
       global online , myServr

       while True:

           min_msgCount = min ( [ myServr.miniServer [ key ] for key in myServr.miniServer if key != 'msg' ] )

           print ( 'min:' , min_msgCount )

           if    min_msgCount > 2 :
              for    msgCount in range ( self.last_min , min_msgCount ) :
                  if msgCount in myServr.miniServer [ 'msg' ] :
                     del         myServr.miniServer [ 'msg' ] [ msgCount ]
                     print (                          'del:'  , msgCount )
                     self.last_min =                            msgCount

           sleep( self.durata )
           online = []

thread = Distruggi ( 60 )
thread.start ()

#-------------------------------------------------------------------------------

app = Flask(__name__)

@app.route( '/' )
async def index(): return render_template ( 'index.html' )

@app.route( '/p' , methods = ['POST'] )
async def action():
    global online, myServr

    rq = request.form

    id = prog = user = user2 = i = sms = None

    if 'id' in rq and rq[ 'id' ]: id = rq[ 'id' ]

    if 'prog'   in rq and rq[ 'prog'   ]: prog   = rq[   'prog' ]
    if 'i'      in rq and rq[ 'i'      ]: i      = rq[      'i' ]
    if 'sms'    in rq and rq[ 'sms'    ]: sms    = rq[    'sms' ]
    if 'user2'  in rq and rq[ 'user2'  ]: user2  = rq[  'user2' ]

    if id in registred: user = registred[ id ]

    if  user:
        if prog == '0':
            if not online.count( user ): online += [ user ]
            if not len( online ): return '0'
            return ( str( len( online ) ) + ',' + ' '.join( online ) )

        elif prog == '1': return comandi( myServr, i, user, sms, user2 )

    return 'None'

if __name__ == "__main__": app.run( host='0.0.0.0', port=8899 )

