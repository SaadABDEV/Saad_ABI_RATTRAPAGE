import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { openapi } from "./swaggers.js";

import authRoutes from "./routes/auth.routes.js";
import formationsRoutes from "./routes/formations.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Swagger Docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi));

// Route test
app.get("/", (req, res) => {
  res.send("API HETIC fonctionne !");
});

// Routes principales
app.use("/api", authRoutes);
app.use("/api", formationsRoutes);

// 404 pour les routes inconnues
app.use((req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});

// ⚠️ Middleware global pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur serveur" });
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Backend running on http://localhost:${port}`)
);