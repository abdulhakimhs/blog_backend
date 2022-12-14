exports.sendError = (res, error, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

exports.sendSuccess = (res, message, statusCode = 200) => {
  res.status(statusCode).json({ message });
};

exports.handleNotFound = (req, res) => {
  this.sendError(res, "Not found", 404);
};
