import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFormations } from "../api";

export default function FormationDetail() {
  const { slug } = useParams();
  const [formation, setFormation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchFormations();
        if (Array.isArray(data)) {
          const found = data.find((f) => f.slug === slug);
          setFormation(found || null);
        }
      } catch (e) {
        setError("Impossible de charger la formation.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <div className="container section">Chargement…</div>;
  if (error) return <div className="container section alert alert--error">{error}</div>;
  if (!formation) return <div className="container section">Formation introuvable.</div>;

  return (
    <div>
      <div className="formationDetail__back">
        <Link to="/formations" className="btn btn--secondary">Retour aux formations</Link>
      </div>

      <div className="formationDetail__banner">
        <h1>{formation.title}</h1>
        {formation.short_description && (
          <p className="formationDetail__shortdesc">{formation.short_description}</p>
        )}
      </div>

      <div className="formationDetail__content">
        <p><strong>Durée :</strong> {formation.duration_years} ans</p>
        <p><strong>Catégorie :</strong> {formation.category}</p>
      </div>
    </div>
  );
}