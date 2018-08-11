import connect from './connectdb';

export const close = knex => knex.destroy();

export default config => require('knex')(connect(config)); 