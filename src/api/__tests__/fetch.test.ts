import { expect } from 'chai';
import sinon from 'sinon';

import { HTTPTransport } from '../fetch';

describe('HTTPTransport', () => {
  let xhr: { onCreate: (req: any) => void; restore: () => void; };
  let requests: any[];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = (req) => {
      requests.push(req);
    };
  });

  afterEach(() => {
    xhr.restore();
  });

  const resource = new HTTPTransport();

  it('should make a GET request', async () => {
    const url = '/data';
    const responseData = { message: 'GET request successful' };

    const promise = resource.get(url);
    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(responseData));

    const response = await promise;
    expect(response).to.deep.equal(responseData);
  });

  it('should make a PUT request', async () => {
    const url = '/update';
    const requestData = { key: 'value' };
    const responseData = { message: 'PUT request successful' };

    const promise = resource.put(url, { data: requestData });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(responseData));

    const response = await promise;
    expect(response).to.deep.equal(responseData);
  });

  it('should make a POST request', async () => {
    const url = '/create';
    const requestData = { key: 'value' };
    const responseData = { message: 'POST request successful' };

    const promise = resource.post(url, { data: requestData });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(responseData));

    const response = await promise;
    expect(response).to.deep.equal(responseData);
  });

  it('should make a DELETE request', async () => {
    const url = '/delete';
    const responseData = { message: 'DELETE request successful' };

    const promise = resource.delete(url);
    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(responseData));

    const response = await promise;
    expect(response).to.deep.equal(responseData);
  });

  it('should make a generic request', async () => {
    const url = '/generic';
    const method = 'POST';
    const requestData = { key: 'value' };
    const responseData = { message: 'Generic request successful' };

    const promise = resource.request(url, { method, data: requestData });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(responseData));

    const response = await promise;
    expect(response).to.deep.equal(responseData);
  });
});
