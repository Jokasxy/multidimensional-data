import { Bar, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, ResponsiveContainer } from 'recharts';
import { boje } from '../konstante/boje';

interface Props {
	podaci: any;
	xOs: string;
	yOs: string;
}

const StupcastiGraf = (props: Props) => {
	const { podaci, xOs, yOs } = props;

	return (
		<ResponsiveContainer minHeight={400}>
			<BarChart data={podaci} margin={{ left: 50, right: 5 }}>
				<Bar dataKey={yOs} fill={boje.plava} />
				<CartesianGrid stroke={boje.siva} />
				<XAxis dataKey={xOs} />
				<YAxis domain={['auto', 'auto']} />
				<Tooltip />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default StupcastiGraf;
