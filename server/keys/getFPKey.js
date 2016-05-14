module.exports = {
  getFPKey: (request, response) => {
    const FPKey = process.env.FPKey;
    if (FPKey) {
      response.status(201);
      response.send(FPKey);
    } else {
      response.status(404);
      response.send('failed to load FPKey');
    }
  },
};
