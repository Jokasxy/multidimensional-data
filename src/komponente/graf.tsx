import React from 'react';
import { tipoviGrafova, polja } from '../konstante/konstante';
import { dohvatiPodatkovniObjekt, kljuceviUObjekt, pomakDoPodatkovnogPolja } from '../pomocnici/pomocnikKljucevaPodataka';
import StupcastiGraf from './stupcastiGraf';
import LinijskiGraf from './linijskiGraf';

interface Props {
	podaci: any;
}

export interface GrafRef {
	nacrtajGraf: (vrijednosti: any) => void;
}

const Graf = (props: Props, ref: any) => {
	const { podaci } = props;

	const [prikaz, postaviPrikaz] = React.useState(podaci);
	const [tipGrafa, postaviTipGrafa] = React.useState('');
	const [xOs, postaviXOs] = React.useState('');
	const [yOs, postaviYOs] = React.useState('');

	const nacrtajGraf = React.useCallback(
		(vrijednosti: any) => {
			if (vrijednosti[polja.yOs.naziv].includes('KLJUCEVI')) {
				const podatkovniObjekt = dohvatiPodatkovniObjekt(podaci, vrijednosti[polja.yOs.naziv]);

				const keyObject = kljuceviUObjekt(podatkovniObjekt);

				postaviPrikaz(keyObject);
				postaviTipGrafa(vrijednosti[polja.tipGrafa.naziv]);
				postaviXOs('kljuc');
				postaviYOs('vrijednost');
			} else {
				const pomaknutiPodaci = pomakDoPodatkovnogPolja(podaci, vrijednosti[polja.xOs.naziv], vrijednosti[polja.yOs.naziv]);

				postaviPrikaz(pomaknutiPodaci.podaci);
				postaviTipGrafa(vrijednosti[polja.tipGrafa.naziv]);
				postaviXOs(pomaknutiPodaci.xOs);
				postaviYOs(pomaknutiPodaci.yOs);
			}
		},
		[podaci]
	);

	React.useImperativeHandle(
		ref,
		(): GrafRef => ({
			nacrtajGraf,
		})
	);

	if (!prikaz || tipGrafa.length === 0 || xOs.length === 0 || yOs.length === 0) return null;
	else if (tipGrafa === tipoviGrafova.linijskiGraf) {
		return <LinijskiGraf podaci={prikaz} xOs={xOs} yOs={yOs} />;
	} else if (tipGrafa === tipoviGrafova.stupcastiGraf) {
		return <StupcastiGraf podaci={prikaz} xOs={xOs} yOs={yOs} />;
	} else return null;
};

export default React.forwardRef(Graf);
