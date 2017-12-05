import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import routes from './src/routes';

const app = express();
app.use(cors());
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
app.use(express.static('public'));


app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    
    } else if (props) {

      const appHtml = renderToString(<RouterContext {...props}/>);
      const html = `
        <!DOCTYPE html>
        <html>
         <head>
         <meta charset="utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
         <title>Photo Uploader</title>
         <link rel="stylesheet" href="/bootstrap-3.3.7-dist/css/bootstrap.min.css">
         <link rel="stylesheet" href="/font-awesome-4.7.0/css/font-awesome.min.css"> 
         <link rel="stylesheet" type="text/css" href="App.css">
         </head>
         <body>
         <div id="app" class="wrapper">${appHtml}</div>
         <script src="/js/react-app.js"></script>
         </body>
        </html>
        `;
      // send to the browser
      res.send(html);
    } else {
      // no errors, no redirect, return not found
      res.status(404).send('Not Found');
    }
  });
});

app.set('port', process.env.PORT || 5500);
let date = Date();
let server = app.listen(app.get('port'), function(){
    console.log('Server started...\nListening on port: ' + server.address().port);
});
