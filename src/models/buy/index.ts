export interface BuyOrder {

    pedidocompra:{
        data: string;
        numeropedido: string;
        fornecedor: provider[];
        itens: itens[];
        parcelas: Payment[];
    }

}

export interface ordertobuy {
    retorno: {
        pedidoscompra: [
            BuyOrder[],
        ]
            
    }

}

export interface itens {
    item: {
    codigo: string;
    descricao: string;
    qtde: number;
    valor: string;
    customedio: string;
    }
}

export interface Payment{
    parcela: {
        valor: string;
        dataVencimento: string;
        forma_pagamento: {
            id: string;
            descricao: string;
            codigofiscal: string;
        }
    }
}

export interface provider {
    fornecedor: {
        nome: string;
    }
}
