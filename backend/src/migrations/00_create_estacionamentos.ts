import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('estacionamentos', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('descricao').notNullable();
        table.double('latitude').notNullable();
        table.double('longitude').notNullable();
        table.integer('number_parking_spaces').notNullable();
        table.string('time_opening').notNullable();
        table.string('time_closing').notNullable();
        table.double('price_hour').notNullable();
        table.double('price_piecoins').notNullable();
    })
}
export async function down(knex: Knex) {
    return knex.schema.dropTable('estacionamentos')
}