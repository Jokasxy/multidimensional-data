export const dataKeyMapper = (response: any, parent?: string) => {
	const data: string | any[] = [];

	if (parent) {
		data.push(parent + '.KEYS');
	}

	if (Array.isArray(response)) {
		data.push(dataKeyMapper(response[0], parent));
	} else if (response) {
		Object.keys(response).forEach((key) => {
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
	}

	return data.flat(Infinity);
};

export const keysToObject = (object: any) => {
	return Object.keys(object).map((item) => {
		return { key: item, value: object[item] };
	});
};

export const getDataObject = (data: any, path: string) => {
	const parts = path.split('.');

	let object = data;

	parts.forEach((part) => {
		if (!part.includes('KEYS')) {
			object = data[part];
		}
	});

	return object;
};

export const moveToDataArray = (data: any, xAxis: string, yAxis: string) => {
	if (!Array.isArray(data)) {
		const xSplit = xAxis.split('.');
		const xShift = xSplit.shift();
		const ySplit = yAxis.split('.');
		const yShift = ySplit.shift();

		if (xShift !== yShift) {
			throw new Error('Uncompatible data');
		} else {
			data = data[xShift!];
			const newData = moveToDataArray(data, xSplit.join('.'), ySplit.join(''));

			data = newData.data;
			xAxis = newData.xAxis;
			yAxis = newData.yAxis;
		}
	}
	return { data, xAxis, yAxis };
};
