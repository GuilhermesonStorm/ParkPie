import { Column, PrimaryGeneratedColumn, Entity, Timestamp } from 'typeorm';

@Entity() 
export class Parking {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column("varchar")
    name: string;

    @Column("varchar")
    descricao: string;

    @Column("number")
    latitude: number;

    @Column("number")
    longitude: number;

    @Column("number")
    number_parking_spaces: number;

    @Column("varchar")
    time_opening: string;

    @Column("varchar")
    time_closing: string;

    @Column("number")
    price_hour: number;

    @Column("number")
    price_piecoins: number;

}