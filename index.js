const express = require('express');

const server = express();

server.use(express.json());

const users = ['Renata', 'Guilherme', 'Isadora'];

server.use((req, res, next) => {

    console.log(`Método ${req.method}; URL: ${req.url}`);
    console.time('req')

    next();

    console.timeEnd('req');
});

function checkUserExists(req, res, next){
    if(!req.body.nome){
        return res.status(400).json({ error: 'O campo nome é obrigatório'});
    }

    return next();
}

function checkUserInArrey(req, res, next){
    const user = users[req.params.id];
    
    if(!user){
        return res.status(400).json({ error: 'Usuário não encontrado'});
    }

    req.user = user;

    return next();
}

server.get('/users', (req, res) => {
    return res.json(users);
});

server.post('/users', checkUserExists, (req, res) => {

    const { nome } = req.body;

    users.push(nome);

    return res.json(users);

});

server.put('/users/:id', checkUserExists, checkUserInArrey, (req, res) =>{

    const { id } = req.params;
    const { nome } = req.body;

    users[id] = nome;

    return res.json(users);
});

server.delete('/users/:id', checkUserInArrey, (req, res) =>{

    const { id } = req.params;
    
    users.splice(id, 1);
    
    return res.send();
});

server.get('/users/:id', checkUserInArrey, (req, res) =>{

    res.json( req.user);
});

server.listen(3000);