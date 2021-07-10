import React from 'react';
import { chartTypes, fields } from '../consts/consts';
import { getDataObject, keysToObject } from '../helpers/dataKeyHelper';
import BarChartComponent from './barChart';
import LineChartComponent from './lineChart';

interface Props {
	data: any;
}

export interface ChartRef {
	drawChart: (values: any) => void;
}

const Chart = (props: Props, ref: any) => {
	const { data } = props;

	const [representation, setRepresentation] = React.useState(data);
	const [chartType, setChartType] = React.useState('');
	const [xAxis, setXAxis] = React.useState('');
	const [yAxis, setYAxis] = React.useState('');

	const drawChart = React.useCallback(
		(values: any) => {
			if (values[fields.yAxis.name].includes('KEYS')) {
				const dataObject = getDataObject(data, values[fields.yAxis.name]);

				const keyObject = keysToObject(dataObject);

				setRepresentation(keyObject);
				setChartType(values.type);
				setXAxis('key');
				setYAxis('value');
			} else {
				setRepresentation(data);
				setChartType(values.type);
				setXAxis(values[fields.xAxis.name]);
				setYAxis(values[fields.yAxis.name]);
			}
		},
		[data]
	);

	React.useImperativeHandle(
		ref,
		(): ChartRef => ({
			drawChart,
		})
	);

	if (!representation || chartType.length === 0 || xAxis.length === 0 || yAxis.length === 0) return null;
	else if (chartType === chartTypes.lineChart) {
		return <LineChartComponent data={representation} xAxis={xAxis} yAxis={yAxis} />;
	} else if (chartType === chartTypes.barChart) {
		return <BarChartComponent data={representation} xAxis={xAxis} yAxis={yAxis} />;
	} else return null;
};

export default React.forwardRef(Chart);
