import type { SalleInfo, SalleData } from '@/types/Salles';
import SallesESIR from '@/services/SallesESIR';

async function get_events(salle:string, date: string = ''): Promise<any>{
	let data = await SallesESIR.fetchEvents(salle, date);
	return data[salle]
}

async function get_salles(salles_data: Record<string, SalleInfo>, date: string = ''): Promise<Record<string, SalleInfo>> {
	const salles: Record<string, SalleData> = await SallesESIR.fetchSalles(Object.keys(salles_data), date);

	for(let name in salles) {
		if (salles[name]['error']) {
			salles_data[name]['class'] = 'grey';
			salles_data[name]['time'] = new Date(parseInt(date.split("=")[1]))
		} else if (salles[name]['state']) {
			salles_data[name]['class'] = 'green';
			salles_data[name]['time'] = new Date(salles[name]['until'])
		} else {
			salles_data[name]['class'] = 'red';
			salles_data[name]['time'] = new Date(salles[name]['until'])
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
