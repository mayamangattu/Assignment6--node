const express = require('express')
const { ObjectId } = require('mongodb')
const restaurantsMiniApp = express.Router()
const mongoUtil = require('../mongoutil')

//read the body
restaurantsMiniApp.use(express.json())

//gets all the restaurants

restaurantsMiniApp.get('/restaurants',async (req,res)=>{
   
 //get the docs from restaurants coll

   try{
    const cursor = await mongoUtil.getDocs('Assignment6','restaurants')
    const restaurants = await cursor.toArray()
    res.send(restaurants)
  }catch(err){
    res.send(err.message)
       .sendStatus(500)
   }
 })

// the filters 
restaurantsMiniApp.post('/filters',async (req,res)=>{

   /*  The below is the post object
         {
            "city":"Pune",
            "address": "FC Road",
            "costfortwo": "1000 - 1500",
            "mealtypes": "NightLife",
            "cuisines": {"$in":["North Indian","Fast Food"]}
         }
   */
   const query = req.body
   try {

     const cursor = await mongoUtil.getDocs("Assignment6","restaurants",query)
     const restaurants = await cursor.toArray()
     res.json(restaurants)

   } catch (error) {
      res.send(error.message)
         .sendStatus(500)
   }

})


module.exports= restaurantsMiniApp