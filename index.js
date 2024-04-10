import express from "express";
import bodyParser from 'body-parser';

const app = express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const today=()=>{
    let curDay=new Date();
    let options={weekday:'long', year:'numeric' , month:'long',day:'numeric'};
    let day=curDay.toLocaleDateString("en-US",options);
    return day;
}
const tItems=[];
const wItems=[];


app.get("/",(req,res)=>{ 
    res.render("index.ejs",{curDay:today(),items:tItems});
});

app.get("/work",(req,res) =>{
    res.render("work.ejs",{items:wItems});
  });

app.post("/",(req,res)=>{
    const itemName=req.body.newItem;
    tItems.push(itemName);
    res.redirect("/");
});

app.post("/work",(req,res)=>{
    const itemName=req.body.newItem;
    wItems.push(itemName);
    res.redirect("/work");
});

app.listen(port,()=>{
console.log(`Listening on port ${port}`);
})