const express = require("express")
const app = express()
app.use(express.json())

const {connection,MovieModel} = require("./mongoose")

app.get("/movies",async(req,res)=> {
    const data = await MovieModel.find()
    res.send(data)
})
// post 
app.post("/movies/post", async(req,res)=> {
    try{
    const data = await MovieModel.insertMany(req.body)
    res.send(data)
    }
    catch
    {
        res.send("err in posting movie")
    }

})
// delete 
app.delete("/movies/:name", async(req,res)=> {
    let name = req.params.name
    console.log('name', name)
    
    
    const data = await MovieModel.findOneAndDelete({title:name})
    
    // console.log(data)
    res.send(data)
  
})
// patch
app.put("/movies/:name", async(req,res) => {
    let name = req.params.name
    const {imdbRating} = req.body
    // console.log('name', name)
    const data = await MovieModel.updateOne({title:name},{"imdbRating":imdbRating})
    res.send(data)
})




// Filter
app.get("/movies/search", async(req,res)=> {
    const {title} = req.query
    const data = await MovieModel.find({title:title})
    res.send(data)
})
app.get("/movies/rating", async(req,res)=> {
    const {imdbRating} = req.query
    const data = await MovieModel.find({imdbRating:imdbRating})
    res.send(data)
})

app.get("/movies/all", async(req,res)=> {
    const {q} = req.query
    const data = await MovieModel.find({title:{$regex:q}})
    res.send(data)
})


app.get("/movies/page",async(req,res)=>{
    const{limit} = req.query
    const data = await MovieModel.find().limit(limit)
    res.send(data)
})

app.get("/movies/sort", async(req,res)=> {
    const {sortBy,feild} = req.query 
    const data = await MovieModel.find().sort({[feild]:sortBy=="asc" ? 1 :"dsc" ? -1 :null})
    res.send(data)
})
// obj = 

app.listen(8080,async()=> {
try {
    await connection
    console.log("Database connection Established")
}
catch {
    console.log("Database connection Failed")
}
console.log("Server Started")
})