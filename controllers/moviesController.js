let db = require('../db/models')
const Sequelize = require('sequelize')
let Op = Sequelize.Op;

module.exports = {
    all: (req,res)=>{
        db.Peliculas.findAll({
            include : [
                {
                    association : 'genero'
                },
                {
                    association : 'actores'
                }
            ]
        })
        .then(peliculas =>{
            return res.send(peliculas)
            
        })
        .catch(e=>{
            res.send(e)
        })
      
    },
    detail:(req,res)=>{
        db.Peliculas.findByPk(req.params.id)
        .then(pelicula=>{
            res.send(pelicula)
               
        
        })
        .catch(e=>{
            res.send(e)
        })
    },


    create:(req,res)=>{
        console.log(req.body)
            db.Peliculas.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                length: req.body.duracion,
                release_date: req.body.release_date,
                genre_id: req.body.genre_id
            })
            .then(result => res.send(result).status(201))
            .catch(e => res.send(e))
    },


    edit:(req,res)=>{
        db.Peliculas.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.duracion,
            release_date: req.body.fechaDeEstreno
            },
            {
            where:{
                id: req.params.id   
            }
        })
        .then(result => res.send(result).status(200))
        .catch(e=> res.send(e))
    },

    delete:(req,res)=>{
            db.Peliculas.destroy({
                where:{
                    id: req.params.id
                }
            })
            .then(result=>
                res.send('Pelicula borrada').status(200)
                )
            .catch(e => res.send(e))    
        },

    search: function(req,res){
        db.Peliculas.findAll({
            where:{
                title:{
                    [Op.substring]: req.body.search
                }
            }
        })
        .then(peliculas=>{
            res.send(peliculas)
                
            
        })
    }
}