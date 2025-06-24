const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { nombre, apellido, username, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length) return res.status(400).send({ message: 'Nombre de Usuario ya registrado' });
  const hashed = await bcrypt.hash(password, 8);
  await db.query('INSERT INTO users (nombre, apellido, username, password) VALUES (?, ?, ?, ?)', [nombre, apellido, username, hashed]);
  res.send({ message: 'Usuario registrado' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (!rows.length) return res.status(400).send({ message: 'Usuario no encontrado' });
  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).send({ message: 'Contraseña incorrecta' });
  const token = jwt.sign({ id: user.user_id, nombre: user.nombre, apellido: user.apellido, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.send({ token });
};