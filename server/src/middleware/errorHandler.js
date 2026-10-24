export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((item) => item.message);
    return res.status(400).json({ success: false, message: messages.join('. ') });
  }
  if (err.name === 'CastError') return res.status(400).json({ success: false, message: 'Invalid record ID or field value.' });
  if (err instanceof SyntaxError && 'body' in err) return res.status(400).json({ success: false, message: 'Invalid JSON request body.' });
  if (err.status && err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ success: false, message: err.message || 'The request is invalid.' });
  }
  console.error(err);
  return res.status(500).json({ success: false, message: 'An unexpected server error occurred.' });
}
