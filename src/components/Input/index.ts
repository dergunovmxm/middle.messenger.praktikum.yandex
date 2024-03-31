import { compile } from "handlebars";
import { Block } from "../../app";
import { view } from "./view";
import { IInput } from "../../interfaces";

export class Input<T extends IInput> extends Block<T> {

	constructor(props: T) {
		super('input', props);
	}

	render() {
		const template = compile(view);
		return template({
			name: this.props.name,
			inputClass: this.props.inputClass,
			type: this.props.type
		});
	}
}