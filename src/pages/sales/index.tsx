import React, { FormEvent, useState } from 'react';
import { CardFilter, TitleCard, BodyCard, SalesHeader, SalesTable } from './styles';
import { TopMenuMV } from '../../shared/styles/menuBar';
import api from '../../services/api';
import { apikey } from '../../shared/utils/endpoints';
import { itens, order, SalesOrder } from '../../models/sales';
import { getTaxes, getValueWithoutTaxes } from '../../services/taxes/index';
import Buy from '../../services/Buy';
import { Inventory } from '../../services/Products';

const Sales: React.FC = () => {
    
    const [newDate1, setNewDate1] = useState('');
    const [newDate2, setNewDate2] = useState('');

    const [sales, setSales] = useState<SalesOrder[]>([]);

    async function getOrders(event: FormEvent<HTMLFormElement>): Promise<void> {

        event.preventDefault();

    const response = await api.get<order>(
        `pedidos/json/?apikey=${apikey}&filters=dataEmissao[${newDate1}TO${newDate2}]`);
    
    const sale = response.data;
    
    const updateLiquid = response.data.retorno.pedidos.map((p: SalesOrder) => {
        
        const value = p.pedido.parcelas.map(e => {
            const total = e.parcela.valor;
            const taxe = e.parcela.forma_pagamento.id;
            const valueliquid = getValueWithoutTaxes(total, getTaxes(taxe))
            return {valueliquid};
        })

        const sum = value.map(e => (e.valueliquid)).reduce((acc, curr): any => {
        
            return acc + curr;
            
        }).toFixed(2)

        return p.pedido.totalliquido = sum;
    }


    


        
    );

    const updateCoust = response.data.retorno.pedidos.map((p: SalesOrder) => {
        
        const product = p.pedido.itens.map(q => {
            const cod = q.item.codigo;
            return cod;
        })

        return product;
    })

    // const updatecoust = response.data.retorno.pedidos.map((p: SalesOrder) => {
        
        // consumir api de compras e api de vendas *
        // pegar todo historico de compras e vendas do produto *
        // pegar o valor atual em estoque *
        // {numero} = contar quantas vendas foram realizadas depois da venda que esta sendo analisada
        // {Conta} = conta a quantidade e compras realizadas ate o valor {numero+1}
        // pegar o valor do custo dessa compra
        
    //     return 200;
    // })


      
        //@ts-ignore
        if(!response.data.retorno.erros) {
             setSales(sale.retorno.pedidos);
        } else {
             setSales([]);
        }



    }




    return (
        <>
                <TopMenuMV>
                    <div>
                        <a href="/">Home</a>
                        <a href="/">Vendas</a>
                        <a href="/">Compras</a>
                    </div>
                </TopMenuMV>
                <CardFilter>
                    <TitleCard>Filtros</TitleCard>
                    <BodyCard>
                        <li>
                            <form onSubmit={getOrders}>
                                <u>Data 1:</u>
                                <input value={newDate1} 
                                onChange={(e) => setNewDate1(e.target.value)}
                                placeholder='dd/mm/aaaa'></input>
                                <u>Data 2:</u>
                                <input value={newDate2} 
                                onChange={(e) => setNewDate2(e.target.value)}
                                placeholder='dd/mm/aaaa'></input>
                                <input placeholder='Digite o nome do produto' className='found' ></input>
                                <button type='submit'>Pesquisar</button>
                            </form>
                        </li>
                    </BodyCard>
                </CardFilter>   
                <SalesHeader>
                    <li>
                    <u>N. do Pedido</u>
                    <u>Vendedor</u>
                    <u>Produtos</u>
                    <u>Valor Liquido</u>
                    <u>Custo</u>
                    <u>Lucro</u>
                    <u>Frete</u>
                    <hr></hr>
                    </li>
                </SalesHeader>
                {sales.map((e) => (
                <SalesTable key={e.pedido.numero}>
                <>
                <a href="teste">{e.pedido.numero}</a>               
                <div>{e.pedido.vendedor}</div>
                <div>{e.pedido.itens.map((s: itens, index: number) => (index !== 0) ?
                " + "+Number(s.item.quantidade)+" "+s.item.descricao : 
                " "+Number(s.item.quantidade)+" "+s.item.descricao) }
                </div>
                <div>R$ {e.pedido.totalliquido}</div>
                <div>R$ </div>
                <div>R$ {(Number(e.pedido.totalliquido) - 200).toFixed(2)}</div>
                <div>R$ {e.pedido.valorfrete}</div>
                </>
                    
                </SalesTable>
                ))}
  
         
    

                
        </>
    );      

}





export default Sales;