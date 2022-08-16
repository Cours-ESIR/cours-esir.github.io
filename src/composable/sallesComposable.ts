import { reactive } from 'vue';
import SallesESIR from '@/services/SallesESIR';


type ClassRecord = {
	[name: string]: { class: string };
};



async function get_salles(salles_data:ClassRecord,date:String=""): Promise<ClassRecord> {
	for (let salle in salles_data){

		if ( typeof(salle) !== "string" ) {break}

		let data = await SallesESIR.fetchSalles([salle],date)

		if (data[salle]['erreur']) {
			salles_data[salle]['class'] = 'grey';
		} else if (data[salle]['state']) {
			salles_data[salle]['class'] = 'green';
		} else {
			salles_data[salle]['class'] = 'red';
		}
	}
	return salles_data
}

export default function () {
	return {
		get_salles,
	};
}