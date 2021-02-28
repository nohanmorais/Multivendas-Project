import { taxes } from "../../shared/utils/taxes";

export function getId(id:string): any {
    const foundId = taxes.find(i => {
        return i.forma_pagamento.id;
    });

    return foundId;
}

export function getTaxes(id: string):number {
    const foundId = taxes.find(i => {
        return i.forma_pagamento.id === id;
    });

    if(!foundId) {
        return 0;
    }

    return foundId.forma_pagamento.tax;
}

export function getValueWithoutTaxes (totalprodutos: string, tax:number): number {
    
    const LiquidValue = Number(totalprodutos) - (Number(totalprodutos)*(tax/100));
    
    return LiquidValue;
}

