const express = require('express')
const router = express.Router()
const Question = require('../db/questions')
const Response = require('../db/response')




router.get('/questions',(req,res)=>{
    res.render('questions/index')
})


router.post('/save',(req,res)=>{
   let title = req.body.title
   let body = req.body.body

   Question.create({
        title:title,
        body:body
   }).then(()=>{
        res.redirect('/')
   })
   
})

router.get('/questions/:id', (req,res)=>{
     let id = req.params.id

     Question.findOne({where: {id:id}}).then((questions)=>{
          if(questions != undefined){

          Response.findAll({where:{responseId: questions.id}, order:[['id','DESC']]}).then((response)=>{
               res.render('questions/views', {questions:questions, response:response})
          })
 
          } else{
               res.redirect('/')
          }
     })
})

router.post('/response', (req,res)=>{
     let body = req.body.body
     let responseId = req.body.question

     Response.create({
          body:body,
          responseId:responseId
     }).then(()=>{
          res.redirect('/questions/' + responseId)
     })

})













module.exports = router