import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';
import { ITransactions } from '../../database/models';
import { TransactionsProvider } from '../../database/providers/transactions';

interface IBodyProps extends Omit<ITransactions, 'id' | 'user_id' | 'created_at' | 'updated_at'>{}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    type: yup.string().required().default(''),
    description: yup.string().required().default(''),
    value: yup.number().required(),
    date: yup.date().required().default(new Date),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const headerValue_user_id = req.headers['user_id'];
  
  if (!headerValue_user_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Você precisa enviar um token'
      }
    });
  }

  const user_id = Array.isArray(headerValue_user_id) ? headerValue_user_id[0] : headerValue_user_id;

  const result = await TransactionsProvider.create(user_id, req.body);

  if (result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};