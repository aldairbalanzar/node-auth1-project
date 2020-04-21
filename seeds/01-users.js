exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
        {username: 'joe', password: 'password'},
        {username: 'moe', password: 'password'},
        {username: 'bo', password: 'password'}
      ]);
    };