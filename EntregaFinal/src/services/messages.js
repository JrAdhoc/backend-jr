import Messages from '../model/Message.js';
import GenericQueries from './genericQueries.js';

export default class MessageService extends GenericQueries{
    constructor(dao){
        super(dao,Messages.model);
    }
}