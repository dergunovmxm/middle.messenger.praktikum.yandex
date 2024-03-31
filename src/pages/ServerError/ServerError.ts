import { Title } from "../../components";
import { render } from "../../app";
import { ITitle } from "../../interfaces";

const title = new Title<ITitle>({
	title: "Ошибка сервера"
})

render<ITitle>('main', title);