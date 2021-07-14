import { Bar, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, ResponsiveContainer } from 'recharts';
import { colors } from '../consts/colors';

interface Props {
	data: any;
	xAxis: string;
	yAxis: string;
}

const BarChartComponent = (props: Props) => {
	const { data, xAxis, yAxis } = props;

	return (
		<ResponsiveContainer minHeight={400}>
			<BarChart data={data} margin={{ left: 50, right: 5 }}>
				<Bar dataKey={yAxis} fill={colors.blue} />
				<CartesianGrid stroke={colors.gridGray} />
				<XAxis dataKey={xAxis} />
				<YAxis domain={['auto', 'auto']} />
				<Tooltip />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default BarChartComponent;
