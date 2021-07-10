import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '../consts/colors';

interface Props {
	data: any;
	xAxis: string;
	yAxis: string;
}

const LineChartComponent = (props: Props) => {
	const { data, xAxis, yAxis } = props;

	return (
		<ResponsiveContainer minHeight={400}>
			<LineChart data={data}>
				<Line type="monotone" dataKey={yAxis} stroke={colors.blue} />
				<CartesianGrid stroke={colors.gridGray} />
				<XAxis dataKey={xAxis} />
				<YAxis />
				<Tooltip />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default LineChartComponent;
