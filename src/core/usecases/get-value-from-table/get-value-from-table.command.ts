/**
 * The GetValueFromTableCommand
 * @param erlangFormula specifies the type of the traffic formula 
 * @param output The needed output type one of the three params
 * @param traffic
 * @param numberOfTrunks
 * @param numberOfUsers always set to null
 * @param gradeOfService
 */
export class GetValueFromTableCommand {
    constructor(
        public erlangFormula : ErlangFormula,
        public output : OutputParam,
        public traffic : number | null,
        public numberOfTrunks : number | null,
        public numberOfUsers : number | null,
        public gradeOfService : number | null
    ) {

    }
}

export enum ErlangFormula{
    Poisson,
    ErlangB,
    ErlangC
}

export enum OutputParam {
    Traffic,
    Trunks,
    GradeOfService
}