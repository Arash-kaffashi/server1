import express from "express";
import { v4 as uuidv4 } from "uuid";

import db from "../mock/db.json" assert { type: "json" };

const processRoute = express.Router();

function getRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

processRoute.get("/all", (_, res) => {
  return res.status(200).json(db);
});

processRoute.get("/random", (_, res) => {
  res.status(200).json(getRandom(db));
});

processRoute.get("/status/:status", (req, res) => {
  const status = { open: "Em andamento", close: "Finalizado" }[
    req.params.status
  ];

  let found = db.filter((obj) => obj.status === status);

  if (found.length === 0)
    return res.status(404).json({ msg: "Nenhum processo encontrado." });

  return res.status(200).json(found);
});

processRoute.get("/setor/:nomeSetor", (req, res) => {
  const { nomeSetor } = req.params;

  let found = db.filter(
    (obj) => obj.setor.toLowerCase() === nomeSetor.toString().toLowerCase()
  );
  if (found.length === 0) return res.status(404).json(db);

  return res.status(200).json(found);
});

processRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const reqProcess = db.find((obj) => obj.id === id);

  if (reqProcess === undefined)
    return res
      .status(400)
      .json({ msg: `Process not found. Provided ID: ${id}` });

  return res.status(200).json(reqProcess);
});

processRoute.post("/create", (req, res) => {
  let process = {
    id: uuidv4(),
    documentName: "",
    status: "Em andamento",
    details: "",
    dateInit: "",
    comments: [],
    dateEnd: "",
    setor: "",

    ...req.body,
  };

  db.push(process);

  return res
    .status(201)
    .json({ msg: "Process successfully added", id: process.id });
});

function getById<T extends { id: string }>(
  db: Array<T>,
  id: string
): [T, number] {
  for (let index = 0; index < db.length; index++) {
    let process = db[index];
    if (process.id === id) return [process, index];
  }
  throw { msg: "Process not found! Given id: " + id };
}

processRoute.put("/edit/:id", (req, res) => {
  let { id } = req.params,
    process,
    index;

  try {
    [process, index] = getById(db, id);
  } catch (error) {
    return res.status(404).json(error);
  }

  db.splice(index, 1, { ...process, ...req.body });
  return res.status(200).json(db);
});

processRoute.delete("/delete/:id", (req, res) => {
  let { id } = req.params,
    index;

  try {
    [, index] = getById(db, id);
  } catch (error) {
    return res.status(404).json(error);
  }
  db.splice(index, 1);
  return res.status(200).json({ msg: "Processo deletado com sucesso" });
});

processRoute.put("/addComment/:id", (req, res) => {
  let { id } = req.params,
    process;

  try {
    [process] = getById(db, id);
  } catch (error) {
    return res.status(404).json(error);
  }

  const { comment } = req.body;

  if (Array.isArray(comment)) process.comments.push(...comment);
  else if (typeof comment === "string") process.comments.push(comment);
  else
    return res.status(403).json({
      msg: `Forbiden. 'comment' type: '${typeof comment}' is not supported.`,
    });

  return res.status(200).json(process);
});

export default processRoute;
