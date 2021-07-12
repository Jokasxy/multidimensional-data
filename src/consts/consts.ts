export const fields = {
	queryType: {
		name: 'queryType',
		placeholder: 'Odaberite željenu metodu',
	},
	queryApiField: {
		name: 'queryApiField',
		placeholder: 'Upišite željeni API URL',
	},
	queryParams: {
		name: 'queryParams',
		placeholder: 'Upišite željene parametre kao JSON objekt',
	},
	chartType: {
		name: 'chartType',
		placeholder: 'Odaberite tip grafa',
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

export enum QueryTypes {
	GET = 'GET',
	POST = 'POST',
}

export const errorMessages = {
	queryApiField: 'URL je obavezan!',
	queryParams: 'Parametri nisu u JSON formatu!',
	chartType: 'Tip grafa je obavezan',
}
