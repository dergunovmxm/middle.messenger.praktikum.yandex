import { compile } from "handlebars";
import { Block } from "../../app";
import { view } from "./view";
import {ILink} from  "../../interfaces";

export class Link<T extends ILink> extends Block<T> {

	constructor(props: T) {
		super('div', props);
	}
	render() {
			const template = compile(view);
			return template({
				href: this.props.href,
				linkClass: this.props.linkClass,
				link: this.props.link,
				id: this.props.id
			})
	}
}