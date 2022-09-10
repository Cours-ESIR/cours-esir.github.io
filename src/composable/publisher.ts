import { reactive } from "vue";

let folderSelected = reactive([""])

async function create_fork(repo:string,token:string) {
	let fet = await fetch("https://api.github.com/repos/"+repo+"/forks",{method:"POST",headers:{"Authorization":"token " + token}})
	return await fet.json()
}

async function update_fork(repo:string,token:string) {
	let fet = await fetch("https://api.github.com/repos/"+repo+"/merge-upstream",{method:"POST","body":'{"branch":"main"}',headers:{"Authorization":"token " + token}})
	return await fet.json()
}

async function check_fork(repo:string,token:string) {
	let fet = await fetch("https://api.github.com/repos/"+repo)
	let fet2 = await fet.json()
	return ( fet2["message"] == "Not Found" ) ? false : true
}

function fbtoa(input:string){
	return btoa(unescape(encodeURIComponent(input)))
}

function fatob(input:string){
	return decodeURIComponent(escape(atob(input)))
}

async function create_file(repo:string,token:string,path:string,msg:string,content:string) {
	let fet = await fetch("https://api.github.com/repos/"+repo+"/contents"+path,{method:"PUT",headers:{"Authorization":"token " + token},body:'{"message":"'+msg+'","content":"'+fbtoa(content)+'"}'})
	return await fet.json()
}

async function delete_file(repo:string,token:string,path:string,msg:string) {
	let sha = await check_file(repo,path,token)
	let fet = await fetch("https://api.github.com/repos/"+repo+"/contents"+path,{method:"DELETE",headers:{"Authorization":"token " + token,sha:sha},body:'{"message":"'+msg+'"}'})
	return await fet.json()
}

async function modif_file(repo:string,token:string,path:string,msg:string,content:string,sha:string) {
	let fet = await fetch("https://api.github.com/repos/"+repo+"/contents"+path,{method:"PUT",headers:{"Authorization":"token " + token},body:'{"sha":"'+sha+'","message":"'+msg+'","content":"'+fbtoa(content)+'"}'})
	return await fet.json()
}

async function get_content(repo:string,path:string,msg:string,token?:string){
	let fet
	if (token) {
		fet = await fetch(`https://api.github.com/repos/${repo}/contents${path}`,{headers:{"Authorization":"token " + token}})
		
	}
	else {
		fet = await fetch(`https://api.github.com/repos/${repo}/contents${path}`)
	}
	return await fatob( (await fet.json())["content"] )
}

async function check_file(repo:string,path:string,token?:string){
	try{
		let fet 
		if (token) {
			fet = await fetch(`https://api.github.com/repos/${repo}/contents${path}`,{headers:{"Authorization":"token " + token}})
		}
		else {
			fet = await fetch(`https://api.github.com/repos/${repo}/contents${path}`)
		}
		let fet2 = await fet.json()
		console.log(fet2)
		return fet2["sha"]
	}
	catch(e){
		return false
	}
	//return ( fet2["message"] == "Not Found" ) ? false : fet2["sha"]
}

async function pull_req( repo:string,token:string,title:string,body:string,username:string ) {
	let fet = await fetch("https://api.github.com/repos/"+repo+"/pulls",{
		method:"POST",
		headers:{"Authorization":"token " + token},
		body: '{"title":"'+title+'","body":"'+body+'","head":"'+username+':main","base":"main"}'
	})
	return await fet.json()
}

async function get_login(token:string){
	let fet = await fetch("https://api.github.com/user",{headers:{"Authorization":"token " + token}})
	return await fet.json()
}


// init repo initial

let repo_own = "Cours-ESIR"
let repo_name = "Cours"
let repo = repo_own + "/" + repo_name

async function upload(token:string,content:string,path:string,title:string,description:string) {

	// l'utilisateur
	let login = await get_login(token)
	login = login["login"]

	let login_repo = login + "/" + repo_name

	// le fichier

	let body  = "Changement sur " + path

	let check_f = await check_fork( login_repo ,token)

	if ( check_f ) {
		let fork = await update_fork( login_repo , token)
	}

	else {
		let fork = await create_fork("Cours-ESIR/Cours", token)
	}

	let check = await check_file(login_repo,path)

	if ( check==false ){
		await create_file(login_repo,token,path,description,content)
	}
	else {
		await modif_file(login_repo,token,path,description,content,check)
	}

	await pull_req( repo,token,title,body,login )
}

export default function () {
	return {
		folderSelected,
		upload,
	};
}