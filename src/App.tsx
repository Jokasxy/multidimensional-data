import React from 'react';
import { Box, Button, TextField, MenuItem, Grid } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import './App.css';
import { grafovi, porukePogreske, polja, TipoviPoziva } from './konstante/konstante';
import { dohvatiPodatke } from './pomocnici/pomocniDohvacanjaPodataka';
import Chart, { GrafRef } from './komponente/graf';
import { mapirajPodatkovneKljuceve } from './pomocnici/pomocnikKljucevaPodataka';
import { tipJSON } from './pomocnici/tipJSON';

function App() {
	const { control, handleSubmit } = useForm();

	const [podaci, postaviPodatke] = React.useState<any>();

	const grafRef = React.useRef<GrafRef>(null);

	const posaljiZahtjev = React.useCallback((vrijednosti) => {
		dohvatiPodatke(vrijednosti[polja.putanja.naziv], vrijednosti[polja.tipPoziva.naziv], vrijednosti[polja.parametri.naziv]).then(
			(odgovor) => {
				postaviPodatke(odgovor);
			}
		);
	}, []);

	const odabirPodataka = React.useCallback((vrijednosti) => {
		grafRef.current?.nacrtajGraf(vrijednosti);
	}, []);

	const provjeriParametre = React.useCallback((kod: string) => {
		if (kod.length === 0 || tipJSON(kod)) {
			return true;
		}
		return porukePogreske.parametri;
	}, []);

	return (
		<Box className="App">
			<Box component="main" maxWidth="1200px" margin="32px auto">
				<Box component="form" onSubmit={handleSubmit(posaljiZahtjev)}>
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
										label={polja.tipPoziva.rezerviraniTekst}>
										{Object.values(TipoviPoziva).map((item, key) => (
											<MenuItem key={key} value={item}>
												{item}
											</MenuItem>
										))}
									</TextField>
								)}
								control={control}
								name={polja.tipPoziva.naziv}
								defaultValue={TipoviPoziva.DOHVATI}
							/>
						</Grid>
						<Grid item xs={12} md={8}>
							<Controller
								render={({ field: { name, value, onChange }, fieldState: { error } }) => (
									<TextField
										fullWidth
										name={name}
										value={value}
										onChange={onChange}
										label={polja.putanja.rezerviraniTekst}
										error={Boolean(error)}
										helperText={error?.message || ''}
									/>
								)}
								control={control}
								name={polja.putanja.naziv}
								defaultValue=""
								rules={{ required: { value: true, message: porukePogreske.putanja } }}
							/>
						</Grid>
						<Grid item xs={12} md={8}>
							<Controller
								render={({ field: { name, value, onChange }, fieldState: { error } }) => (
									<TextField
										multiline
										fullWidth
										name={name}
										value={value}
										onChange={onChange}
										label={polja.parametri.rezerviraniTekst}
										error={Boolean(error)}
										helperText={error?.message || ''}
									/>
								)}
								control={control}
								name={polja.parametri.naziv}
								defaultValue=""
								rules={{ validate: provjeriParametre }}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Button type="submit">Pošalji</Button>
						</Grid>
					</Grid>
				</Box>

				{podaci && (
					<Box component="form" onSubmit={handleSubmit(odabirPodataka)}>
						<Controller
							render={({ field: { name, value, onChange }, fieldState: { error } }) => (
								<TextField
									select
									fullWidth
									name={name}
									value={value}
									onChange={onChange}
									label={polja.tipGrafa.rezerviraniTekst}
									error={Boolean(error)}
									helperText={error?.message || ''}>
									{grafovi.map((artikal, kljuc) => (
										<MenuItem key={kljuc} value={artikal.vrijednost}>
											{artikal.naziv}
										</MenuItem>
									))}
								</TextField>
							)}
							control={control}
							name={polja.tipGrafa.naziv}
							defaultValue=""
							rules={{ required: { value: true, message: porukePogreske.tipGrafa } }}
						/>
						<Controller
							render={({ field: { name, value, onChange }, fieldState: { error } }) => (
								<TextField
									select
									fullWidth
									name={name}
									value={value}
									onChange={onChange}
									label={polja.xOs.rezerviraniTekst}
									error={Boolean(error)}
									helperText={error?.message || ''}>
									<MenuItem value="KLJUCEVI">KLJUCEVI</MenuItem>
									{mapirajPodatkovneKljuceve(podaci)?.map((item: any, key: number) => (
										<MenuItem key={key} value={item}>
											{item}
										</MenuItem>
									))}
								</TextField>
							)}
							control={control}
							name={polja.xOs.naziv}
							defaultValue=""
							rules={{ required: { value: true, message: porukePogreske.xOs } }}
						/>
						<Controller
							render={({ field: { name, value, onChange }, fieldState: { error } }) => (
								<TextField
									select
									fullWidth
									name={name}
									value={value}
									onChange={onChange}
									label={polja.yOs.rezerviraniTekst}
									error={Boolean(error)}
									helperText={error?.message || ''}>
									<MenuItem value="KLJUCEVI">KLJUCEVI</MenuItem>
									{mapirajPodatkovneKljuceve(podaci)?.map((item: any, key: number) => (
										<MenuItem key={key} value={item}>
											{item}
										</MenuItem>
									))}
								</TextField>
							)}
							control={control}
							name={polja.yOs.naziv}
							defaultValue=""
							rules={{ required: { value: true, message: porukePogreske.yOs } }}
						/>

						<Button type="submit">Prikaži</Button>
					</Box>
				)}

				<Chart podaci={podaci} ref={grafRef} />
			</Box>
		</Box>
	);
}

export default App;
