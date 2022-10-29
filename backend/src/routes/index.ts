import { Router, Request, Response } from 'express';
import { AgendamentosController } from '../controllers/AgendamentosController';
import { EstacionamentosControllers } from '../controllers/EstacionamentosControllers';

const router = Router();

const estacionamentoController = new EstacionamentosControllers();
const agendamentosController = new AgendamentosController();

router.post('/cadastrar-estacionamentos', estacionamentoController.create);
router.get('/listar-estacionamentos', estacionamentoController.read);
router.get('/listar-estacionamentos/:id', estacionamentoController.show);
router.put('/atualizar-estacionamento/:id', estacionamentoController.update);
router.delete('/deletar-estacionamentos/:id', estacionamentoController.delete);

router.post('/cadastrar-agendamentos', agendamentosController.create);
router.get('/listar-agendamentos', agendamentosController.read);
router.delete('/deletar-agendamentos/:id_appointment', agendamentosController.delete);

export default router;