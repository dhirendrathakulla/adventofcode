import fs  from "fs";
import { exit } from "process";
export class AdventCode {
    dataArray: Array<number> = [];
    constructor(){
        let text = fs.readFileSync("./input.txt").toString().trim();
        let data = text.split("\n");
        Object.keys(data).forEach((key) =>{
            this.dataArray.push(parseInt(data[key]));
        });
       let count= AdventCode.higherSpeedIncreaseCount(this.dataArray);
       console.log("count ==",count)
    }
    public static higherSpeedIncreaseCount(arrayData:Array<number>): number{
        let count = 0;
        let dataLength = arrayData.length;
        arrayData.forEach((ele,index) =>{
            if(index <= dataLength-1 && ele < arrayData[index+1]){
                count++
            }
        })

        return count;
    }


}