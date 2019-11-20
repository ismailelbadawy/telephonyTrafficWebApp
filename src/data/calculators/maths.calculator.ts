import { Injectable } from "@angular/core";
import { ITelephonyCalculator } from 'src/core/calculators/telephony.calculator';

@Injectable({
    providedIn: 'root'
})
export class MathsTelephonyCalculator implements ITelephonyCalculator {

    /**
     * Calculates the gos value for an erlang B formula.
     * @param numberOfTrunks N
     * @param traffic A
     */
    erlangB(numberOfTrunks: number, traffic: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let N = numberOfTrunks;
            let A = traffic;

            let denomenator: number = 0;
            for (let i = 0; i <= N; i++) {
                denomenator += (Math.pow(A, i) / MathsTelephonyCalculator._factorial(i));
            }

            resolve((Math.pow(A, N) / MathsTelephonyCalculator._factorial(N)) / (denomenator));
        })
    }

    /**
     * According to an ErlangC formula it calculates the gos value
     * @param numberOfTrunks N
     * @param traffic A
     * @returns GoS
     */
    erlangC(numberOfTrunks: number, traffic: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let N = numberOfTrunks;
            let A = traffic;

            let numerator = (Math.pow(A, N) / MathsTelephonyCalculator._factorial(N)) * (N / (N - A));
            let denomenator: number = 0;
            for (let x = 0; x <= (N - 1); x++) {
                denomenator += ((Math.pow(A, x) / MathsTelephonyCalculator._factorial(x)) + numerator);
            }
            resolve(numerator / denomenator);
        });
    }


    /**
     * According to the poisson formula calculates the GoS value
     * @param numberOfTrunks N
     * @param traffic A
     */
    poisson(numberOfTrunks: number, traffic: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let N : number = numberOfTrunks;
            let A : number = traffic;
            let summation = 0;
            for (let i = 0; i < N; i++) {
                summation = summation + (Math.pow(A, i)/ MathsTelephonyCalculator._factorial(i));
            }
            let output = (1 - (Math.exp(- A) * summation));
            resolve(output);
        });
    }

    /**
     * A helper function to get the factorial of any integer
     * @param num Any integer
     */
    private static _factorial(num: number) {
        var rval = 1;
        for (var i = 2; i <= num; i++) {
            rval = rval * i;
        }
        return rval;
    }
}