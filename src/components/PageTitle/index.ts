import { compile } from 'handlebars';
import { Block } from '../../app';
import { view } from './view';
import { ITitle } from '../../interfaces';

export class Title<T extends ITitle> extends Block<T> {
  constructor(props: T) {
    super('h1', props);
  }

  render() {
    const template = compile(view);
    return template({
      title: this.props.title,
    });
  }
}
