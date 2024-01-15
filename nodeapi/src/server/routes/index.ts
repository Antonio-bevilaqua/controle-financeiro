import { Router } from 'express';
import { TransactionsController } from '../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Chamada realizada com sucesso');
});

router.get('/transactions', TransactionsController.getAllValidation, TransactionsController.getAll);
router.get('/transactions/:id', TransactionsController.getByIdValidation, TransactionsController.getById);

export { router };