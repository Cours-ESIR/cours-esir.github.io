import SallesESIR from '@/services/SallesESIR';

type ClassRecord = {
	[name: string]: { class: string ,time?: number };
};

type sallesData = {
	[salle: string]: {
		'error': string,
		'until': number,
		'state': boolean
	}
}

async function get_events(salle:string,date: string = ''): Promise<any>{
	let data = await SallesESIR.fetchEvents(salle,date);

	return data[salle]
}

async function get_salles(salles_data: ClassRecord, date: string = ''): Promise<ClassRecord> {
	for (let salle in salles_data){

		if ( typeof(salle) !== "string" ) {break}

		let data:sallesData = await SallesESIR.fetchSalles([salle],date)

		if (data[salle]['error']) {
			salles_data[salle]['class'] = 'grey';
			salles_data[salle]['time'] = parseInt(date.split("=")[1])
		} else if (data[salle]['state']) {
			salles_data[salle]['class'] = 'green';
			salles_data[salle]['time'] = data[salle]['until']
		} else {
			salles_data[salle]['class'] = 'red';
			salles_data[salle]['time'] = data[salle]['until']
		}
	}
	return salles_data
}

export default function () {
	return {
		get_salles,
		get_events,
	};
}
