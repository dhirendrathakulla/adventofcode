import fs  from "fs";
import { exit } from "process";
import { extractDataFromFile, extractDataFromFileString,extractInputString } from "./utils";

interface Count {
    count1: number,
    count0: number,
}
export class AdventCode {
    dataArray: Array<number> = [];
   count10 = {count1:0,count0:0};

    constructor(){
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
       let day3task2 = AdventCode.day3task2(extractDataFromFileString("binary-input"));
       console.log("d3 task 2 ==",day3task2)
       let day4task1 = AdventCode.day4task1(extractInputString("boards-input"));
       console.log("d4 task 1 ==",day4task1)

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
    public static day3task2(arrayData:Array<string>): number {
        let lifeSupportRating:number; //lifeSupportRating = oxyGenerator * co2Scrubber
        let oxygenGeneratorFinalArray = arrayData;
        let co2GeneratorFinalArray = arrayData;
        let isOxygenGenerator = true;
        // length of first each element, assuming all element length is same
        for(let i= 0; i< arrayData[0].length; i++){
            if(oxygenGeneratorFinalArray.length > 1){
                oxygenGeneratorFinalArray = AdventCode.filterData(oxygenGeneratorFinalArray,i,isOxygenGenerator);
            }
            if(co2GeneratorFinalArray.length > 1){
                co2GeneratorFinalArray = AdventCode.filterData(co2GeneratorFinalArray,i);
            }
        }
        lifeSupportRating = parseInt(oxygenGeneratorFinalArray[0],2) * parseInt(co2GeneratorFinalArray[0],2);
        return lifeSupportRating;
    }

    public static filterData(filterArray:Array<string>,elePos:number,isOxygen:boolean=false):Array<string> {
        let array1:Array<string>= [];
        let array0:Array<string>= [];
        let finalArray:Array<string>= [];
        filterArray.map((ele) => {
            let charArry = Array.from(ele);
            if(charArry[elePos] == "1"){
                array1.push(ele)
            }else if(charArry[elePos] == "0"){
                array0.push(ele)
            }
        });
        if(isOxygen) { // prior to 1 if equal, used for oxygen 
            finalArray = (array1.length >= array0.length)?array1:array0;
        }else{//prior to 0 if equal, used for CO2
            finalArray = (array0.length <= array1.length)?array0:array1;
        }
        return finalArray;
    }

    public static day4task1(arrayData:Array<string>): number {
        let drawnNumbers = arrayData[0];
        let boards = arrayData.slice(1,arrayData.length)
        console.log(boards)
        return 0;
    }

}