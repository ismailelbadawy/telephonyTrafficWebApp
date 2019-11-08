import { Injectable } from "@angular/core";
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';

@Injectable({
    providedIn: 'root'
})
export class MathsTelephonyCalculator implements ITelephonyCalculator {

    async erlangB(numberOfTrunks: number, traffic: number): Promise<number> {
        let N = numberOfTrunks;
        let A = traffic;

        let denomenator : number = 0;
        for (let i = 0; i <= N; i++) {
            denomenator += (Math.pow(A, i) / MathsTelephonyCalculator._factorial(i));
        }
        
        return (Math.pow(A, N) / MathsTelephonyCalculator._factorial(N)) / (denomenator)
    }

    async erlangC(numberOfTrunks: number, traffic: number): Promise<number> {
        let N = numberOfTrunks;
        let A = traffic;

        let numerator = (Math.pow(A, N) / MathsTelephonyCalculator._factorial(N)) * (N/(N - A));
        let denomenator : number = 0;
        for(let x = 0; x <= (N-1); x++) {
            denomenator += ((Math.pow(A, x) / MathsTelephonyCalculator._factorial(x)) + numerator);
        }
        return numerator / denomenator;
    }

    async poisson(numberOfTrunks: number, traffic: number): Promise<number> {
        let N = numberOfTrunks;
        let A = traffic;
        let factor = (1 - Math.exp(-1 * A));
        let summation = 0;
        for(let i = 0; i <= (N-1); i++) {
            summation += (Math.pow(A, i) / MathsTelephonyCalculator._factorial(i));
        }
        return summation * factor;
    }

    private static _factorial(num : number) {
        var rval = 1;
        for (var i = 2; i <= num; i++){
            rval = rval * i;
        }
        return rval;
    }
}