import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import viewsRouter from './routes/views.js';
import sessionsRouter from './routes/sessions.js';

const app = express();
const PORT = 4001;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

app.use(express.static(__dirname+'/public'))
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use('/',viewsRouter);
app.use('/login', sessionsRouter)
