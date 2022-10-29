import { Request, Response } from 'express';
import connection from '../database/connection';

class AgendamentosController {
  async create(request: Request, response: Response) {
    const {
      id_estacionamento,
      data,
      time_enter,
      time_exit,
    } = request.body;

    const agendamento = {
      id_estacionamento,
      data,
      time_enter,
      time_exit,
    }

    const create = await connection('agendamentos').insert(agendamento);

    const id_appointment = create[0];

    return response.json({
      id_appointment,
      ...agendamento
    })
  };

  async read(request: Request, response: Response) {
    const agendamentos = await connection('agendamentos').select('*');

    return response.json(agendamentos)
  }

  async delete(request: Request, response: Response) {
    const {
      id_appointment
  } = request.params;

    const deleteAgendamento = await connection('agendamentos').where('id_appointment', id_appointment).delete()
    
    return response.json(deleteAgendamento)
  }
}

export { AgendamentosController }