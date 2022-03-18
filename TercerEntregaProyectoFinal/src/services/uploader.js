import multer from 'multer';
import __dirname from '../utiles.js';

export const uploader = multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,__dirname+'/public/images');
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+file.originalname);
        }
    })
})
