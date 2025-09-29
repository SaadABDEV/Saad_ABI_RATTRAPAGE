import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFormations } from "../api";

export default function Formations() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFormations();
        setFormations(Array.isArray(data) ? data : []);
      } catch (e) {
        setError("Impossible de charger les formations.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="container section">Chargement…</div>;
  if (error) return <div className="container section alert alert--error">{error}</div>;

  // Regrouper par catégorie
  const byCategory = formations.reduce((acc, f) => {
    const cat = f.category || "Autre";
    (acc[cat] = acc[cat] || []).push(f);
    return acc;
  }, {});

  return (
    <div className="formations container section">
      <h1 className="formations__title">Formations</h1>

      {formations.length === 0 ? (
        <p>Aucune formation disponible.</p>
      ) : (
        ["Web", "Data", "Mixte"].map((cat) =>
          byCategory[cat]?.length ? (
            <div key={cat} className="formations__block">
              <h2 className="formations__cat">{cat}</h2>
              <div className="formations__grid">
                {byCategory[cat].map((f) => (
                  <div key={f.id} className="card">
                    <h3 className="card__title">{f.title}</h3>
                    <p className="card__desc">{f.short_description || "Description à venir."}</p>
                    <p className="card__meta">
                      Catégorie : {f.category} • Durée : {f.duration_years} an
                      {f.duration_years > 1 ? "s" : ""}
                    </p>
                    <Link to={`/formations/${f.slug}`} className="btn btn--secondary">
                      Voir détails
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
}