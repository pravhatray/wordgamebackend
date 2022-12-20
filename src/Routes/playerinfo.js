const express = require("express");
const Playerinfo= require("../Models/playerinfo")
var randomWords=require("random-words")
const app = express.Router();


app.get("/random", async (req, res) => {
  let word = await randomWords({exactly: 2,maxLength: 4,join: ''});
  res.send(word);
});

app.get("/playzone", async (req, res) => {

  let token = req.headers.token;

  if (token) {
        let [id, name, dificultylevel] = token.split(":");
        let player = await Playerinfo.findById();
    
        if ( id ) {
          if(dificultylevel=="Low")
          {
            
            let randomword = await randomWords({exactly: 1,maxLength: 5,join: ''})
            res.send(randomword);
          }
          else if(dificultylevel=="Medium")
          {
            
            let randomword = await randomWords({exactly: 2,maxLength: 7,join: '' })
            res.send(randomword);
           
          }
          else if(dificultylevel=="High")
          {
            
            let randomword = await randomWords({exactly: 4, maxLength: 8,join: '' })
            res.send(randomword);
        
          }
         
        } else {
          res.status(401).send("User is not authenticated regiter please line 1");
        }
      } else {
        res.status(401).send("User is not authenticated regiter please");
      }






   
});


app.get("/", async (req, res) => {
  let player = await Playerinfo.find();
  res.send(player);
});

app.get("/filterlevel", async (req, res) => {
  const { q } = req.query;
  console.log(q);
  try {
    const filterlevel = await Playerinfo.find({ dificultylevel: q });
    res.status(200).send(filterlevel);
  } catch (er) {
    return res.status(404).send({ msg: er.message });
  }
});

app.get("/sort/:type", async (req, res) => {
 const {type} =req.params;

 try{
  if(type==="dec")
  {
    let updated=await Playerinfo.find().sort({score:-1});
    res.send(updated)
  }
  else if(type==="inc"){
    let updated=await Playerinfo.find().sort({score:1});
    res.send(updated)
  }
 }catch(er){
  res.status(404).send(er.message)
 }
 
  
});


app.get("/", async (req, res) => {
  const { page = 1, limit = 5} = req.query;
  try {
    const allPlayerinfo = await Playerinfo.find();
    const Playerinfo = await Playerinfo.find()
     
      .skip((page - 1) * limit)
      .limit(limit);
    
    res.status(200).send({ Playerinfo, total: allPlayerinfo });
  } catch (er) {
    return res.status(404).send({ msg: er.message });
  }
});

app.get("/", async (req, res) => {
  let Playerinfo = await Playerinfo.find();
  res.send(Playerinfo);
});

app.post("/addplayer", async (req, res) => {
  let {name,dificultylevel } = req.body;
  try {
    let playerpost = await Playerinfo.create(req.body);
    res.send({
      token: `${playerpost.id}:${playerpost.name}:${playerpost.dificultylevel}:${playerpost.score}`,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.patch("/:id", async (req, res) => {
 
  let {id}=req.params
  try {
    let playerpost = await Playerinfo.findByIdAndUpdate(id, { $set: { score: req.body.score } }, { new: true });
    res.send({
      token: `${playerpost.id}:${playerpost.name}:${playerpost.dificultylevel}`,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});




module.exports = app;
