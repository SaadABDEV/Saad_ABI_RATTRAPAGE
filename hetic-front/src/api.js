// URL du backend
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

// Toutes les formations
export async function fetchFormations() {
  const res = await fetch(`${API_URL}/formations`);
  return res.json();
}

// Une formation par slug
export async function fetchFormation(slug) {
  const res = await fetch(`${API_URL}/formations/${slug}`);
  return res.json();
}

// ✅ Alias pour compatibilité avec ton import actuel
export function fetchFormationBySlug(slug) {
  return fetchFormation(slug);
}

// Connexion
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}