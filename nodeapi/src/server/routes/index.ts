import { Router } from 'express';
import { TransactionsController } from '../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/', ensureAuthenticated, (_, res) => {
  return res.send('Chamada realizada com sucesso');
});

router.get('/transactions', ensureAuthenticated, TransactionsController.getAllValidation, TransactionsController.getAll);
router.get('/transactions/:id', ensureAuthenticated, TransactionsController.getByIdValidation, TransactionsController.getById);
router.post('/transactions', ensureAuthenticated, TransactionsController.createValidation, TransactionsController.create);
router.put('/transactions/:id', ensureAuthenticated, TransactionsController.updateByIdValidation, TransactionsController.updateById);
router.delete('/transactions/:id', ensureAuthenticated, TransactionsController.deleteByIdValidation, TransactionsController.deleteById);

export { router };