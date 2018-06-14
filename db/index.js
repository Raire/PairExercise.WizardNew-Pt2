const {Client} = require('pg');
const client = new Client('postgres://localhost/wnews');

client.connect();

module.exports = client;
