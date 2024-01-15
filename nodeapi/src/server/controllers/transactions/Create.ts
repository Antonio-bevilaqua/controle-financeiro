import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';
import { ITransactions } from '../../database/models';
import { TransactionsProvider } from '../../database/providers/transactions';

interface IBodyProps extends Omit<ITransactions, 'id' | 'created_at' | 'updated_at'>{}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    user_id: yup.string().required().default(''),
    type: yup.string().required().default(''),
    description: yup.string().required().default(''),
    value: yup.number().required(),
    date: yup.date().required().default(new Date),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await TransactionsProvider.create(req.body);

  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};