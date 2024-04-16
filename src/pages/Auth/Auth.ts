import { Input, Label, Link, Title } from "../../components";
import { render } from "../../app";
import { IInput, ITitle, ILabel, ILink} from "../../interfaces";
import { formData } from "../../app/formData";
import { loginValidation, passwordValidation } from "../../app/validation";


const title = new Title<ITitle>({
	title: "Авторизация"
})

const login = new Input<IInput>({
	type: "text",
	name: "login",
	inputClass: "auth-form-input",
	events: {
		blur: loginValidation,
		submit: loginValidation
  },
  eventInterception: true,
})

const password = new Input<IInput>({
	type: "password",
	name: "password",
	inputClass: "auth-form-input",
	events: {
		blur: passwordValidation,
		submit: passwordValidation
	},
	eventInterception: true,
})

const loginLabel = new Label<ILabel>({
	name: "login",
	labelClass: "auth-form-label",
	label: "Логин"
})

const passwordLabel = new Label<ILabel>({
	name: "password",
	labelClass: "auth-form-label",
	label: "Пароль"
})

const toRegistration = new Link<ILink>({
	id: "registration",
	link: "Регистрация",
	href: "/pages/Register/index.html",
})

const toRegistrationLabel = new Label<ILabel>({
	name: "to-registration",
	labelClass: "auth-form-label",
	label: "Нет аккаунта?"
})


const auth = new Link<ILink>({
	id: "auth",
	link: "Войти",
	// href: "../Profile/index.html",
	linkClass: "auth-button",
	events: {
		click: formData
	}
}) 


render<ITitle>('.title-container', title);
render<ILabel>('.login-container', loginLabel)
render<IInput>('.login-container', login)
render<ILabel>('.password-container', passwordLabel)
render<IInput>('.password-container', password)
render<ILabel>('.link-container', toRegistrationLabel)
render<ILink>('.link-container', toRegistration)
render<ILink>('.button-container', auth)

