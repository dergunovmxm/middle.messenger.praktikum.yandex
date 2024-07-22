import { compile } from 'handlebars';
import { Block } from '../../app';
import { view } from './view';
import { IImage } from '../../interfaces';

export class Icon<T extends IImage> extends Block<IImage> {
  constructor(props: T) {
    super('div', props);
  }

  render() {
    const template = compile(view);
    return template({
      src: this.props.src,
      events: this.props.events,
    });
  }
}
