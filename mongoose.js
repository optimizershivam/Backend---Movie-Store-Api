const mongoose = require("mongoose")
const connection = mongoose.connect("mongodb+srv://shivam9006:shivam1234@cluster0.7mukwmn.mongodb.net/day9?retryWrites=true&w=majority")

const MovieSchema = new mongoose.Schema({
    
        title: String,
        year: String,
        genres: Array,
        ratings: [String],
        poster: String,
        contentRating: String,
        duration:String,
        releaseDate: String,
        averageRating: Number,
        originalTitle:String,
        storyline: String,
        actors: [String],
        imdbRating: Number,
        posterurl:String
    
    
})

const MovieModel = mongoose.model("movie",MovieSchema)

module.exports = {
    connection,
    MovieModel
}