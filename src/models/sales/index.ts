export interface SalesOrder {

    pedido:{
        data: string;
        numero: string;
        loja: string;
        vendedor: string;
        valorfrete: string;
        totalprodutos: string;
        totalliquido: number;
        totalcustocomprado: number;
        totalqtdecomprada: string;
        situacao: string;
        itens: itens[];
        parcelas: Payment[];
    }

}

export interface order {
    retorno: {
    pedidos: SalesOrder[];
    }
}

export interface itens {
    item: {
    codigo: string;
    descricao: string;
    quantidade: string;
    valorunidade: string;
    }
}

export interface Payment{
    parcela: {
        valor: string;
        idLancamento: string;
        forma_pagamento: {
            id: string;
            descricao: string;
            codigofiscal: string;
        }
    }
}
