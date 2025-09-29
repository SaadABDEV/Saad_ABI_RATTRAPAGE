import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imageHome from "../assets/images/IMAGE_HOME.jpg";
import { fetchFormations } from "../api";

export default function Home() {
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

  const byCategory = formations.reduce((acc, f) => {
    const cat = f.category || "Autre";
    (acc[cat] = acc[cat] || []).push(f);
    return acc;
  }, {});

  return (
    <div className="home">
      {/* --- Bannière Hero avec texte et overlay --- */}
      <header className="hero">
        <img src={imageHome} alt="Bannière" className="hero__bg" />
        <div className="hero__overlay"></div>

        <div className="hero__content">
          <h1 className="hero__title">
            L'école web hors norme et hors <br /> ParcourSup
          </h1>
        </div>
      </header>

      {/* --- Section formations --- */}
      <section className="home__section">
        <h2 className="home__title">Nos Formations</h2>

        {loading && <p>Chargement…</p>}
        {error && <p className="alert alert--error">{error}</p>}

        {!loading && !error && formations.length === 0 && (
          <p>Aucune formation publiée pour le moment.</p>
        )}

        {["Web", "Data", "Mixte"].map((cat) =>
          byCategory[cat]?.length ? (
            <div key={cat} className="home__block">
              <h3 className="home__catTitle">{cat}</h3>
              <div className="home__cards">
                {byCategory[cat].map((f) => (
                  <article key={f.id} className="card">
                    <h4 className="card__title">{f.title}</h4>
                    <p className="card__desc">
                      {f.short_description || "Description à venir."}
                    </p>
                    <p className="card__meta">
                      Durée : {f.duration_years} an{f.duration_years > 1 ? "s" : ""}
                    </p>
                    <Link className="btn btn--primary" to={`/formations/${f.slug}`}>
                      Voir le détail
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ) : null
        )}
      </section>
    </div>
  );
}