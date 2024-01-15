import { server } from './server/Server';

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3333}`);
  });
};

startServer();