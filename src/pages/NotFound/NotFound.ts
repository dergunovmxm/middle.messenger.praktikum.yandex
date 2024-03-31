import { Title } from "../../components";
import { render } from "../../app";
import { ITitle } from "../../interfaces";

const title = new Title<ITitle>({
	title: "Страница не найдена"
})

render('main', title);