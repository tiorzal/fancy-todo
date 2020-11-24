const {Todo}= require('../models')
class TodoController{

  static async create(req,res,next){
    const newTodo = {
      tittle : req.body.tittle,
      description : req.body.description,
      status : req.body.status,
      due_date: req.body.due_date,
      UserId: req.currentUser.id
    }
    
    try{
      const data = await Todo.create(newTodo)   
      res.status(201).json(data)
    }catch(error){
      next(error)
    }
  }

  static async findAll(req,res,next){
    try{
      const todos =  await Todo.findAll()
      res.status(200).json(todos)
    }catch(error){
      next(error)
    }
  }

  static async findOne(req,res,next){
    try{
      const id = +req.params.id
      const todo = await Todo.findOne({where: {id:id}})
      res.status(200).json(todo)
    }catch(error){
      next({status: 404, message:'data not found'})
    }
  }

  static async editPut(req,res,next){
    const id = req.params.id
    const editedTodo = {
      tittle : req.body.tittle,
      description : req.body.description,
      status : req.body.status,
      due_date: req.body.due_date,
      UserId: req.currentUser.id
    }
    try{
      const data = await Todo.update(editedTodo,{where : {id:id}, returning:true})
      if(data[0] > 0){
        res.status(200).json(data)
      }else{
        throw {status: 404, message:'data not found'}
      }
    }catch (error) {
      next(error)
    }
  }

  static async editPatch(req,res,next){
    const id = req.params.id
    const editedTodo = {
      status : req.body.status
    }
    try{
      const data = await Todo.update(editedTodo,{where : {id:id}, returning:true})
      if(data[0] > 0){
        res.status(200).json(data)
      }else{
        throw {status:  404, message: 'Id not found'}
      }
    }catch (error) {
      next(error);
    }
  }

  static async delete(req,res,next){
    const id = req.params.id
    try {
      const data = await Todo.destroy({where: {id:id},returning:true})
      if(data>0){
        res.status(200).json({message:'todo success to delete'})
      }else{
        throw {status:  404, message: 'Id not found'}
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController

