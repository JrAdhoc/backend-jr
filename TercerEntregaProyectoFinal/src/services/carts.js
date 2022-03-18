import Cart from '../model/Cart.js';
import GenericQueries from './genericQueries.js';
import logger from '../utils/logger.js';

export default class CartService extends GenericQueries{
    constructor(dao){
        super(dao,Cart.model);
    }
    addProductCart = async(idCart,product)=>{
        try {
            let result = await this.dao.updateOne({_id:idCart}, {$push:{products:product}});
            return{status:"success",message:"Product loaded!", payload:result}
        } catch (error) {
            logger.error(error);
        }
    }
    removeProductCart = async(idCart,product)=>{
        try {
            const result = await this.dao.updateOne({_id:idCart},{$pull:{products:product}})
            return{status:"success",message:"Product deleted!",payload:result}
        } catch (error) {
            logger.error(error);
        }
    }
}
