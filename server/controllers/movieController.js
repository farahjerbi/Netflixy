const Movie = require("../models/Movie")


exports.create= async(req,res)=>{
    if( req.user.isAdmin){ 
        const newMovie = new Movie(req.body);
        try{
            const savedMovie = await newMovie.save()
            res.status(201).json(savedMovie)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json('You are not allowed')
    }}




exports.update= async(req,res)=>{

    if(req.user.isAdmin){
        
        try{
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{
                new:true
            });
            res.status(200).json(updatedMovie)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json('You are not allowed to update movie')
    }};






exports.delete= async(req,res)=>{
    if( req.user.isAdmin){   
            try{
                 await Movie.findByIdAndDelete(req.params.id);
                 res.status(200).json('Movie has been deleted')
            }catch(err){
                res.status(500).json(err)
            }
    }else{
            res.status(403).json('You are not allowed to delete movie')
        }};
    


exports.get = async(req,res)=>{
        try{
            const movie= await Movie.findById(req.params.id);
            res.status(200).json(movie)
        }catch(err){
            res.status(500).json(err)
        }
    };



exports.random = async(req,res)=>{
    const type =req.query.type;
    let movie;
     try{
        if(type === 'serie'){
            movie = await Movie.aggregate([
                {$match:{isSerie : true}},
                {
                $sample:{size:1}
                }
            ]);
        }else{
            movie = await Movie.aggregate([
                {$match:{isSerie : false}},
                {
                $sample:{size:1}
                }
            ]);
        }
        res.status(200).json(movie)

    }catch(err){
            res.status(500).json(err)
        }
    };
 



exports.getAll = async(req,res)=>{
    try{
        const movie= await Movie.find();
        res.status(200).json(movie.reverse())
    }catch(err){
        res.status(500).json(err)
    }
};



