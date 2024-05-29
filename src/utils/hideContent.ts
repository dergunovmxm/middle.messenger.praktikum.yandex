export const hideContent = (element: Element | null) => () => {
	if (element) {
		element.textContent = '';
	}
};