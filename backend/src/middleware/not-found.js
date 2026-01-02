export default function notFoundHandler(req, res) {
  return res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
  });
}

