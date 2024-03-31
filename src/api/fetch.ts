const METHODS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
}

function queryStringify(data: { [key: string]: { toString: () => string } }) {
	if (!data || Object.keys(data).length === 0) {
		return ''
	}
	return `?${Object
		.keys(data)
		.map((key) => `${key}=${data[key].toString()}`)
		.join('&')}`
}

interface IOptions {
	timeout?: number,
	headers?: Object,
	data?: Object,
	method?: string
}
interface IRequest {
	(url: string, options: IOptions): Promise<unknown>
}

class HTTPTransport {
	get = (url: string, options: IOptions = {}) => {
		return this.request(url, { ...options, method: METHODS.GET }, options.timeout)
	}
	post = (url: string, options: IOptions = {}) => {
		return this.request(url, { ...options, method: METHODS.POST }, options.timeout)
	}
	put = (url: string, options: IOptions = {}) => {
		return this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
	}
	delete = (url: string, options: IOptions = {}) => {
		return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
	}

	request = (url: string, options: { method: string; timeout?: number | undefined; data?: Object; headers?: Object }, timeout = 5000) => {
		const { method, data, headers } = options

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			const newUrl = method === METHODS.GET ? `${url}${queryStringify(data as { [key: string]: { toString: () => string } })}` : url;

			xhr.open(method, newUrl)
			xhr.timeout = timeout

			if(headers) {
				Object.entries(headers).forEach(([key, value]) => {
					xhr.setRequestHeader(key, value as string)
				})
			}

			xhr.onload = () => {
				resolve(xhr)
			}

			xhr.onabort = reject
			xhr.onerror = reject
			xhr.ontimeout = reject

			if (method === METHODS.GET || !data) {
				xhr.send()
			} else {
				xhr.send(data as Document | XMLHttpRequestBodyInit | null | undefined) 
			}
		})
	}
}

