/*
banco de dados:
login: davidjr
senha: EgcL37qkFUw1ZsS9
*/
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.put("/usuarios/:id", async (req, res) => {
  console.log(req);

  await prisma.user.update({
    where: {
      id: req.params.id,
    },

    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.get("/usuarios", async (req, res) => {
  let users = [];
  
  if (req.query) {
    users = await prisma.user.findMany({
      where:{
        id: req.query.id
      }
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.status(200).json(users);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Usuario deletado" });
});

app.get("/", (req, res) => {
  res.send("Hello World, rodrigo");
});

console.log(port)

app.listen(port);
