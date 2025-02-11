exports.geterror404 = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
};

exports.geterror500 = (error, req, res, next) => {
  res.status(error.status | 500);
  res.json([
    {
      error: error.message,
    },
  ]);
};
