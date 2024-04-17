import { compile } from 'handlebars';
import { Block } from '../../app';
import { IImage } from '../../interfaces';
import { view } from './view';

export class Image<T extends IImage> extends Block<T> {
  constructor(props: T) {
    super('div', props);
  }

  render() {
    const template = compile(view);
    return template({
      src: this.props.src,
      alt: this.props.alt,
      className: this.props.className,
    });
  }
}
