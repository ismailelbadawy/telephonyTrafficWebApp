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