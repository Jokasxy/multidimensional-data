import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { boje } from '../konstante/boje';

interface Props {
	podaci: any;
	xOs: string;
	yOs: string;
}

const LinijskiGraf = (props: Props) => {
	const { podaci, xOs, yOs } = props;

	return (
		<ResponsiveContainer minHeight={400}>
			<LineChart data={podaci} margin={{ left: 50, right: 5 }}>
				<Line type="monotone" dataKey={yOs} stroke={boje.plava} />
				<CartesianGrid stroke={boje.siva} />
				<XAxis dataKey={xOs} />
				<YAxis domain={['auto', 'auto']} />
				<Tooltip />
			</LineChart>
		</ResponsiveContainer>
	);
};

export default LinijskiGraf;
