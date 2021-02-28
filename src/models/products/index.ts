export interface store {
    deposito: {
        id: string;
        nome: string;
        saldo: string;
    }
}



export interface ProductOrder {

    produto:{
        codigo: string;
        descricao: string;
        preco: string;
        estoqueAtual: string;
        depositos: store[];
        nomeFornecedor: string;
    }

}

export interface ordertoproduct {
    retorno: {
        produtos: ProductOrder[];        
    }

}

