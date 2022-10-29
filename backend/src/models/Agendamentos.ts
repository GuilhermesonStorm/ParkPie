import { Column, PrimaryGeneratedColumn, Entity, Timestamp } from 'typeorm';

@Entity() 
export class Agendamentos {
    @PrimaryGeneratedColumn("uuid")
    id_appointment: number;

    @Column('number')
    id_estacionamento: number;

    @

}