import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

const app: Express = express();
app.use(express.json());

type Process = {
  id: string;
  documentName: string;
  status: "Em andamento" | "Finalizado";
  details: string;
  dateInit: string;
  comments: string[];
  dateEnd: string;
  setor: string;
};

const PROCESS: Process = {
  id: uuidv4(),
  documentName: "",
  status: "Em andamento",
  details: "",
  dateInit: "",
  comments: [""],
  dateEnd: "",
  setor: "",
};

let db: Process[] = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54172",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

function getRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

app.get("/all", (_, res: Response) => {
  return res.status(200).json(db);
});
app.post("/create", (req: Request, res: Response) => {
  let process: Process = Object.assign({}, PROCESS, req.body);
  db.push(process);
  return res.status(201).json(db);
});
app.put("/edit/:id", (req: Request, res: Response) => {
  let { id } = req.params;
  const index = db.findIndex((obj) => obj.id === id);

  if (index === -1)
    return res.status(404).json({ msg: `Não encontrado. ID: ${id}` });

  db.splice(index, 1, Object.assign({}, PROCESS, req.body));

  return res.status(200).json(db);
});
app.delete("/delete/:id", (req: Request, res: Response) => {
  let { id } = req.params;
  const index = db.findIndex((obj) => obj.id === id);

  if (index === -1)
    return res.status(404).json({ msg: `Não encontrado. ID: ${id}` });

  db.splice(index, 1);

  return res.status(200).json(db);
});

/*
Acessar um processo pelo ID GET /process/:id
Adicionar um comentário a array de comentários PUT /addComment/:id
Acessar todos processos em andamento GET /status/open
Acessar todos processos finalizados GET /status/close
*/

app.get("/process/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const reqProcess = db.find((obj) => obj.id === id);

  if (reqProcess === undefined) return res.status(404).json(db);

  return res.status(200).json(reqProcess);
});

app.put("/addComment/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const reqProcess = db.find((obj) => obj.id === id);

  if (reqProcess === undefined) return res.status(404).json(db);

  const { comment } = req.body;

  if (Array.isArray(comment)) reqProcess.comments.push(...comment);
  else if (typeof comment === "string") reqProcess.comments.push(comment);
  else
    return res
      .status(403)
      .json({ msg: `Forbiden. 'comment' is ${typeof comment}` });

  return res.status(200).json(reqProcess);
});

app.get("/status/:status", (req: Request, res: Response) => {
  const status = { open: "Em andamento", close: "Finalizado" }[
    req.params.status
  ];

  let found = db.filter((obj) => obj.status === status);

  if (found.length === 0) return res.status(404).json(db);

  return res.status(200).json(found);
});

app.get("/setor/:nomeSetor", (req: Request, res: Response) => {
  const { nomeSetor } = req.params;

  let found = db.filter(
    (obj) => obj.setor.toLowerCase() === nomeSetor.toLowerCase()
  );
  if (found.length === 0) return res.status(404).json(db);

  return res.status(200).json(found);
});

app.get("/random", (_, res: Response) => {
  res.status(200).json(getRandom(db));
});

app.listen(process.env.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
  );
});
