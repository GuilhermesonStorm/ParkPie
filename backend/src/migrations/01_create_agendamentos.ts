import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('agendamentos', table => {
        table.increments('id_appointment').primary();
        table.integer('id_estacionamento').notNullable().references('id').inTable('estacionamentos');
        table.string('data').notNullable();
        table.string('time_enter').notNullable();
        table.string('time_exit').notNullable();
    })
}
export async function down(knex: Knex) {
    return knex.schema.dropTable('agendamentos')
}