import { userDao } from "../models/users.js";

export default class UserServices {
    getUsers = async() =>{
        try {
            let result = await userDao.find();
            return result;
        } catch (error) {
            throw new Error("Cant get users");
        }
    }

    saveUser = async(user)=>{
        try {
            let result = await userDao.create(user);
            return result;
        } catch (error) {
            throw new Error("Cant save user");
        }
    }

    deleteUser = async(_id)=>{
        try {
            let result = await userDao.findOneAndDelete(_id);
            return result;
        } catch (error) {
           throw new Error("Cant delete user"); 
        }
    }
}