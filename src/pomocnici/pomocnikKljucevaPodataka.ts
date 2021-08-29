export const mapirajPodatkovneKljuceve = (odgovor: any, roditelj?: string) => {
	const podaci: string | any[] = [];

	if (roditelj) {
		podaci.push(roditelj + '.KLJUCEVI');
	}

	if (Array.isArray(odgovor)) {
		podaci.push(mapirajPodatkovneKljuceve(odgovor[0], roditelj));
	} else if (odgovor) {
		Object.keys(odgovor).forEach((kljuc) => {
			if (typeof odgovor[kljuc] === 'object') {
				if (roditelj) {
					podaci.push(mapirajPodatkovneKljuceve(odgovor[kljuc], roditelj + '.' + kljuc));
				} else {
					podaci.push(mapirajPodatkovneKljuceve(odgovor[kljuc], kljuc));
				}
			} else {
				if (roditelj) {
					podaci.push(roditelj + '.' + kljuc);
				} else {
					podaci.push(kljuc);
				}
			}
		});
	}

	return podaci.flat(Infinity);
};

export const kljuceviUObjekt = (objekt: any) => {
	return Object.keys(objekt).map((artikl) => {
		return { kljuc: artikl, vrijednost: objekt[artikl] };
	});
};

export const dohvatiPodatkovniObjekt = (podaci: any, putanja: string) => {
	const dijeloviPutanje = putanja.split('.');

	let objekt = podaci;

	dijeloviPutanje.forEach((dioPutanje) => {
		if (!dioPutanje.includes('KLJUCEVI')) {
			objekt = podaci[dioPutanje];
		}
	});

	return objekt;
};

export const pomakDoPodatkovnogPolja = (podaci: any, xOs: string, yOs: string) => {
	if (!Array.isArray(podaci)) {
		const xSplit = xOs.split('.');
		const xShift = xSplit.shift();
		const ySplit = yOs.split('.');
		const yShift = ySplit.shift();

		if (xShift !== yShift) {
			throw new Error('Nekompatibilni podaci');
		} else {
			podaci = podaci[xShift!];
			const noviPodaci = pomakDoPodatkovnogPolja(podaci, xSplit.join('.'), ySplit.join(''));

			podaci = noviPodaci.podaci;
			xOs = noviPodaci.xOs;
			yOs = noviPodaci.yOs;
		}
	}
	return { podaci, xOs, yOs };
};
