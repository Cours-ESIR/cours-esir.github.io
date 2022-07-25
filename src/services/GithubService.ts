export default class GithubService {
    public static files: string[] = []
    public static folders: string[] = []
    public static all: string[] = []

    public static readonly GITHUB_API_URL = 'https://api.github.com/repos/Cours-ESIR/Cours/contents';
    public static readonly GITHUB_TREE_URL = 'https://api.github.com/repos/Cours-ESIR/Cours/git/trees/main?recursive=1';
    public static readonly GITHUB_DATA_URL = 'https://raw.githubusercontent.com/Cours-ESIR/Cours/main/';

    public static async init(){
        let data = await this.fetchTree();

        for (let item of data.tree) {
            //let name = item["name"];
            let name = item["path"];
            if(name.split(".").length === 2){
                this.files.push("/" + name);
            } else {
                this.folders.push("/" + name);
            }
            this.all.push("/" + name);
        }
    }

    public static async getAllFiles(): Promise<string[]> {
        if (this.files.length === 0){
            await this.init()
        }

        return this.files;
    }

    public static async getAllFilesPath(path): Promise<string[]> {
        let all: string[] = [];

        if (this.files.length === 0){
            await this.init()
        }
    
        for (let item of this.all) {
            if ( ! item.startsWith(path) ) continue
            let s_item = item.split("/")
            let s_path = path.split("/")

            if ( ( s_path.length < s_item.length || s_item.length < s_path.length ) && s_path[1] == "" ) continue

            if ( s_path.length+1 !== s_item.length && s_path[1] !== "" ) continue
            

            let name = item.split("/").at(-1).split(".");
            let kind
            if(name.length === 2){
                kind = "file"
            } else {
                kind = "folder"
            }
            all.push({"kind":kind,"name":name[0]});
        }
    

        return all;
    }

    public static async fetchTree(): Promise<any> {
        let data = await fetch(this.GITHUB_TREE_URL);
        return await data.json();
    }

    public static async getFileContent(path: string): Promise<string> {
        let data = await fetch(this.GITHUB_DATA_URL + path);
        return await data.text();
    }
};


// old 



    //public static async fetch(path: string): Promise<any> {
    //    let data = await fetch(this.GITHUB_API_URL + path, {
    //        headers: {
    //            Authorization: "Basic OWM4ZDcxYTc2MTM4ZjYxMmI4NzQ6N2U5MjIwOGMxZDY1MzRiZGMxZmVhNTZjMTZhMGY4MWY4ZGE4ZDI5NA=="
    //        }
    //    });
    //    return await data.json();
    //}