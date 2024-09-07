const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let users = []; 
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    
    const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existingUser) {
        return res.status(400).json({ message: 'Usuário já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username.toLowerCase()  === username.toLowerCase() );

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Usuário ou senha incorretos.' });
    }

    res.json({ message: 'Login bem-sucedido!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});