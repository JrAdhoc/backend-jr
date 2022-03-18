const homeView = (req,res)=>{
    res.render('home');
}
const loginView = (req,res)=>{
    res.render('login');
}



export default{
    homeView,
    loginView
}
