'use strict';

module.exports = {
  getFPKey: function getFPKey(request, response) {
    var FPKey = void 0;
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
  }
};