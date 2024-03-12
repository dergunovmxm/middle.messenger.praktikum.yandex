document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById('nav')
	navbar.innerHTML = `
		<nav> 
		<a href='/pages/NotFound/index.html'>
			404
		</a>
		<a href='/pages/ServerError/index.html'>
			500
		</a>
		<a href='/pages/Auth/index.html'>
			Авторизация
		</a>
		<a href='/pages/Register/index.html'>
			Регистрация
		</a>
		<a href='/pages/Messeger/index.html'>
			Сообщения
		</a>
		<a href='/pages/Profile/index.html'>
			Личный кабинет
		</a>
		</nav>
	`
});
