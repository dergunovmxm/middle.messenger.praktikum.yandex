import { getUser } from "../api/repositories/auth"

export const getProfile = () => {
	let user = null;

	const fetchUser = async () => {
		try {
			user = await getUser();

		} catch (error) {
			console.error(error);
		}
	};

	fetchUser();

	return {
		user
	};
};