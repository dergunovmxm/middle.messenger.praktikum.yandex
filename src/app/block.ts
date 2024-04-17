import { EventBus } from './eventBus';

export class Block<T extends object> {
  static EVENTS: { [key: string]: string } = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  _element: HTMLElement | null = null;

  _meta: {
    tagName: string,
    props: T | {}
  } | null = null;

  props: T;

  eventBus: () => EventBus<T>;

  constructor(tagName = 'div', props: T = {} as T) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
    this.props = this._makePropsProxy(props as T);
    this.eventBus = () => eventBus;
    this._registryEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registryEvents(eventBus: EventBus<T>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta as { tagName: string };
    this._element = this._createDocumentElement(tagName) as HTMLElement;
    const { className } = this.props as { className: string };

    if (className) {
      this._element?.setAttribute('class', `${className}`);
    }
  }

  _addEvents() {
    const { events = {}, eventInterception } = this.props as { events?: Record<string, () => void>, eventInterception?: boolean };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName] as EventListenerOrEventListenerObject, eventInterception);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props as { events?: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName] as EventListenerOrEventListenerObject);
    });
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: T, newProps: T) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: T, newProps: T) {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  setProps = (nextProps: T) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    const element = new DOMParser().parseFromString(block as unknown as string, 'text/html').body.firstChild;

    this._removeEvents();
    this._element?.append(element as string | Node);

    this._addEvents();
    this.dispatchComponentDidMount();
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: T) {
    return new Proxy(props, {
      get: (target: T, prop: string) => {
        const value = (target as { [key: string]: unknown })[prop as string];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: T, prop: string, value: unknown) => {
        if (prop in target) {
          (target as { [key: string]: unknown })[prop as string] = value;
          this.eventBus().emit(Block.EVENTS.FLOW_CDU, { oldProps: target, newProps: target });
        } else {
          throw new Error('Нет доступа');
        }
        return true;
      },

      defineProperty: () => {
        throw new Error('Нет доступа');
      },
    } as ProxyHandler<T>);
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }
}
