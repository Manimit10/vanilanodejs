const fs = require('fs');

const requestHanlder = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write('<html><head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type= "submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
        
    }
    if (url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {  // Class stream.redable -> Event: 'close', 'data', 'end', 'error', 'pause', 'readable', 'resume'
            console.log(chunk);    
            body.push(chunk);
        });
        return req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            //console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    } 
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>My Page is Here</title>');
    res.write('<body><h1>Welcome to my Page</h1></body>');
    res.write('</head></html>');
    res.end();
};

module.exports = requestHanlder;


