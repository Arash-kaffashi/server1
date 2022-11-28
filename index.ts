import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(express.json());

let db = [{
  id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
  documentName: "Licitação Enap - Curso Web Dev",
  status: "Em andamento",
 details: "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
 dateInit: "28/11/2022",
 comments: ["Processo aberto", "Processo partiu para as partes assinarem",
"Processo agora está em análise final", "Processo já tem data final"],
 dateEnd: "16/12/2022",
 setor: "enap"
},
{
 id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
 documentName: "Licitação Compras - Notebooks",
 status: "Em andamento",
 details: "Processo de licitação para compra de notebooks",
 dateInit: "30/11/2022",
 comments: ["Processo em aberto e sem previsão de conclusão"],
 dateEnd: "",
 setor: "tre"
},
{
 id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
 documentName: "Licitação Compras - Ar Condicionado",
 status: "Finalizado",
 details: "Processo de licitação para compra de ar-condicionado",
 dateInit: "15/11/2022",
 comments: ["Processo em aberto", "Processo finalizado"],
 dateEnd: "25/11/2022",
 setor: "trj"
}
];

app.get('/all', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.post('/create', (req: Request, res: Response) => {});
app.put('/edit/:id', (req: Request, res: Response) => {});
app.delete('/delete/:id', (req: Request, res: Response) => {});


app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT}`);
});