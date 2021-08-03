/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("pantryMeasurements", (table) => {
    table.bigIncrements("id")
    table.decimal("amount").notNullable()
    table.string("unit").notNullable()
    table.text("description")
    table.bigInteger("userId").notNullable().unsigned().references("users.id")
    table.bigInteger("ingredientId").notNullable().unsigned().references("ingredients.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("pantryMeasurements")
}
