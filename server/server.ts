const express = require('express');
const app  = express();
const oracledb = require('oracledb');
const configDB = require('./dbConfig.ts');
let conn: any;

try {
  oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_11_2'});
} catch (err) {
  console.error('Whoops!');
  console.error(err);
  process.exit(1);
}


async function runConnect() {
  
    try {
      console.log('Connect: ');
      conn = await oracledb.getConnection(configDB);
  
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


  async function getTime() {

    try {
      conn = await oracledb.getConnection(configDB);
      const result = await conn.execute(
        'select current_timestamp from dual'
      );
      return result;
    } catch (err) {
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

app.get('/', (req: any, res: any) => { res.send([{message: 'http://localhost:4201/ >> OK'}]); });
app.get('/users', (req: any, res: any) => { res.send([])});
app.post('/users', (req: any, res: any) => { 
    console.log(req.body);
    res.send({body: req.body});  
});



app.get('/time', (req: any, res: any) => { 
  const currentTime = getTime();
  currentTime.then((value) => {
    console.log(value.rows);
    res.send([{time: value.rows[0] + ' >>> Get Time form ataBase OK'}])
  });
});


app.listen(4201, '127.0.0.1', function(){
    console.log('Server now listening on 4201');
})