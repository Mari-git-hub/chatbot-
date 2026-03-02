import db from './database.js';

export function guardarMensaje(pregunta, respuesta) {
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString('es-HN');
  const hora  = ahora.toLocaleTimeString('es-HN');

  const stmt = db.prepare(`
    INSERT INTO conversaciones (fecha, hora, pregunta, respuesta)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run(fecha, hora, pregunta, respuesta);
}

export function obtenerHistorial() {
  return db.prepare('SELECT * FROM conversaciones ORDER BY id DESC').all();
}