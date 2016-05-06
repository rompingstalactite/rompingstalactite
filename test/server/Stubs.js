module.exports = {

  response: function response() {
    this._ended = false;
    this._responseCode = null;
    this._headers = null;
    this._data = null;
    this._status = null;
    this._json = null;

    this.status = (val) => {
      this._status = val === undefined ? this._status : val;
      return this._status;
     };

    this.json = (val) => {
      this._json = val === undefined ? this._json : val;
      return this._json;
    };

    this.writeHead = (responseCode, headers) => {
      this._responseCode = responseCode;
      this._headers = headers;
    };

    this.end = (data) => {
      this._ended = true;
      this._data = data;
    };
  },

  request: function request(url, method, postdata) {
    this.url = url;
    this.method = method;
    this._postData = postdata;
    this.setEncoding = function() { /* noop */ };

    this.json = (val) => {
      this.body = val === undefined ? this.body : val;
      return this.body;
    };

    this.addListener = this.on = (type, callback) => {
      if (type === 'data') {
        callback(JSON.stringify(this._postData));
      }

      if (type === 'end') {
        callback();
      }

    };
  },

};
