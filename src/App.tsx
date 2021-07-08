import React from 'react';
import { Box, Button, TextField, MenuItem } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import './App.css';
import { fields } from './consts/consts';
import { queryApiData } from './helpers/queryHelper';
import LineChartComponent, { ChartRef } from './components/lineChart';
import { dataKeyMapper } from './helpers/dataKeyHelper';

function App() {
	const { control, handleSubmit } = useForm();

	const [queryData, setQueryData] = React.useState<any>();

	const chartRef = React.useRef<ChartRef>(null);

	const handleQuerySubmit = React.useCallback((values) => {
		queryApiData(values[fields.queryApiField.name]).then((response) => {
			setQueryData(response);
		});
	}, []);

	const handleDataSelection = React.useCallback((values) => {
		chartRef.current?.drawChart(values);
	}, []);

	return (
		<Box className="App">
			<Box component="main" maxWidth="1200px" margin="32px auto">
				<Box component="form" onSubmit={handleSubmit(handleQuerySubmit)}>
					<Controller
						render={({ field: { name, value, onChange } }) => (
							<TextField
								fullWidth
								// variant="outlined"
								name={name}
								value={value}
								onChange={onChange}
								label={fields.queryApiField.placeholder}
								// classes={{ root: classes.remarkInputField }}
								// error={Boolean(errors[scheduleFields.remark])}
								// helperText={errors[scheduleFields.remark] ? errors[scheduleFields.remark].message : ''}
							/>
						)}
						control={control}
						name={fields.queryApiField.name}
						defaultValue=""
						// rules={standardSingleSchedule.rules(t).comment}
					/>
					<Button type="submit">Pošalji</Button>
				</Box>

				{queryData && (
					<Box component="form" onSubmit={handleSubmit(handleDataSelection)}>
						<Controller
							render={({ field: { name, value, onChange } }) => (
								<TextField
									select
									fullWidth
									// variant="outlined"
									name={name}
									value={value}
									onChange={onChange}
									label="Odaberite tip grafa"
									// classes={{ root: classes.remarkInputField }}
									// error={Boolean(errors[scheduleFields.remark])}
									// helperText={errors[scheduleFields.remark] ? errors[scheduleFields.remark].message : ''}
								>
									<MenuItem value="LineChart">Linijski Graf</MenuItem>
									<MenuItem value="BarChart">Stupčasti Graf</MenuItem>
								</TextField>
							)}
							control={control}
							name="type"
							defaultValue=""
							// rules={standardSingleSchedule.rules(t).comment}
						/>
						<Controller
							render={({ field: { name, value, onChange } }) => (
								<TextField
									select
									fullWidth
									// variant="outlined"
									name={name}
									value={value}
									onChange={onChange}
									label={fields.xAxis.placeholder}
									// classes={{ root: classes.remarkInputField }}
									// error={Boolean(errors[scheduleFields.remark])}
									// helperText={errors[scheduleFields.remark] ? errors[scheduleFields.remark].message : ''}
								>
									<MenuItem value="KEYS">KEYS</MenuItem>
									{dataKeyMapper(queryData)?.map((item: any, key: number) => (
										<MenuItem key={key} value={item}>
											{item}
										</MenuItem>
									))}
								</TextField>
							)}
							control={control}
							name={fields.xAxis.name}
							defaultValue=""
							// rules={standardSingleSchedule.rules(t).comment}
						/>
						<Controller
							render={({ field: { name, value, onChange } }) => (
								<TextField
									select
									fullWidth
									// variant="outlined"
									name={name}
									value={value}
									onChange={onChange}
									label={fields.yAxis.placeholder}
									// classes={{ root: classes.remarkInputField }}
									// error={Boolean(errors[scheduleFields.remark])}
									// helperText={errors[scheduleFields.remark] ? errors[scheduleFields.remark].message : ''}
								>
									<MenuItem value="KEYS">KEYS</MenuItem>
									{dataKeyMapper(queryData)?.map((item: any, key: number) => (
										<MenuItem key={key} value={item}>
											{item}
										</MenuItem>
									))}
								</TextField>
							)}
							control={control}
							name={fields.yAxis.name}
							defaultValue=""
							// rules={standardSingleSchedule.rules(t).comment}
						/>

						<Button type="submit">Prikaži</Button>
					</Box>
				)}

				<LineChartComponent data={queryData} ref={chartRef} />
			</Box>
		</Box>
	);
}

export default App;
