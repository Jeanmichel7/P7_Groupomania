//importe le package http de Node
const http = require('http');
// importe l'application express
const app = require('./app');

//renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// écoute les requetes envoyé au port (3000 par défault ou variable environnement)
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//crée serveur et lance l'application dés qu'une requete est reçu
const server = http.createServer(app);

//écouteur d'évenement consignant le port ou le canal sur lequel le serveur s'exécute
server.on('error',errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port' + port;
    console.log('Listening on ' + bind)
});

// écoute le port
server.listen(port);