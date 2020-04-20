exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').insert([
        {username: 'joe'},
        {username: 'moe'},
        {username: 'bo'}
      ]);
    };