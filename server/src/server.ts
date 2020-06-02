import express from 'express';
import routes from './routes';

import path from 'path';

const app =  express();

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(process.env.PORT || 3333, () => {
  console.log("Servidor executando na porta 3333! 🚀");
})