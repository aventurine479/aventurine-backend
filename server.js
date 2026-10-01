const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuration du transporteur Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'houzaifaoumar81@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

// Route de demande d'adhésion
app.post('/api/demande-adhesion', async (req, res) => {
  const { nom, telephone, localisation, introduction } = req.body;

  const mailOptions = {
    from: 'Aventurine Site Web <houzaifaoumar81@gmail.com>',
    to: 'houzaifaoumar81@gmail.com',
    subject: `Nouvelle demande d'adhésion - ${nom}`,
    html: `
      <h2>Nouvelle demande d'adhésion reçue</h2>
      <p><strong>Nom complet :</strong> ${nom}</p>
      <p><strong>Téléphone / WhatsApp :</strong> ${telephone}</p>
      <p><strong>Localisation :</strong> ${localisation}</p>
      <p><strong>Introduction / Motivation :</strong></p>
      <blockquote style="background: #f4f4f4; padding: 10px; border-left: 4px solid #d4af37;">
        ${introduction}
      </blockquote>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Votre demande a été envoyée avec succès !' });
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’email:', error);
    res.status(500).json({ error: 'Erreur lors de l’envoi de la demande.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur Aventurine prêt sur le port ${PORT}`);
});
