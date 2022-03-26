import UserService from "../services/usersService.js";
import UserDTO from "../dtos/userDTO.js";

const userService = new UserService();

const getUsers = async(req,res)=>{
    let result = await userService.getUsers();
    let resultsDTO = result.map(user=>new UserDTO(user))
    res.send(resultsDTO);
}

const saveUser = async(req,res)=>{
    let user = req.body;
    let result = await userService.addUser(user);
    res.send(new UserDTO(result));
}

export default{
    getUsers,
    saveUser
}
