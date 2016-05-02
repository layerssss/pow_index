#!/usr/bin/env node
var http = require('http')
  , fs = require('fs')
  , path = require('path');


var server = http.createServer((req, res)=>{
  fs.readdir(`${process.env['HOME']}/.pow`, (e, hosts)=>{
    if(e) res.end(e.message);
    res.end(`
      <html>
        <head>
          <title>pow.cx sites on ${process.env['HOSTNAME']}</title>
          <meta charset='UTF-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1, user-scalable=no'>
          <style>
            body {
              background-color: #e0e0d8;
              padding: 2em 3em;
              display: flex;
              flex-flow: column nowrap;
            }
            .filter, .site {
              display: block;
              width: 100%;
              box-sizing: border-box;
              padding: .5em;
              font-size: 2em;
              color: black;
              text-decoration: none;
              font-family: 'Helvetica Neue', Helvetica, sans-serif;
              font-weight: bold;
              text-shadow: 0 1px 0 #fff;
              border: none;
              border-radius: .2em;
              transition: all ease .3s;
            }
            .site .url{
              opacity: .3;
              font-size: .3em;
            }
            .site.active .host{
              text-decoration: underline;
            }
            .site.inactive{
              opacity: .3;
              order: 9999;
            }
          </style>
        </head>
        <body>
          <input class="filter" placeholder="search..." autofocus />
          ${hosts.map(host=>`
            <a class="site" data-host="${host}" href="//${host}.dev${req.url}">
              //<span class="host">${host}</span>.dev<span class="url">${req.url}</span>
            </a>
          `).join('')}
          <script type='text/javascript'>
            var filter_element = document.querySelector('.filter');
            var event_handler = ()=> {
              window.requestAnimationFrame(()=>{
                var value = filter_element.value;
                localStorage.filter = value;
                [].forEach.call(document.querySelectorAll(\`.site[data-host*="\${value}"]\`), site=>{
                  site.className = 'site active';
                });
                [].forEach.call(document.querySelectorAll(\`.site:not([data-host*="\${value}"])\`), site=>{
                  site.className = value ? 'site inactive' : 'site';
                });
              });
            };

            filter_element.onkeydown = event_handler;
            event_handler();
            if(!filter_element.value && localStorage.filter) filter_element.value = localStorage.filter;
          </script>
        </body>
      </html>
    `);
  });
});
var port = Number(process.env['PORT']||3000);
server.listen(port, (e, addr)=>{
  console.log(`listening to http://localhost:${port}/`);
});