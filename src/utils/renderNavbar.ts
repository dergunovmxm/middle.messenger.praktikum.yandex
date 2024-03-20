document.addEventListener("DOMContentLoaded", () => {
  const navbar: HTMLElement = document.getElementById('nav') as HTMLElement
	navbar.innerHTML = `
		<nav> 
		<a href='/pages/NotFound/index.html' class='navlink'>
			404
		</a>
		<a href='/pages/ServerError/index.html' class='navlink'>
			500
		</a>
		<a href='/pages/Auth/index.html' class='navlink'>
			Авторизация
		</a>
		<a href='/pages/Register/index.html' class='navlink'>
			Регистрация
		</a>
		<a href='/pages/Messenger/index.html' class='navlink'>
			Сообщения
		</a>
		<a href='/pages/Profile/index.html' class='navlink'>
			Личный кабинет
		</a>
		<a href='/pages/Settings/index.html' class='navlink'>
			Настройки пользователя
		</a>
		</nav>
	`
});
