import express from 'express';
import { createClient } from 'redis';
import * as fs from 'fs';
import readline from 'readline';
import { Email } from "./service/send_email";
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

const app = express()
const queue_name = 'email_queue';

const subClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});
subClient.connect();
subClient.subscribe(queue_name, (message: any) => {
  fs.appendFileSync('user.txt', `${JSON.stringify(message)}\n`);
  console.log(message);
})

app.get("/", (req: any, res: any) => {
  res.send("Subscriber One")
})

app.get("/subscribers", async (req: any, res: any) => {
  const file = readline.createInterface({
    input: fs.createReadStream('user.txt'),
    output: process.stdout,
    terminal: false
  });
  var email_list:string[] = new Array();
  for await (const line of file) {
    email_list.push(line);
    console.log(line);
  }
  res.send(email_list);
})

app.listen(3001, () => {
  console.log("server is listening to port 3001")
})