import { BuyOrder } from "../../models/buy";
import { SalesOrder } from "../../models/sales";
import { filterCod, getQtdesofABuy, getSumOfArrayNumber, getValueofABuy } from "../Buy";
import { getTaxes, getValueWithoutTaxes } from "../taxes";


export async function GetLiquidValue(sale: SalesOrder[]) {

    sale.map(sale => {

        const getvalue = sale.pedido.parcelas.map(payment => {

            const value = payment.parcela.valor;
            const getpay = payment.parcela.forma_pagamento.id;
            const taxes = getValueWithoutTaxes(value, getTaxes(getpay));
            return taxes;
        })

        const sum = getvalue.reduce((acc, curr) => {return acc + curr});

        return sale.pedido.totalliquido = sum;
    })

}


export async function GetCoust(sale: SalesOrder[], buy: BuyOrder[]) {

    sale.map(sale => {

        const listItens = sale.pedido.itens.map(itens => {

            const codSaleIten = itens.item.codigo;
            const qtdeSale = itens.item.quantidade;
            
            const cousts = buy.map(list => {

                const filter = filterCod(list.pedidocompra.itens, codSaleIten)
                
                if(filter === 0) {
                    return 0;
                }

                return getValueofABuy(filter);
                
            })
            
            const totalValue = getSumOfArrayNumber(cousts);

            const qtdes = buy.map(list => {

                const filter = filterCod(list.pedidocompra.itens, codSaleIten)
                
                if(filter === 0) {
                    return 0;
                }

                return getQtdesofABuy(filter);


            })

            const totalQtdes = getSumOfArrayNumber(qtdes);

            const media = totalValue / totalQtdes;
            return  media * Number(qtdeSale);

        })

        return sale.pedido.totalcustocomprado = getSumOfArrayNumber(listItens);

    })  
}

