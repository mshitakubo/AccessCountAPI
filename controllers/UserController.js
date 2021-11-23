const { users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const apiCount = require('../functions/CountAPI/apiCountActions');
const validaEmail = require('../functions/valida');

module.exports = {

    async createUsers(req, res){

        var email = req.body.email;
        var password = req.body.password;

        const email_valido = validaEmail.validateEmail(email);

        if(!email_valido){
            const error = {
                'mensagem' : 'E-mail inválido.'
            }
            return res.status(401).send(error);

        }

        var email_cadastrado = await users.findOne({
            where:{
                email
            }
        })

        if(!email_cadastrado){

            let senhaCript = bcrypt.hashSync(password, 10);
            var user;
            try{
                var count = await apiCount.create_key(email)
                user =  await users.create({
                    email: email,
                    password: senhaCript,
                    key_count: count.key
                })
            }catch(e){
                res.status(500).send({"mensagem":"Indisponibilidade temporária do servidor"});
            }

            const token = jwt.sign({
                id_usuario: user.dataValues.id,
                email: email
            }, 'passwordWebToken',
            {
                expiresIn: '90 days'
            })
                        
            const result = {
                'id': user.dataValues.id,
                'email' : email,
                'token' : token
            }

            res.status(201).send(result);

        } else{
            const error = {
                'mensagem' : 'E-mail já cadastrado na base de dados.'
            }
            res.status(401).send(error);
        }

    },

    async getUser(req, res){

        var email = req.params.email;

        var user = await users.findOne({
            where:{
                email
            }
        })   


        try{

            var response = {
                id : user.id,
                email : user.email,
                dt_cadastro: user.createdAt
            }

            res.status(200).send(response);

        }catch(e){

            res.status(400).send({"mensagem":"E-mail não localizado na base de dados."});

        }

    },

    async login(req, res) {

        var email = req.body.email;
        var password = req.body.password;

        if(email == undefined){
            email = '';
        }

        const user = await users.findOne({
            where: {
                email
            }
        })

        if(user == null){

            return res.status(401).send({mensagem:'Falha na autenticação'})

        } else if(!bcrypt.compareSync(password, user.password)){

            return res.status(401).send({mensagem:'Falha na autenticação'})

        } else{

            await apiCount.add_count(user.key_count);
            res.status(200).send({
                mensagem:'Autenticado com sucesso'
            });

        }
        
    },

    async getCount(req, res){

        var email = req.params.email;
        var user = await users.findOne({
            where:{
                email
            }
        })   

        try{
            var key_count = user.dataValues.key_count;
            var count = await apiCount.get_valeu(key_count);

            var response = {
                id: user.id,
                email: user.email,
                quantidade_acessos : count.value
            }
                
            res.status(200).send(response);

        }catch(e){

            res.status(400).send({"mensagem":"Usuário não localizado."});

        }

    },

    async refreshToken(req, res){

        var email = req.body.email;
        var password = req.body.password;

        if(email == undefined){
            email = '';
        }

        const user = await users.findOne({
            where: {
                email
            }
        })

        if(user == null){

            return res.status(401).send({mensagem:'Falha na autenticação'})

        } else if(!bcrypt.compareSync(password, user.password)){

            return res.status(401).send({mensagem:'Falha na autenticação'})

        } else{
            const token = jwt.sign({
                id_usuario: user.dataValues.id,
                email: email
            }, 'passwordWebToken',
            {
                expiresIn: '90 days'
            })

            const result = {
                'id': user.dataValues.id,
                'email' : email,
                'token' : token
            }

            res.status(200).send(result);
        }
    }

}