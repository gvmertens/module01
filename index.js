const express = require('express');

const server = express();

server.use(express.json());

const users = ['Renata', 'Guilherme', 'Vitor'];

server.get('/users', (req, res) => {
    return res.json(users);
});

server.post('/users', (req, res) => {

    const { nome } = req.body;

    users.push(nome);

    return res.json(users);

});

server.put('/users/:id', (req, res) =>{

    const { id } = req.params;
    const { nome } = req.body;

    users[id] = nome;

    return res.json(users);
});

server.delete('/users/:id', (req, res) =>{

    const { id } = req.params;
    
    users.splice(id, 1);
    
    return res.send();
});

server.get('/users/:id', (req, res) =>{

    const { id } = req.params;

    res.json( users[id]);
});

server.listen(3000);