import { ErlangFormula } from '../get-value-from-table/get-value-from-table.command';

export class GetTableFromParamsCommand {
    public get trafficFormula(): ErlangFormula {
        return this._trafficFormula;
    }
    
    public get trunkValues(): number[] {
        return this._trunkValues;
    }
    
    public get gosValues(): number[] {
        return this._gosValues;
    }
    
    constructor(
        private _trafficFormula: ErlangFormula,
        private _gosValues: number[],
        private _trunkValues: number[]
    ) {
        
    }
}