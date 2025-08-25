/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("word", (table) => {
    table.increments("id").primary();
    table.string("word", 1000).notNullable().unique();
    table.string("translate", 1000).notNullable();
    table.string("examples", 4000).notNullable();
    table.string("notes", 4000).notNullable();

    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down() {}
