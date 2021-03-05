import { itens } from "../../models/buy";


export function filterCod(itens: itens[], id: string) {

    const get = itens.filter(itens => {
        return itens.item.codigo === id
    })

    if(get.length === 0) {
        return 0;
    }

    return get;
}

export function getValueofABuy(itens: itens[]) {
    
    const itensValue = itens.map(values => {

        const value = Number(values.item.valor)*(values.item.qtde);
        return value;
    })

    const sum = itensValue.reduce((acc, curr) => {return acc + curr});
    return sum;
}

export function getQtdesofABuy(itens: itens[]) {
    
    const itensValue = itens.map(values => {

        const value = values.item.qtde;
        return value;
    })

    const sum = itensValue.reduce((acc, curr) => {return acc + curr});
    return sum;
}


export function getSumOfArrayNumber(number: number[]) {

    return number.reduce((acc, curr) => {return acc + curr});
}