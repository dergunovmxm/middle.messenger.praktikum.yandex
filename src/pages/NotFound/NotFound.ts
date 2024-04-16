import { Label, Link, Title } from "../../components";
import { render } from "../../app";
import { ILink, ITitle, ILabel } from "../../interfaces";

const title = new Title<ITitle>({
	title: "Страница не найдена"
})

const link = new Link<ILink>({
	id: "link",
	link: "Назад к чатам",
	href: "/pages/Messenger/index.html",
	linkClass: "not-found-link"
})



render('main', title);
render('main', link)

