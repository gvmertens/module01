const express = require('express');

const server = express();

const users = ['Diego', 'Guilherme', 'Vitor'];

server.get('/users/:id', (req, res) =>{

    const { id } = req.params;

    res.json( users[id]);
});

server.listen(3000);