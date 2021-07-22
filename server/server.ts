const express = require('express');
const app  = express();
const oracledb = require('oracledb');

try {
  oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_11_2'});
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}


async function runConnect() {
    let conn;
  
    try {
      console.log('Connect: ');


      /*conn = await oracledb.getConnection({
        user :  "test",
        password :  "********",
        connectString : "localhost:1521/DB"
      });*/
  
      const result = await conn.execute(
        'select current_timestamp from dual'
      );
  
      console.log('(ks)>Connection with DB test: ');
      console.log(result);

    } catch (err) {
      console.log('(ks)>Error:Connection with DB test: ');
      console.error(err);
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
  runConnect();

// Allow any method from any host and log requests
app.use((req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    console.log(req.method);
    if('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
})

// Handle POST requests that come in formatted as JSON
app.use(express.json());

//app.use('/', routers);

app.get('/', (req: any, res: any) => { res.send([{message: 'hello world'}]); });
app.get('/users', (req: any, res: any) => { res.send([])});
app.post('/users', (req: any, res: any) => { 
    console.log(req.body);
    res.send({body: req.body});  
});


app.listen(4201, '127.0.0.1', function(){
    console.log('Server now listening on 4201');
})