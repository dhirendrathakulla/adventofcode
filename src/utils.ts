import fs  from "fs";

export function extractDataFromFile (fileName:string):Array<number> {
    let dataArray: Array<number> = [];
    let text = fs.readFileSync("./"+fileName+".txt").toString().trim();
        let data = text.split("\n");
        Object.keys(data).forEach((key) =>{
            dataArray.push(parseInt(data[key]));
        });
    return dataArray;
}
export function extractDataFromFileString (fileName:string):Array<string> {
    let dataArray: Array<string> = [];
    let text = fs.readFileSync("./"+fileName+".txt").toString().trim();
        let data = text.split("\n");
        Object.keys(data).forEach((key) =>{
            dataArray.push((data[key]));
        });

    return dataArray;
    
}
