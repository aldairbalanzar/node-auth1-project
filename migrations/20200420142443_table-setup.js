exports.up = function(knex) {
    return knex.schema
    
    .createTable('users', tbl => {
      tbl.integer('id', 255).primary();
  
      tbl.string('username', 128)
        .notNullable()
      tbl.string('password', 128)
        .notNullable()
    })

      .createTable('foods', tbl => {
        tbl.integer('id', 255).primary();
        tbl.string('foodName', 255).unique().notNullable();
        tbl.text('description');
    })

    .createTable('user_foods', tbl => {
        //user foreign key
        tbl.integer('user_id', 255)
        .notNullable()
        .references('users.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

        //food foreign key
        tbl.integer('food_id', 255)
        .notNullable()
        .references('food.id')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

        tbl.primary(['user_id', 'food_id']);
    })
}
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('user_foods')
    .dropTableIfExists('foods')
    .dropTableIfExists('users')

  };