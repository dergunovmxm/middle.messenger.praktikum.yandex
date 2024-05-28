import { render } from "./app/render";
import { goTo } from "./app/router";
import { Title } from "./components";
import { Button } from "./components/Button";
import { ITitle } from "./interfaces";
import { IButton } from "./interfaces/IButton";
import { hideContent } from "./utils/hideContent";

export const HomePage = () => {
	const root = document.querySelector('#root');
	const nav = document.querySelector('#nav');
	const button = new Button<IButton>({
		id: 'auth',
		button: 'Войти в систему',
		buttonClass: 'auth-button',
		type: 'button',
		events: {
			click: () => goTo('/sign-in'),
		}
	})

	const title = new Title<ITitle>({
		title: 'Добро пожаловать в мессенджер',
	});

	const goToAuth = new Title<ITitle>({
		title: 'Необходима авторизация',
	})

	if (root) {
		render<ITitle>('#root', title);
		render<ITitle>('#root', goToAuth);
		render<IButton>('#root', button);
	}



	return {
		hide: () => hideContent(root),
	}
}