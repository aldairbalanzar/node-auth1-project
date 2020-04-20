exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('foods').insert([
        {foodName: 'pizza'},
        {foodName: 'burger'},
        {foodName: 'grilled chicken'}
      ]);
    };
