export const errorHandler = (err, req, res, next) => {

  if (err.code)
    return res.status(err.status || 400).json({
      code: err.code
    });

  console.error(err);

  res.status(500).json({ code: "INTERNAL_ERROR" });
};