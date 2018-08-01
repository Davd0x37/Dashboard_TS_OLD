"use strict";
// @ts-ignore
import express from "express";
import { resolve } from "path";

// @ts-ignore
const app = express()

app.use(express.static(resolve(__dirname, ".")));

app.get("/", (_: express.Request, res: express.Response) => {
  res.sendFile(resolve(__dirname, "./index.html"));
});

app.listen(3030, () => (console.log("Listening at port: 3030")));
