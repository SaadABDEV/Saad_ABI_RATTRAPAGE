const bcrypt = require('bcrypt');
(async () => {
  const h = await bcrypt.hash('Admin!234', 10); // change le mot de passe ici si besoin
  console.log(h);
})();