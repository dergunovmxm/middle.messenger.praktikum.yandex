import { compile } from "handlebars";
import { Block } from "../../app";
import { IButton } from "../../interfaces/IButton";
import { view } from "./view";

export class Button<T extends IButton> extends Block<T> {
	constructor(props: T) {
		super('div', props);
	}

	render() {
		const template = compile(view);
		return template({
			id: this.props.id,
			buttonClass: this.props.buttonClass,
			button: this.props.button,
			type: this.props.type
		})
	}
}