export default class GithubService {
  
    public static readonly GITHUB_API_URL = 'https://api.github.com/repos/Cours-ESIR/Cours/contents';
    public static readonly GITHUB_DATA_URL = 'https://raw.githubusercontent.com/Cours-ESIR/Cours/main/';

    public static async getAllFiles(): Promise<string[]> {
        let files: string[] = [];
        let folders: string[] = [''];
        while (folders.length !== 0) {
            let path = folders.pop() ?? "";
            let data = await this.fetch(path);
    
            for (let item of data) {
                let name = item["name"];
                if(name.split(".").length === 2){
                    files.push(path + '/' + name);
                } else {
                    folders.push(path + '/' + name);
                }
            }
        }

        return files;
    }

    public static async getAllFilesPath(path): Promise<string[]> {
        let all: string[] = [];

        let data = await this.fetch(path);
    
        for (let item of data) {
            let name = item["name"].split(".");
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

    public static async fetch(path: string): Promise<any> {
        let data = await fetch(this.GITHUB_API_URL + path, {
            headers: {
                Authorization: "Basic OWM4ZDcxYTc2MTM4ZjYxMmI4NzQ6N2U5MjIwOGMxZDY1MzRiZGMxZmVhNTZjMTZhMGY4MWY4ZGE4ZDI5NA=="
            }
        });
        return await data.json();
    }

    public static async getFileContent(path: string): Promise<string> {
        let data = await fetch(this.GITHUB_DATA_URL + path);
        return await data.text();
    }
};