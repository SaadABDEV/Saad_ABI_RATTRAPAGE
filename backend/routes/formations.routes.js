import { Router } from "express";
import pool from "../db.js";
import { requireAdmin } from "../middlewares/requireAdmin.js";

const router = Router();




router.get("/formations", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, title, slug, category, duration_years, short_description, modality, start_month
       FROM formations
       WHERE is_published = true
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /formations error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});





router.get("/formations/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const { rows } = await pool.query(
      `SELECT id, title, slug, category, duration_years, short_description, content, modality, start_month
       FROM formations
       WHERE slug = $1 AND is_published = true
       LIMIT 1`,
      [slug]
    );
    const formation = rows[0];
    if (!formation) return res.status(404).json({ error: "Formation introuvable" });
    res.json(formation);
  } catch (err) {
    console.error("GET /formations/:slug error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});




router.get("/admin/formations", requireAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, title, slug, category, duration_years, is_published
       FROM formations
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /admin/formations error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});




router.patch("/admin/formations/:id/publish", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE formations
       SET is_published = true, updated_at = NOW()
       WHERE id = $1
       RETURNING id, title, is_published`,
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "Formation introuvable" });
    res.json({ success: true, message: "Formation publiée", formation: result.rows[0] });
  } catch (err) {
    console.error("PATCH /admin/formations/:id/publish error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});




router.patch("/admin/formations/:id/unpublish", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE formations
       SET is_published = false, updated_at = NOW()
       WHERE id = $1
       RETURNING id, title, is_published`,
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: "Formation introuvable" });
    res.json({ success: true, message: "Formation dépubliée", formation: result.rows[0] });
  } catch (err) {
    console.error("PATCH /admin/formations/:id/unpublish error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;