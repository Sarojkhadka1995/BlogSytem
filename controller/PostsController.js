var Post=require('../model/Post')

exports.index=(req,res)=>{
    Post.find((err,doc)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            res.render("pages/index",{
                post:doc
                })
        }
    })
    
}

exports.createpost=(req,res)=>{
    if(!req.body.title){
        res.render("posts/createblog")
    }else{
        var post=new Post();
        post.title=req.body.title;
        post.body=req.body.postbody;

        post.save((err,doc)=>{
            if(err){
                console.log(err);
                res.status(500).send()
            }else{
                res.redirect('/dashboard')
            }
        })
    }
}


exports.dashboard=(req,res)=>{
    console.log(req.user);
    Post.find((err,doc)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            res.render("pages/dashboard",{
                post:doc,
                user:req.user
                })
        }
    })
}

//Display selected post
exports.view=(req,res)=>{
    Post.findById(req.params.id,(err,doc)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            res.render('posts/show',{
                post:doc
            })
        }
    })
}

//Update post
exports.editform=(req,res)=>{
    Post.findById(req.params.id,(err,doc)=>{
        if(err){
            console.log(err)
            res.status(500).send()
        }else{
            res.render('posts/editform',{
                post:doc
            })
        }
    })
}

exports.editpost=(req,res)=>{
    Post.findOneAndUpdate({ _id: req.params.id }, {title:req.body.title,body: req.body.postbody}, { returnNewDocument: true,upsert:true }, (err, doc) => {
        if (!err) { 
            res.redirect('/dashboard'); 
        }else {
            res.render("posts/show",{
                post:req.body
            });
            console.log('Error during record update : ' + err);
        }
    });
}

//Delete post
exports.deletepost=(req,res)=>{
    Post.findByIdAndRemove({_id:req.params.id},(err,doc)=>{
        if(err){
            console.log(err)
            res.status(500).send()
        }else{
            res.redirect('/dashboard');
        }
    })
}



exports.loggedin=(req,res)=>{
    res.send(req.user)
}