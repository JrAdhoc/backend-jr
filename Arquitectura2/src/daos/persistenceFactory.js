import config from "../config/config.js";

export default class PersistenceFactory{
    static getPersistence = async()=>{
        switch(config.app.persistence){
            case "ARRAY":
                let {default:UserDaoArray} = await import('./usersDaoArray.js');
                return new UserDaoArray();
            case "FILE":
                let {default:UserDaoFile} = await import('./usersDaoFile.js');
                return new UserDaoFile();
            case "DB":
                let {default:UserDaoDB} = await import('./usersDaoDB.js');
                return new UserDaoDB();
        }
    }
}