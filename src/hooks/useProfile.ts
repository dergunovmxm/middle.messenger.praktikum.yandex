import { getUserStore } from "../store/user";

export const useProfile = () => {
	const getUserData = async () => {
		const user = await getUserStore()
		return user
	}
	return {
		getUserData
	}
};