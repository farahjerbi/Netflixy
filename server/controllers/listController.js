const List = require("../models/List")


exports.create= async(req,res)=>{
    if( req.user.isAdmin){ 
        const newList = new List(req.body);
        try{
            const savedList = await newList.save()
            res.status(201).json(savedList)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json('You are not allowed')
    }}




// exports.update= async(req,res)=>{

//     if(req.user.isAdmin){
        
//         try{
//             const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{
//                 $set:req.body,
//             },{
//                 new:true
//             });
//             res.status(200).json(updatedMovie)
//         }catch(err){
//             res.status(500).json(err)
//         }
//     }else{
//         res.status(403).json('You are not allowed to update movie')
//     }};






exports.delete= async(req,res)=>{
    if( req.user.isAdmin){   
            try{
                 await List.findByIdAndDelete(req.params.id);
                 res.status(200).json('List has been deleted')
            }catch(err){
                res.status(500).json(err)
            }
    }else{
            res.status(403).json('You are not allowed to delete list')
        }};
    


exports.get = async(req,res)=>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list =[];
        try{
            if(typeQuery){
               if(genreQuery){
                list = await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery,genre:genreQuery}}
                ]);
               }else{
                list = await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery}}
                ])
               }
              
           }
            else {
                    list = await List.aggregate([{$sample:{size:10}}]);
            }
            res.status(200).json(list)
        }catch(err){
            res.status(500).json(err)
        }
    };



// exports.random = async(req,res)=>{
//     const type =req.query.type;
//     let movie;
//      try{
//         if(type === 'serie'){
//             movie = await Movie.aggregate([
//                 {$match:{isSerie : true}},
//                 {
//                 $sample:{size:1}
//                 }
//             ]);
//         }else{
//             movie = await Movie.aggregate([
//                 {$match:{isSerie : false}},
//                 {
//                 $sample:{size:1}
//                 }
//             ]);
//         }
//         res.status(200).json(movie)

//     }catch(err){
//             res.status(500).json(err)
//         }
//     };
 



// exports.getAll = async(req,res)=>{
//     try{
//         const movie= await Movie.find();
//         res.status(200).json(movie.reverse())
//     }catch(err){
//         res.status(500).json(err)
//     }
// };