import { Request, Response } from 'express';
import connection from '../database/connection';

class EstacionamentosControllers {
    async create(request: Request, response: Response){
        const {
            name, 
            descricao, 
            latitude,
            longitude,
            number_parking_spaces,
            time_opening,
            time_closing,
            price_hour,
            price_piecoins

        } = request.body;
        const estacionamento = {
            name, 
            descricao, 
            latitude,
            longitude,
            number_parking_spaces,
            time_opening,
            time_closing,
            price_hour,
            price_piecoins
        }
        const create = await connection('estacionamentos').insert(estacionamento);

        const id = create[0];

        return response.json({
            id, 
            ...estacionamento
        });
    }
    async read(request: Request, response: Response){
        const estacionamentos = await connection('estacionamentos').select('*');

        return response.json(estacionamentos);
    }

    async show(request: Request, response: Response){
        const {
            id
        } = request.params;
        const estacionamento = await connection('estacionamentos').where('id', id)

        return response.json(estacionamento[0]);
    }
    
    async update(request: Request, response: Response){
        const {
            id
        } = request.params;
        const {
            name, 
            descricao, 
            latitude,
            longitude,
            number_parking_spaces,
            time_opening,
            time_closing,
            price_hour,
            price_piecoins
        } = request.body;

        const update = {
            name, 
            descricao, 
            latitude,
            longitude,
            number_parking_spaces,
            time_opening,
            time_closing,
            price_hour,
            price_piecoins
        };

        const updates = await connection('estacionamentos').where('id', id).update(update);

        return response.json({
            id,
            ...update
        });


    }
    async delete(request: Request, response: Response){
        const {
            id
        } = request.params;

        const deleteEstacionamento = await connection('estacionamentos').where('id', id).delete();

        response.json(deleteEstacionamento);
    }
}

export { EstacionamentosControllers }