const express = require('express')
const router = express.Router()
const User = require("./User") //salvar - banco
const bcrypt = require('bcryptjs')

router.get("/admin/users",(req, res) =>{
   User.findAll().then(users =>{
    res.render("admin/users/index", {users:users})
   }).catch(err =>{
    console.error(err)
    
   })

})

//exibir página de criação de usuário.
router.get("/admin/users/create",(req, res) =>{
    res.render("admin/users/create")
 })


 //rota para criar os usuários
 router.post("/users/create",(req, res) => {
     var email = req.body.email
     var password = req.body.password

     //criptografando. 
     var salt = bcrypt.genSaltSync(10)
     var hash = bcrypt.hashSync(password)

     //verificando se já tem email cadastrado no banco. 

     User.findOne({ where: { email: email}})
     .then( user => {
        if(user ==  undefined){ //email não cadastrado. 
            User.create({ 
                email:email, 
                password:hash
            }).then(() => {
                res.redirect("/admin/users")
                console.log("Criou")
            }).catch(err => {
                console.log(err)
                res.redirect("/")
            })
        }else {//email já cadastrado. 
            res.redirect("/admin/users/create")
            console.log("Não criou")
        }
     }).catch(err => {
        res.redirect("/admin/users/create")
        console.log(err)
     })
})


router.post("/users/delete",(req, res) =>{
    var id = req.body.id 

    if(id != undefined){
        if(!isNaN(id)){
            User.destroy({where: {id: id}})
            .then(() => {res.redirect("/admin/users")})
        }else{
            res.redirect("/admin/users")
        }
    }else{
        res.redirect("/admin/users")
    }
})

router.get("/admin/users/edit/:id",(req, res) =>{
    var id = req.params.id //id vindo do parametro das rotas
    
    //se não for numero vai da o redirect
    if(isNaN(id)){//corrigir esso 1abced 
        res.redirect("/admin/users")
    }


  //=====================================Atualizar no banco=========================  
    //pesquisando categorias no banco
    User.findByPk(id)
    .then(users => {
        if (users != undefined) {
            res.render("admin/users/edit",{users:users})
            
        } else {
            res.redirect("/admin/users")
        }

    }).catch(erro => { //caso ocorra erro na busca
        res.redirect("/admin/users")
    })

    
})


router.post("/users/update", (req, res) => {
    var id = req.body.id
    var email = req.body.email
    var password = req.body.password

    User.update({email:email,password:password},
    {where: {id:id}
})
    .then(users => {res.redirect("/admin/users")})
})

//rota formulário login
router.get("/login", (req, res) => {
    res.render("admin/users/login")
})

//rota logar

router.post("/authenticate", (req, res) => {
    var email= req.body.email
    var password= req.body.password

    //pesquisando usuario
    User.findOne({where: {email:email}})
    .then(user => {
        if (user != undefined) {
            console.log(user)
            //validando senha
            var correct =bcrypt.compareSync(password, user.password) //comparando senha da variavel com a do banco
            if (correct){
                //criando a sesão
                req.session.user = {
                    id:  user.id,
                    email: user.email
                }
                
                res.redirect("/admin/articles")
            }else{
                res.redirect("/login")
                
            }

        } else {
            res.redirect("/login")
            
        }
    })
    .catch(erro => {
        res.redirect("/login")
        console.log("=============================ERRO=======================")
        console.error(erro)
    })
})

router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/");
})
//Fim atualização
module.exports = router