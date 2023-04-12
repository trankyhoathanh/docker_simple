import express from 'express';
import path from 'path';
import { createClient } from 'redis';
import methodOverride from 'method-override';
import compression from 'compression';
import bodyParser from 'body-parser';

const app = express();
app.use(methodOverride());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

const queue_name = 'email_queue';

const pubClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

pubClient.connect();

app.post("/email_queue", (req, res) => {
  const message = {
      email: req.body.email,
      name: req.body.name,
      subject: req.body.subject,
      content: req.body.content,
      birthday: req.body.birthday
  }

  console.log(JSON.stringify(message));

  try {
    pubClient.publish(queue_name, JSON.stringify(message));
  } catch (err) {
    console.log(err)
  }
  
  res.json(
    {
      status: 200,
      message: 'succeed'
    }
  );
})

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.get( "/", ( req, res ) => { res.render( "index" ); });

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})
