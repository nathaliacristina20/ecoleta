import express from 'express';

const app =  express();

app.listen(process.env.PORT || 3333, () => {
  console.log("Servidor executando na porta 3333! 🚀");
})