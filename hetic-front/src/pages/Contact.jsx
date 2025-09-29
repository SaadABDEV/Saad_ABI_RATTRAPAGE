import React from "react";

export default function Contact() {
  return (
    <div className="contact-form">
      <h1>Contactez-nous</h1>


      <label htmlFor="formation">Formation</label>
      <select id="formation">
        <option value="">Choisir une formation…</option>
        <option>Programme Grande École</option>
        <option>Mastère Data & IA</option>
        <option>Bachelor Développeur Web</option>
      </select>


      <div className="contact-grid">
        <div>
          <label htmlFor="nom">Nom</label>
          <input id="nom" type="text" placeholder="Nom" />
        </div>
        <div>
          <label htmlFor="prenom">Prénom</label>
          <input id="prenom" type="text" placeholder="Prénom" />
        </div>
      </div>


      <div className="contact-grid">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="email@exemple.com" />
        </div>
        <div>
          <label htmlFor="tel">Téléphone</label>
          <input id="tel" type="tel" placeholder="06 00 00 00 00" />
        </div>
      </div>


      <label htmlFor="message">Votre message</label>
      <textarea id="message" placeholder="Écris ton message ici…"></textarea>


      <button type="button">Je contacte l’école</button>


      <p className="disclaimer">
        En communiquant vos coordonnées, vous acceptez que nous vous recontactions.
      </p>
    </div>
  );
}