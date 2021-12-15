import knex from 'knex';
import __dirname from './utils.js';

const db = knex({
    client: 'sqlite3',
    connection:{filename:__dirname+'/db/products.sqlite'}
})

export default db;
