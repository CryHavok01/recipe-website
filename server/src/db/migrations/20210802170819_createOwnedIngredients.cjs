/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("ownedIngredients", (table) => {
    table.bigIncrements("id")
    table.string("name").notNullable()
    table.decimal("measurement").notNullable()
    table.string("unit").notNullable()
    table.text("description")
    table.bigInteger("userId").notNullable().unsigned().references("users.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("ownedIngredients")
}
