module.exports = {
  getFPKey: (request, response) => {
    let FPKey;
    try {
      FPKey = require('./filePicker.js');
    } catch (err) {
      console.log('error loading filePicker.js', err);
      FPKey = process.env.FPKey;
    } finally {
      if (FPKey) {
        response.status(201);
        response.send(FPKey);
      } else {
        response.status(404);
        response.send('failed to load FPKey');
      }
    }
  },
};
