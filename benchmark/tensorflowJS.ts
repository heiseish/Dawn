import fs from 'fs';
import { predict } from '../src/main/externalApis/@google/tensorflow/intentClassification';
import { measureExecutionTimeAsync } from '../src/main/utils/benchmark';
import { tqdm } from '../src/main/utils/tqdm';
fs.readFile('benchmark/tensorflowJSSamples.txt', async (err, data) => { 
	if (err) throw err; 
	let f:string = data.toString();
	let sentences:string[] = f.split('\n');
	let extimeA:number[] = [];
	let extimeB:number[] = [];
	for (let s of tqdm<string>(sentences, {
		desc: 'Running execution time benchmark for Tensorflow JS',
		logging: true
	})) {
		let both:[number, number] = await measureExecutionTimeAsync(predict.bind(null, s)); 
		extimeA.push(both[0]);
		extimeB.push(both[0]);
	}
	let sumA:number = extimeA.reduce((a:number, b:number) => a + b);
	let sumB:number = extimeB.reduce((a:number, b:number) => a + b);
	let maxA:string = extimeA.reduce((a:number, b:number) => Math.max(a, b)).toFixed(2);
	let maxB:string = extimeB.reduce((a:number, b:number) => Math.max(a, b)).toFixed(2);
	console.log(`Average execution time for process.hr is ${(sumA / extimeA.length).toFixed(2)} ms ` + 
	`for performance.now is ${(sumB / extimeB.length).toFixed(2)} ms`)
	console.log(`Maximum execution time for process.hr is ${maxA} ms ` + 
	`for performance.now is ${maxB} ms`)
}) 
