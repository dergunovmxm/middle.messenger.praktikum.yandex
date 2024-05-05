import { compile } from 'handlebars';
import { Block } from '../../app';
import { IDialog } from '../../interfaces/IDialog';
import { view } from './view';

export class Dialog<T extends IDialog> extends Block<IDialog> {
  constructor(props: T) {
    super('div', props);
  }

  render() {
    const template = compile(view);
    return template({
      text: this.props.text,
    });
  }
}
