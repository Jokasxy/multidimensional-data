export const fields = {
	queryApiField: {
		name: 'queryApiField',
		placeholder: 'Upišite željeni API URL',
	},
	xAxis: {
		name: 'xAxis',
		placeholder: 'Odaberite podatak za prikaz na x-osi',
	},
	yAxis: {
		name: 'yAxis',
		placeholder: 'Odaberite podatak za prikaz na y-osi',
	},
};

export const charts = [
	{
		value: 'LineChart',
		name: 'Linijski graf',
	},
	{
		name: 'BarChart',
		value: 'Stupćasti graf',
	},
];

export const chartTypes = {
	lineChart: charts[0].value,
	barChart: charts[1].value,
};
