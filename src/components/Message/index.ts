import { compile } from 'handlebars';
import { Block } from '../../app';
import { IMessage } from '../../interfaces/IMessage';
import { view } from './view';

export class Message<T extends IMessage> extends Block<T> {
  constructor(props: T) {
    super('div', props);
  }

  render() {
    const template = compile(view);
    return template({
      mClass: this.props.mClass,
      message: this.props.message,
    });
  }
}