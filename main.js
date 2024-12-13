
const express= require("express");
const app= express();
app.use(express.urlencoded({ extended: true}))
const moongo= require("mongoose");
const Artical= require("./modules/Artical");
const moment = require("moment");
const methodover = require("method-override");
// const { render } = require("ejs");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
app.use(session({
    secret: "loay2019",
    resave: false,
    saveUninitialized: true
}));
app.use(methodover("_method"))
moongo.connect("mongodb+srv://loay:loay2019@loay.b3uye.mongodb.net/?retryWrites=true&w=majority&appName=loay")
.then(()=>{
    console.log("yes")
}).catch(()=>{
    console.log("no")
})





app.get("/", (req, res) =>{
    res.render("home.ejs")
})

app.get("/logIn", (req, res) =>{
    res.render("logIn.ejs")
})

app.get("/signUp", (req, res) =>{
    res.render("signUp.ejs")
})

app.get("/menu", (req,res)=>{
    res.render("menu.ejs")
})

app.get("/addStudent", (req,res)=>{
    res.render("addStudent.ejs")
})

app.get("/addCourse", (req,res)=>{
    res.render("addCourse.ejs")
})

app.get("/register", (req,res) =>{
    res.render("register.ejs")
})

app.get("/show", (req,res) =>{
    res.render("show.ejs")
})

app.get("/viewStudent", async (req,res) =>{
    try{
        const user= await
        Artical.findOne({user:req.session.user}, "students")
         
            res.render("viewStudent.ejs", {students:user.students})
    } catch(err){
        console.log(err)
    }
})

app.get("/viewCorse", async (req,res) =>{
    try{
        const user= await
        Artical.findOne({user:req.session.user}, "courses")
         
            res.render("viewCorse.ejs", {courses:user.courses})
    } catch(err){
        console.log(err)
    }
})



app.post("/logIn", async (req, res) =>{ 
    const{user , pass} = req.body
    try{
        const newUser = new Artical({user , pass})
        await newUser.save();
        req.session.user=user;
        res.redirect("/menu");
        console.log(req.session.user)

    }catch (error){
        console.log(error)
        res.redirect("/logIn")
    };
})


app.post("/signUp", async (req, res) =>{
    const{user , pass} = req.body
    const usere = await
    Artical.findOne({ user })
    if(!usere){
        
        
    }
    else{
        if (usere.pass==req.body.pass){
           req.session.user=user;
           res.redirect("/menu")
        }else{
            res.redirect("/signUp")
        }   
    } 
})

app.post("/addStudent", async (req,res)=>{
    const student= req.body;
    try{
        const user= await
        Artical.findOne({user:req.session.user}) 
        if (!user) {
            console.log("user not found")
        }
        user.students.push(student)
        await user.save();
    } catch(error){
        console.log(error)
    }
    res.redirect("/addStudent");
})

app.post("/addCourse", async (req,res) =>{
    const course= req.body;
    try{
        const user= await
        Artical.findOne({user:req.session.user}) 
        if (!user) {
            console.log("user not found")
        }
        user.courses.push(course)
        await user.save();
    } catch(error){
        console.log(error)
    }
    res.redirect("/addCourse");
})








// app.delete("/abc/:id", (req,res) =>{
//     console.log("kkj")
//     Artical.findByIdAndDelete(req.params.id)
//     .then(()=>{
//         res.redirect("/")
//         console.log("ok")
//     }).catch((er)=>{
//         console.log(er)
//     })
// })

app.listen(PORT, ()=>{
    console.log("welcome to loay wep site");
})

