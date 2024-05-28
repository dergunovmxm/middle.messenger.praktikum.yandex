import { signUp } from "../api/repositories/auth";
import { getFormData } from "../app/formData";
import { goTo } from "../app/router";
import { ICreateUser } from "../interfaces/IUser";


export const useRegister = () => {
	const signup = async () => {
		const form = document.querySelector('#register-form');
		const data = getFormData<ICreateUser>(form as HTMLFormElement);
		try {
			await signUp(data)
			goTo('/sign-in')
		} catch (e) {
			alert(e)
		}
	}
	return {
		signup
	}
}