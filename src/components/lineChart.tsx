import React from 'react';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { fields } from '../consts/consts';
import { getDataObject, keysToObject } from '../helpers/dataKeyHelper';

interface Props {
	data: any;
}

export interface ChartRef {
	drawChart: (values: any) => void;
}

const LineChartComponent = (props: Props, ref: any) => {
	const { data } = props;

	const [representation, setRepresentation] = React.useState(data);
	const [dataKey, setDataKey] = React.useState('');
	const typeRef = React.useRef('');
	const xAxisRef = React.useRef('');
	const yAxisRef = React.useRef('');

	const drawChart = React.useCallback(
		(values: any) => {
			if (values[fields.xAxis.name].includes('KEYS')) {
				const dataObject = getDataObject(data, values[fields.xAxis.name]);

				const keyObject = keysToObject(dataObject);

				setRepresentation(keyObject);
				setDataKey('value');

				typeRef.current = values.type;
				xAxisRef.current = values[fields.xAxis.name];
				yAxisRef.current = values[fields.yAxis.name];
			} else {
				typeRef.current = values.type;
				xAxisRef.current = values[fields.xAxis.name];
				yAxisRef.current = values[fields.yAxis.name];

				setRepresentation(data);
				setDataKey(values[fields.xAxis.name]);
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

	if (!representation || dataKey.length === 0) return null;
	return (
		<ResponsiveContainer minHeight={400}>
			<LineChart data={representation} width={400} height={400}>
				<Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="key" />
    			<YAxis />
				<Tooltip />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default React.forwardRef(LineChartComponent);
