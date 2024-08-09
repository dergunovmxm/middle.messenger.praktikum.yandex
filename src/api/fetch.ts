const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(data: { [x: string]: { toString: () => string; }; }) {
  if (!data || Object.keys(data).length < 1) {
    return '';
  }
  return `?${Object
    .keys(data)
    .map((key) => `${key}=${data[key].toString()}`)
    .join('&')}`;
}

type RequestOptions = {
  timeout?: number
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class HTTPTransport {
  get = <T>(url:string, options: RequestOptions & T = {} as RequestOptions & T) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  put = <T>(url:string, options:RequestOptions & T = {} as RequestOptions & T) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  post = <T>(url: string, options:RequestOptions & T = {} as RequestOptions & T) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  delete = <T>(url:string, options:RequestOptions & T = {} as RequestOptions & T) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  // eslint-disable-next-line class-methods-use-this
  request = (url:string, options: { method: string; timeout?: number | undefined; data?: Object; headers?: Object }, timeout = 5000) => {
    const { method, data, headers } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let isApplicationJson = false;

      const newUrl = method === METHODS.GET ? url + queryStringify(data as { [x: string]: { toString: () => string; }; }) : url;

      xhr.withCredentials = true;
      xhr.open(method, newUrl);
      xhr.timeout = timeout;

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value as string);
          if (value.includes('application/json')) {
            isApplicationJson = true;
          }
        });
      }

      xhr.onload = () => {
        if (xhr.status > 299) {
          reject(xhr.responseText);
        }

        resolve(JSON.parse(xhr.response));
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (isApplicationJson) {
        xhr.send(JSON.stringify(data) as Document | XMLHttpRequestBodyInit | null | undefined);
      } else {
        xhr.send(data as Document | XMLHttpRequestBodyInit | null | undefined);
      }
    });
  };
}

export const resource = new HTTPTransport();
