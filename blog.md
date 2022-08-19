## `Infra do Projeto`
        npm init
        npm install express --save
        npm install nodemon -g        
        npm install sequelize --save
        npm install --save mysql2
        npm install ejs --save
        npm install body-parser --save
        npm install --save slugify
        npm install --save bcryptjs -----------> hassh de senha
        bootstrap

## ARQUIVO `INDEX.JS`
```javascript
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
```

## realizando testes de variaveis do formulario.
     res.json({email, password})