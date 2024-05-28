import { signOut } from "../api/repositories/auth"
import { goTo } from "../app/router"

export const useLogout = () => {

	const logout = async () => {
		try {
			signOut()
			goTo('/')
		} catch (e) {
			alert(e)
		}
	}
	return {
		logout
	}
}