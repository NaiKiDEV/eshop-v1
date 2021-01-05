import superagent from 'superagent';

const methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

class HTTPClient {
  constructor() {
    this.baseUrl = "http://localhost:8000/";
  }

  async get(path) {
    return this._makeRequest(methods.GET, path);
  }

  async post(path, data) {
    return this._makeRequest(methods.POST, path, data);
  }

  async put(path, data) {
    return this._makeRequest(methods.PUT, path, data);
  }

  async delete(path) {
    return this._makeRequest(methods.DELETE, path);
  }

  async _makeRequest(method, path, data = null) {
    const url = this._getUrl(path);

    const request = superagent(method, url);
    if (method === methods.POST || method === methods.PUT) {
      request.set('Content-Type', 'application/json');
      request.send(data);
    }
    try {
      const response = await request.withCredentials();

      return response.body;
    } catch (e) {
      // error
    }
  }

  _getUrl(path) {
    return this.baseUrl + path;
  }
}

export default new HTTPClient();
