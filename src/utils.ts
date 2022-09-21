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
export function extractInputString (fileName:string):Array<string> {
    let finalArray: Array<string> = [];
    let text = fs.readFileSync("./"+fileName+".txt").toString().trim();
    let data = text.split("\n");
    let lastIndex:number=1;

    for (let key = 0; key< Object.keys(data).length-1; key++){
        var board:string ="";
        if(key < lastIndex && key > 0){
            continue;
        }
        if(key == 0){
            board = data[key];
        }else if(key > 1){
            if(!data[lastIndex]) {
                lastIndex++;
                continue;
            }
            board = data[lastIndex];
            for(let i =1; i<= 5; i++){
                lastIndex++;
                if(data[lastIndex]){
                    board += " "+data[lastIndex];
                }
            }
        }
        if(board)
        finalArray.push(board);
    }

    return finalArray;
    
}

    

