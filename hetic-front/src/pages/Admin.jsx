import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function Admin() {
  const [formations, setFormations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshList = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/admin/formations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/connexion");
        return;
      }
      const data = await res.json();
      setFormations(Array.isArray(data) ? data : []);
    } catch (e) {
      setError("Impossible de charger les formations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshList();
  }, []);

  const publish = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/admin/formations/${id}/publish`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      await refreshList();
    } catch (e) {
      alert("Erreur lors de la publication.");
    }
  };

  const unpublish = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/admin/formations/${id}/unpublish`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      await refreshList();
    } catch (e) {
      alert("Erreur lors de la dépublication.");
    }
  };

  if (loading) return <p className="container">Chargement…</p>;
  if (error) return <p className="container alert alert--error">{error}</p>;

  return (
    <div className="container section">
      <h1>Espace Admin</h1>
      {formations.length === 0 ? (
        <p>Aucune formation.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Durée</th>
              <th>Publié ?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formations.map((f) => (
              <tr key={f.id}>
                <td>{f.title}</td>
                <td>{f.category}</td>
                <td>{f.duration_years} ans</td>
                <td>{f.is_published ? "Oui" : "Non"}</td>
                <td>
                  {f.is_published ? (
                    <button
                      className="btn btn--secondary"
                      onClick={() => unpublish(f.id)}
                    >
                      Dépublier
                    </button>
                  ) : (
                    <button
                      className="btn btn--primary"
                      onClick={() => publish(f.id)}
                    >
                      Publier
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}