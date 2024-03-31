import { compile } from "handlebars";
import { Block } from "../../app";
import { view } from "./view";
import { ILabel } from "../../interfaces/ILabel";


export class Label<T extends ILabel> extends Block<T> {
	constructor(props: T) {
		super('label', props);
	}

	render() {	
		const template = compile(view);
		return template({
			name: this.props.name,
			labelClass: this.props.labelClass,
			label: this.props.label
		})
	}
}