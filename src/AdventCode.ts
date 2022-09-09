import fs  from "fs";
import { exit } from "process";
import { extractDataFromFile, extractDataFromFileString } from "./utils";
export class AdventCode {
    dataArray: Array<number> = [];
    constructor(){
        // let text = fs.readFileSync("./input.txt").toString().trim();
        // let data = text.split("\n");
        // Object.keys(data).forEach((key) =>{
        //     this.dataArray.push(parseInt(data[key]));
        // });
        this.dataArray = extractDataFromFile("input");
       let count= AdventCode.higherSpeedIncreaseCount(this.dataArray);
       let windowCount= AdventCode.checkWindowsIncreaseCount(this.dataArray);
       
       console.log("count ==",count)
       console.log("windowCount ==",windowCount)
       let hdc = AdventCode.day2task1(extractDataFromFileString("command-input"));
       console.log("d2 task 1 ==",hdc)
       let day2task2 = AdventCode.day2task2(extractDataFromFileString("command-input"));
       console.log("d2 task 2 ==",day2task2)
       let day3task1 = AdventCode.day3task1(extractDataFromFileString("binary-input"));
       console.log("d3 task 1 ==",day3task1)
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

    public static day2task1(arrayData:Array<string>): number {
        let horizontalPos:number = 0;
        let depthPos:number = 0;
        arrayData.map(ele => {
            let data = ele.split(" ")
            if(data[0].toLocaleUpperCase() == "DOWN"){
                depthPos += parseInt(data[1])
            }else if(data[0].toLocaleUpperCase() == "FORWARD"){
                horizontalPos += parseInt(data[1])
            }else if(data[0].toLocaleUpperCase() == "UP"){
                depthPos -= parseInt(data[1])
            }
        })
        return horizontalPos * depthPos;
    }
    public static day2task2(arrayData:Array<string>): number {
        let horizontalPos:number = 0;
        let depthPos:number = 0;
        let aim:number = 0;
        arrayData.map(ele => {
            let data = ele.split(" ")
            if(data[0].toLocaleUpperCase() == "DOWN"){
                aim += parseInt(data[1])
            }else if(data[0].toLocaleUpperCase() == "UP"){
                aim -= parseInt(data[1])
            }else if(data[0].toLocaleUpperCase() == "FORWARD"){
                horizontalPos += parseInt(data[1]);
                depthPos += aim * parseInt(data[1]);
            }
        })
        return horizontalPos * depthPos;
    }
    public static day3task1(arrayData:Array<string>): number {
        let arr:Array<number> = [];
        let gammaRateString:string="";
        let  epsilonRateString:string="";

        arrayData.map((ele,i) => {
            let charArry = Array.from(ele);
            charArry.forEach((char,index)=>{
                if(char == "1"){
                    (arr[index])? ++arr[index]:arr[index] = 1;
                }else{
                    arr[index]?--arr[index]:arr[index] = -1;
                }
                if(i == arrayData.length -1){
                    gammaRateString += (arr[index] > 0)?"1":"0";
                    epsilonRateString += (arr[index] <= 0)?"1":"0";
                }
            });
        });
        return parseInt(gammaRateString,2) * parseInt(epsilonRateString,2);
    }

}