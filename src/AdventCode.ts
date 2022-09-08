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
       let windowCount= AdventCode.checkWindowsIncreaseCount(this.dataArray);
       
       console.log("count ==",count)
       console.log("windowCount ==",windowCount)
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

    public static checkWindowsIncreaseCount(arrayData:Array<number>): number{
        let count = 0
        arrayData.forEach((ele,index) =>{
            if(arrayData[index+3]){
                let windowFirst = ele + arrayData[index+1] + arrayData[index+2];
                let windowSecond = arrayData[index+1] + arrayData[index+2] + arrayData[index+3];
                if(windowFirst < windowSecond){
                    count++;
                }
            }
            
        })

        return count;
    }
    


}