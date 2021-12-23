import knex from 'knex';
import __dirname from './utils.js';

export const db = knex({
    client: 'sqlite3',
    connection:{filename:__dirname+'/db/products.sqlite'}
})

export const chatsdb = knex({
    client: 'sqlite3',
    connection:{filename:__dirname+'/db/chats.sqlite'}
})
