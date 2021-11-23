const { users } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    
    async login (req, res) {

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

            res.status(200).send({
                mensagem:'Autenticado com sucesso'
            });

        }
        
    }
    
}