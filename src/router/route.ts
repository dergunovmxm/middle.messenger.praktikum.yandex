const renderPage = (_: string, block: () => void): void => {
  block();
};

export class Route {
  _pathname: string;

  _block: any;

  _props: { rootQuery: string };

  _isRendered: boolean = false;

  constructor(pathname: string, view: () => { hide: () => void }, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._block = view;
    this._props = props;
  }

  async navigate(pathname: string) {
    if (this.match(pathname) && pathname !== this._pathname) {
      await this.leave();
      this._pathname = pathname;
      await this.render();
    }
  }

  async leave() {
    const block = this._block();
    if (block && typeof block.hide === 'function') {
      block.hide();
    } else if (block instanceof Promise) {
      await block.then((resolve: { hide: () => void }) => {
        resolve.hide();
      });
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  async render() {
    await renderPage(this._props.rootQuery, this._block);
  }
}
