export const error = (req, res, next) => {
  try {
    const error = new Error(`tidak ditemukan`);

    throw error;
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
