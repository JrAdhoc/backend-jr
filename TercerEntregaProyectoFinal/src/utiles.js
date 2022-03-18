import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export let timestamp = ()=>{
    let fecha = new Date();
    let timestamp = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
    return{timestamp}
}

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))

export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);

export default __dirname;