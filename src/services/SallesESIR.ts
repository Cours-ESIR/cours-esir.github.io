type dbArray = {
	[salle:string]:{'error':string,'until':number,'state':boolean}
};

export default class sallesESIR {
	public static readonly GITHUB_API_URL =
		'https://api.github.com/repos/Cours-ESIR/Cours/contents';

	public static async fetchSalles(salles:string[],ntime:string): Promise<dbArray> {
		let data = await fetch('https://aquabx.ovh:2003?salles=' + salles.join(",") +'&type=libres' +ntime);
		return await data.json();
	}

	public static async fetchEvents(salle:string,ntime:string): Promise<dbArray> {
		let data = await fetch('https://aquabx.ovh:2003?salles=' + salle +'&type=events' + ntime);
		return await data.json();
	}
}
