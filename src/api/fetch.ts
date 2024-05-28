import { IOptions, IRequest } from '../interfaces';

type Send = Document | XMLHttpRequestBodyInit | null | undefined;

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data: { [key: string]: { toString: () => string } }) {
  if (!data || Object.keys(data).length === 0) {
    return '';
  }
  return `?${Object
    .keys(data)
    .map((key) => `${key}=${data[key].toString()}`)
    .join('&')}`;
}
export class HTTPTransport {
  get: IRequest = (url: string, options: IOptions = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post: IRequest = (url: string, options: IOptions = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put: IRequest = (url: string, options: IOptions = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete: IRequest = (url: string, options: IOptions = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  // eslint-disable-next-line class-methods-use-this
  request = (url: string, options: { method: string; timeout?: number | undefined; data?: Object; headers?: Object }, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let isApplicationJson = false;
      const newUrl = method === METHODS.GET ? `${url}${queryStringify(data as { [key: string]: { toString: () => string } })}` : url;

      xhr.withCredentials = true;
      xhr.open(method, newUrl);
      xhr.timeout = timeout;

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value as string);
          if (value.includes('application/json')) {
            isApplicationJson = true
          }
        });
      }

      xhr.onload = () => {
        if (xhr.status > 299) {
          reject(xhr.responseText);
        } else if (/^\s*[{[]/.test(xhr.response)) {
          resolve(JSON.parse(xhr.response));
        } else {
          resolve(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (isApplicationJson) {
        xhr.send(JSON.stringify(data) as Send);
      }
      else {
        xhr.send(data as Send);
      }
    });
  };
}

export const service = new HTTPTransport();