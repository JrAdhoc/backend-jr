import UserServices from "../services/userService.js";

const userService = new UserServices();

const getUsers = async(req,res)=>{
    let result = await userService.getUsers();
    res.send(result);
}

const saveUser = async(req,res)=>{
    try {
        console.log(req.body);
        let {first_name,last_name,email} = req.body;
        if(!first_name||!last_name||!email)throw new Error("Incomplete Values");
        let result = await userService.saveUser({first_name,last_name,email});
        res.send(result);    
    } catch (error) {
        res.status(400).send({error:"Incomplete Values"});
    }
}

const deleteUser = async(req,res)=>{
        let id = req.body;
        let result = await userService.deleteUser(id);
        res.send({message:"USER DELETED: ",payload:result})
}

export default{
    getUsers,
    saveUser,
    deleteUser
}
