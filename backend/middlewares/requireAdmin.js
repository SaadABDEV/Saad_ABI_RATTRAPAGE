import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Token manquant" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== "admin") {
      return res.status(403).json({ error: "Accès interdit" });
    }
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
}