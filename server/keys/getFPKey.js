module.exports = {
  getFPKey: (request, response) => {
    let FPKey;
    try {
      FPKey = require('./filePicker.js').FILE_PICKER_KEY;
    } catch (err) {
      console.log('error loading filePicker.js', err);
      FPKey = process.env.FPKey;
    } finally {
      if (FPKey) {
        response.status(200);
        response.json({ key: FPKey });
      } else {
        response.status(404);
        response.json({ data: 'failed to load FPKey' });
      }
    }
  },
};
