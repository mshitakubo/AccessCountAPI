const axios = require('axios');

module.exports = {

    async create_key(email){

        var email =  email;
        email = email.replace('@', '');
        var result;

        var config = {
            method: 'get',
            url: `https://api.countapi.xyz/create?namespace=${email}&value=0`,
            headers: { }
          };
          
         await axios(config)
          .then(function (response) {
            result = (response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

          return result;

    },

    async add_count(key_count){

        var result;

        var config = {
          method: 'get',
          url: `https://api.countapi.xyz/hit/${key_count}`,
          headers: { }
        };

        await axios(config)
        .then(function (response) {
          result = (response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

        return result;

    },

    async get_valeu(key_count){

        var result;

        var config = {
          method: 'get',
          url: `https://api.countapi.xyz/get/${key_count}`,
          headers: { }
        };

        await axios(config)
        .then(function (response) {
            result = (response);
        })
        .catch(function (error) {
            result = undefined;
          
        });

        return result
        
    }
    
}