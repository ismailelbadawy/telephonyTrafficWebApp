export abstract class ITelephonyCalculator {
    /**
     * The erlang B traffic forumla
     * @param numberOfTrunks The number of trunks 
     * @param traffic The given traffic
     * @returns `number` which specifies the value of the grade of service
     */
    abstract async erlangB(numberOfTrunks : number, traffic : number) : Promise<number>;
    
    /**
     * The erlang C traffic forumla
     * @param numberOfTrunks The number of trunks 
     * @param traffic The given traffic
     * @returns `number` which specifies the value of the grade of service
     */
    abstract async erlangC(numberOfTrunks : number, traffic : number) : Promise<number>;
    
    /**
     * The poisson traffic forumla
     * @param numberOfTrunks The number of trunks 
     * @param traffic The given traffic
     * @returns `number` which specifies the value of the grade of service
     */
    abstract async poisson(numberOfTrunks : number, traffic : number) : Promise<number>;
}