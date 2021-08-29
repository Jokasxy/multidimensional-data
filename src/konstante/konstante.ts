export const polja = {
	tipPoziva: {
		naziv: 'tipPoziva',
		rezerviraniTekst: 'Odaberite željenu metodu',
	},
	putanja: {
		naziv: 'putanja',
		rezerviraniTekst: 'Upišite željeni API URL',
	},
	parametri: {
		naziv: 'parametri',
		rezerviraniTekst: 'Upišite željene parametre kao JSON objekt',
	},
	tipGrafa: {
		naziv: 'tipGrafa',
		rezerviraniTekst: 'Odaberite tip grafa',
	},
	xOs: {
		naziv: 'xOs',
		rezerviraniTekst: 'Odaberite podatak za prikaz na x-osi',
	},
	yOs: {
		naziv: 'yOs',
		rezerviraniTekst: 'Odaberite podatak za prikaz na y-osi',
	},
};

export const grafovi = [
	{
		vrijednost: 'LinijskiGraf',
		naziv: 'Linijski graf',
	},
	{
		naziv: 'StupcastiGraf',
		vrijednost: 'Stupćasti graf',
	},
];

export const tipoviGrafova = {
	linijskiGraf: grafovi[0].vrijednost,
	stupcastiGraf: grafovi[1].vrijednost,
};

export enum TipoviPoziva {
	DOHVATI = 'GET',
	POŠALJI = 'POST',
}

export const porukePogreske = {
	putanja: 'URL je obavezan!',
	parametri: 'Parametri nisu u JSON formatu!',
	tipGrafa: 'Tip grafa je obavezan',
	xOs: 'Podaci x-osi su obavezni',
	yOs: 'Podaci y-osi su obavezni',
};
