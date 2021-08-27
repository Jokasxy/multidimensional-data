import React from 'react';
import { Box, Button, TextField, MenuItem, Grid } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import './App.css';
import { charts, errorMessages, fields, QueryTypes } from './consts/consts';
import { queryApiData } from './helpers/queryHelper';
import Chart, { ChartRef } from './components/chart';
import { dataKeyMapper } from './helpers/dataKeyHelper';
import { isJSON } from './helpers/isJSON';

function App() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [queryData, setQueryData] = React.useState<any>();

	const chartRef = React.useRef<ChartRef>(null);

	const handleQuerySubmit = React.useCallback((values) => {
		queryApiData(
			values[fields.queryApiField.name],
			values[fields.queryType.name],
			values[fields.queryParams.name]
		).then((response) => {
			setQueryData(response);
		});
	}, []);

	const handleDataSelection = React.useCallback((values) => {
		chartRef.current?.drawChart(values);
	}, []);

	const validateQueryParams = React.useCallback((code: string) => {
		if (code.length === 0 || isJSON(code)) {
			return true;
		}
		return errorMessages.queryParams;
	}, []);

	return (
		<Box className="App">
			<Box component="main" maxWidth="1200px" margin="32px auto">
				<Box component="form" onSubmit={handleSubmit(handleQuerySubmit)}>
					<Grid container spacing={4}>
						<Grid item xs={12} md={4}>
							<Controller
								render={({ field: { name, value, onChange } }) => (
									<TextField
										select
										fullWidth
										name={name}
										value={value}
										onChange={onChange}
										label={fields.queryType.placeholder}>
										{Object.values(QueryTypes).map((item, key) => (
											<MenuItem key={key} value={item}>
												{item}
											</MenuItem>
										))}
									</TextField>
								)}
								control={control}
								name={fields.queryType.name}
								defaultValue={QueryTypes.GET}
							/>
						</Grid>
						<Grid item xs={12} md={8}>
							<Controller
								render={({ field: { name, value, onChange } }) => (
									<TextField
										fullWidth
										name={name}
										value={value}
										onChange={onChange}
										label={fields.queryApiField.placeholder}
										error={Boolean(errors[fields.queryApiField.name])}
										helperText={
											errors[fields.queryApiField.name]
												? errors[fields.queryApiField.name].message
												: ''
										}
									/>
								)}
								control={control}
								name={fields.queryApiField.name}
								defaultValue=""
								rules={{ required: { value: true, message: errorMessages.queryApiField } }}
							/>
						</Grid>
						<Grid item xs={12} md={8}>
							<Controller
								render={({ field: { name, value, onChange } }) => (
									<TextField
										multiline
										fullWidth
										name={name}
										value={value}
										onChange={onChange}
										label={fields.queryParams.placeholder}
										error={Boolean(errors[fields.queryParams.name])}
										helperText={
											errors[fields.queryParams.name]
												? errors[fields.queryParams.name].message
												: ''
										}
									/>
								)}
								control={control}
								name={fields.queryParams.name}
								defaultValue=""
								rules={{ validate: validateQueryParams }}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Button type="submit">Pošalji</Button>
						</Grid>
					</Grid>
				</Box>

				{queryData && (
					<Box component="form" onSubmit={handleSubmit(handleDataSelection)}>
						<Controller
							render={({ field: { name, value, onChange } }) => (
								<TextField
									select
									fullWidth
									name={name}
									value={value}
									onChange={onChange}
									label={fields.chartType.placeholder}
									error={Boolean(errors[fields.chartType.name])}
									helperText={
										errors[fields.chartType.name] ? errors[fields.chartType.name].message : ''
									}>
									{charts.map((item, key) => (
										<MenuItem key={key} value={item.value}>
											{item.name}
										</MenuItem>
									))}
								</TextField>
							)}
							control={control}
							name={fields.chartType.name}
							defaultValue=""
							rules={{ required: { value: true, message: errorMessages.chartType } }}
						/>
						<Controller
							render={({ field: { name, value, onChange } }) => (
								<TextField
									select
									fullWidth
									name={name}
									value={value}
									onChange={onChange}
									label={fields.xAxis.placeholder}
									error={Boolean(errors[fields.xAxis.name])}
									helperText={
										errors[fields.xAxis.name] ? errors[fields.xAxis.name].message : ''
									}>
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
							rules={{ required: { value: true, message: errorMessages.xAxis } }}
						/>
						<Controller
							render={({ field: { name, value, onChange } }) => (
								<TextField
									select
									fullWidth
									name={name}
									value={value}
									onChange={onChange}
									label={fields.yAxis.placeholder}
									error={Boolean(errors[fields.yAxis.name])}
									helperText={
										errors[fields.yAxis.name] ? errors[fields.yAxis.name].message : ''
									}>
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
							rules={{ required: { value: true, message: errorMessages.yAxis } }}
						/>

						<Button type="submit">Prikaži</Button>
					</Box>
				)}

				<Chart data={queryData} ref={chartRef} />
			</Box>
		</Box>
	);
}

export default App;
