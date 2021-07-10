export const dataKeyMapper = (response: any, parent?: string) => {
	const data: string | any[] = [];

	if (parent) {
		data.push(parent + '.KEYS');
	}

	Object.keys(response).forEach((key) => {
		// @ts-ignore
		if (typeof response[key] === 'object') {
			if (parent) {
				data.push(dataKeyMapper(response[key], parent + '.' + key));
			} else {
				data.push(dataKeyMapper(response[key], key));
			}
		} else {
			if (parent) {
				data.push(parent + '.' + key);
			} else {
				data.push(key);
			}
		}
	});

	return data.flat(Infinity);
};

export const keysToObject = (object: any) => {
	return Object.keys(object).map((item) => {
		return { key: item, value: object[item] };
	});
};

export const getDataObject = (response: any, path: string) => {
	const parts = path.split('.');

	let object = response;

	parts.forEach((part) => {
		if (!part.includes('KEYS')) {
			object = response[part];
		}
	});

	return object;
};
