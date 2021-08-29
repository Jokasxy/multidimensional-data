export const tipJSON = (kod: string) => {
	try {
		JSON.parse(kod);
	} catch (pogreska) {
		return false;
	}
	return true;
};
