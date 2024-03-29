export class EventBus<T> {
	listeners: Record<string, Array<() => void>>;

	constructor() {
		this.listeners = {};
	}

	on(event: number | string, callback: () => void) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: number | string, callback: () => void) {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}
		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback
		);
	}

	emit(event: number | string, ...args: ({oldProps: T, newProps: T} | undefined)[]) {
		if(!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
	}

	this.listeners[event].forEach((listener) => {
		listener(...args as []);
	})
}