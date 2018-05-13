import axios from 'axios';
import config from 'config';

class NpvCalculatorClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;

    axios.defaults.timeout = 60000;

    axios.interceptors.response.use(
      response => response,
      (error) => {
        if (error.response && error.response.data) {
          return Promise.reject(error.response.data);
        } else if (error.message) {
          return Promise.reject(error.message);
        }

        return Promise.reject(error);
      },
    );
  }

  async request(method, url, body) {
    const fullUrl = `${this.baseUrl}/${url}`;

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const options = {
      method,
      url: fullUrl,
      data: body,
      headers,
      timeout: 60000,
    };

    const response = await axios(options);

    if (!response || !response.data) {
      return {};
    }

    return response.data;
  }

  async post(url, body) {
    return this.request('POST', url, body);
  }

  async calculateNpv(calculateNpvRequest) {
    return this.post('npv/calculate', calculateNpvRequest);
  }
}

export default new NpvCalculatorClient(config.baseUrl);
