const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

let usuarios = [];
let idAtual = 1;

// 🔹 Rota inicial
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// 🔹 Listar usuários (SEM senha)
app.get('/usuarios', (req, res) => {
    const usuariosSemSenha = usuarios.map(({ senha, ...resto }) => resto);
    res.json(usuariosSemSenha);
});

// 🔹 Criar usuário
app.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos' });
    }

    // Verifica email duplicado
    const existe = usuarios.find(u => u.email === email);
    if (existe) {
        return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = {
            id: idAtual++,
            nome,
            email,
            senha: senhaHash
        };

        usuarios.push(novoUsuario);

        // Retorna sem senha
        const { senha: _, ...usuarioSemSenha } = novoUsuario;
        res.status(201).json(usuarioSemSenha);

    } catch (err) {
        res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
    }
});

// 🔹 Atualizar usuário
app.put('/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha } = req.body;

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;

    if (senha) {
        usuario.senha = await bcrypt.hash(senha, 10);
    }

    const { senha: _, ...usuarioSemSenha } = usuario;
    res.json(usuarioSemSenha);
});

// 🔹 Deletar usuário
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuarios.splice(index, 1);

    res.json({ mensagem: 'Usuário removido' });
});

// 🔹 Login (NOVO 🚀)
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
        return res.status(400).json({ erro: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        return res.status(401).json({ erro: 'Senha incorreta' });
    }

    const { senha: _, ...usuarioSemSenha } = usuario;

    res.json({
        mensagem: 'Login realizado com sucesso',
        usuario: usuarioSemSenha
    });
});

let tccs = [];
let idTcc = 1;

// 🔹 Listar TCCs
app.get('/tccs', (req, res) => {
    res.json(tccs);
});

// 🔹 Criar TCC
app.post('/tccs', (req, res) => {
    const {
        titulo,
        autor,
        orientador,
        area,
        instituicao,
        data,
        descricao,
        arquivo
    } = req.body;

    if (!titulo || !autor || !descricao) {
        return res.status(400).json({ erro: 'Preencha os campos obrigatórios' });
    }

    const novoTCC = {
        id: idTcc++,
        titulo,
        autor,
        orientador,
        area,
        instituicao,
        data,
        descricao,
        arquivo
    };

    tccs.push(novoTCC);

    res.status(201).json(novoTCC);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
