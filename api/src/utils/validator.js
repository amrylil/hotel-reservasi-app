// Ini adalah kemungkinan isi dari file `validator.js` Anda

const validate = (schema) => (req, res, next) => {
  try {
    // Menjalankan validasi menggunakan skema Zod yang diberikan
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // Jika berhasil, lanjut ke handler berikutnya
    next();
  } catch (error) {
    // Jika gagal, Zod akan melempar error.
    // Kirim response 400 (Bad Request) beserta detail errornya.
    return res.status(400).json({
      status: 'error',
      message: 'Invalid request data',
      errors: error.errors,
    });
  }
};

module.exports = { validate };
