export function errorHandler(err, req, res, next) {
  console.error('❌ Error capturado:', err.name);  // Muestra el nombre del error en consola

  res.status(err.code || 500).json({               // Devuelve una respuesta JSON al frontend
    status: 'error',
    message: err.message || 'Error inesperado',
    cause: err.cause || 'Desconocido'
  });
}
