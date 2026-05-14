const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/filrouge';
const email = (process.env.ADMIN_EMAIL || 'admin@test.com').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || '#admin123';

async function seedAdmin() {
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL et ADMIN_PASSWORD doivent etre renseignes.');
  }

  await mongoose.connect(mongoUri);

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email },
    { email, password: hashedPassword, role: 'admin' },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  console.log('Compte admin pret :');
  console.log(`Email: ${email}`);
  console.log('Role: admin');
  console.log(`Mot de passe: ${password}`);
}

seedAdmin()
  .catch((error) => {
    console.error('Impossible de creer ou mettre a jour le compte admin.');
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
