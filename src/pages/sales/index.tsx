import React, { FormEvent, useState } from 'react';
import { CardFilter, TitleCard, BodyCard, SalesHeader, SalesTable } from './styles';
import { TopMenuMV } from '../../shared/styles/menuBar';
import api from '../../services/api';
import { apikey } from '../../shared/utils/endpoints';
import { itens, order, SalesOrder } from '../../models/sales';
import { getTaxes, getValueWithoutTaxes } from '../../services/taxes/index';
import { BuyOrder, ordertobuy } from '../../models/buy';
import { filterCod, getQtdesofABuy, getSumOfArrayNumber, getValueofABuy } from '../../services/Buy';


const Sales: React.FC = () => {
    
    const [newDate1, setNewDate1] = useState('');
    const [newDate2, setNewDate2] = useState('');

    const [sales, setSales] = useState<SalesOrder[]>([]);
    const [buys, setBuys] = useState<BuyOrder[]>([]);

    async function getOrders(event: FormEvent<HTMLFormElement>): Promise<void> {   

        event.preventDefault();

    const response = await api.get<order>(
        `pedidos/json/?apikey=${apikey}&filters=dataEmissao[${newDate1}TO${newDate2}]`);
    
    const sale = response.data.retorno.pedidos;

    const responses = await api.get<ordertobuy>(
        `pedidoscompra/json/?apikey=${apikey}&filters=situacao[1]`);

    const buy = responses.data.retorno.pedidoscompra[0];
    
    console.log(buy)
    setBuys(buy);

    if(!sale) {
        return;
    }
        
    // Pegando valores liquidos de cada venda        
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

    // Pegando Custo Medio Total de cada venda
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

    sale.map(sale => {

        const listIntes = sale.pedido.itens.map(itens => {

            const codItens = itens.item.codigo;
            const qtdeItens = itens.item.quantidade;
            
            const listbuys = buy.map(list => {
                
                const filt = list.pedidocompra.itens.filter(list => {
                    return list.item.codigo === codItens;
                })

                if(filt.length === 0) {
                    return 0;
                }
                console.log(itens.item.descricao);
                console.log(filt)
                return filt;
            })
        })
    })

        //@ts-ignore
        if(!sale.erros) {
            setSales(sale);
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
                <div>R$ {(e.pedido.totalliquido).toFixed(2).replace(".",",")}</div>
                <div>R$ {(e.pedido.totalcustocomprado).toFixed(2).replace(".",",")}</div>
                <div>R$ {((e.pedido.totalliquido)-(e.pedido.totalcustocomprado)).toFixed(2).replace(".",",")}</div>
                <div>R$ {e.pedido.valorfrete}</div>
                </>
                    
                </SalesTable>
                ))}
  
         
    

                
        </>
    );      

}





export default Sales;