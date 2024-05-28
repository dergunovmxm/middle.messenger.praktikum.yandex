import { goTo } from "../app/router"

export const navigateRoutes = [

	{
		id: 'toMessenger',
		button: 'Сообщения',
		buttonClass: 'navlink',
		type: 'button',
		events: {
			click: () => goTo('/messenger'),
		}
	},
	{
		id: 'toPrifile',
		button: 'Личный кабинет',
		buttonClass: 'navlink',
		type: 'button',
		events: {
			click: () => goTo('/profile'),
		}
	},
	{
		id: 'toSettings',
		button: 'Настройки пользователя',
		buttonClass: 'navlink',
		type: 'button',
		events: {
			click: () => goTo('/settings'),
		}
	}
	//TODO: добавить, если потребуется
	// {
	// 	id: 'toNotFound',
	// 	button: '404',
	// 	buttonClass: 'navlink',
	// 	type: 'button',
	// 	events: {
	// 		click: () => goTo('*'),
	// 	}
	// },
	// {
	// 	id: 'toServerError',
	// 	button: '500',
	// 	buttonClass: 'navlink',
	// 	type: 'button',
	// 	events: {
	// 		click: () => goTo('/server-error'),
	// 	}
	// },
]

const authNavbar = [
	{
		id: 'toAuth',
		button: 'Авторизация',
		buttonClass: 'navlink',
		type: 'button',
		events: {
			click: () => goTo('/sign-in'),
		}
	},
	{
		id: 'toRegister',
		button: 'Регистрация',
		buttonClass: 'navlink',
		type: 'button',
		events: {
			click: () => goTo('/sign-up'),
		}
	},
]

export const renderNavbar = () => navigateRoutes
export const renderAuthNavbar = () => authNavbar