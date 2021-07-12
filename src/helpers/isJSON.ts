export const isJSON = (code: string) => {
	try {
		JSON.parse(code);
	} catch (error) {
		return false;
	}
	return true;
};
