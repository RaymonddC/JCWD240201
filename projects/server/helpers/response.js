const resSuccess = (data) => {
  return res.status(data.code).send({
    success: true,
    message: data.message,
    data: data.result,
  });
};

const resFailed = (error) => {
  res.status(error.code || 500).send({
    success: false,
    message: error.message,
    data: null,
  });
};

module.exports = { resSuccess, resFailed };
