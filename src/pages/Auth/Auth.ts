import { Input, Label, Title } from "../../components";
import { render } from "../../app";
import { IInput, ITitle } from "../../interfaces";
import { ILabel } from "../../interfaces/ILabel";

const title = new Title<ITitle>({
	title: "Авторизация"
})

const login = new Input<IInput>({
	type: "text",
	name: "login",
	inputContainer: "input-container",
	inputClass: "auth-form-input",
})

const label = new Label<ILabel>({
	name: "login",
	labelClass: "auth-form-label",
	label: "Логин"
})

render<ITitle>('form', title);
render<IInput>('form', login)
render<ILabel>('form', label)