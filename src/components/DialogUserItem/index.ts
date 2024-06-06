import { compile } from 'handlebars';
import { Block } from '../../app';
import { IDialogUserItem } from '../../interfaces/IDialog';
import { view } from './view';

export class DialogUserItem<T extends IDialogUserItem> extends Block<IDialogUserItem> {
	constructor(props: T) {
		super('div', props);
	}

	render() {
		const template = compile(view);
		return template({
			login: this.props.login,
			src: this.props.src,
			className: this.props.className,
			events: this.props.events,
		});
	}
}