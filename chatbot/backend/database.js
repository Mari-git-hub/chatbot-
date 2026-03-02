import Database from 'better-sqlite3';

const db = new Database('./chatbot.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS conversaciones (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha     TEXT NOT NULL,
    hora      TEXT NOT NULL,
    pregunta  TEXT NOT NULL,
    respuesta TEXT NOT NULL
  )
`);

export default db;