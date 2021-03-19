import React, { FormEvent, useState } from 'react';
import { CardFilter, TitleCard, BodyCard, SalesHeader, SalesTable } from './styles';
import { TopMenuMV } from '../../shared/styles/menuBar';
import api from '../../services/api';
import { apikey } from '../../shared/utils/endpoints';
import { itens, order, SalesOrder } from '../../models/sales';
import { BuyOrder, ordertobuy } from '../../models/buy';
import { GetCoust, GetLiquidValue } from '../../services/Sales';
import { Inventory } from '../../services/Products';
import { filterCod } from '../../services/Buy';
import { stringify } from 'querystring';
import { totalmem } from 'os';
import { LensTwoTone } from '@material-ui/icons';


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


    const now = new Date();
    const actual = (now.getDate()+"/"+((now.getMonth() + 1))+"/"+now.getFullYear());
    
    const responseSales = await api.get<order>(
        `pedidos/json/?apikey=${apikey}&filters=dataEmissao[
            ${newDate1}TO${actual}]`);
    
    const allSales = responseSales.data.retorno.pedidos;

    
    setBuys(buy);

    if(!sale) {
        return;
    }
        
    // Pegando valores liquidos de cada venda        
    await GetLiquidValue(sale);

    // Pegando Custo Medio Total de cada venda
    await GetCoust(sale, buy);


    //Pegar todas as vendas e contar quantas vendas do mesmo produto tem depois dela
    //teste
    sale.map(sale => {
        
        const orderNumber = sale.pedido.numero;

        //retornando quantas vendas houveram depois da data e quantidade atual em estoque
         const listIntes =  sale.pedido.itens.map( async itens => {

            const codItens = itens.item.codigo;
            
            //verifica vendas depois do numero do pedido
            const verifyAfterSales = allSales.map(iten => {

                //Retorna todas as vendas depois do numero do pedido analisado
                if(iten.pedido.numero >= orderNumber) {
                    const listItens = iten.pedido.itens.filter(list => {
                        return list.item.codigo === codItens;
                    
                })

                if(listItens.length === 0) {
                    return 0;
                }

                return listItens;
                }

                return 0;

            })

            //retornando todas as quantidades dos pedidos
            const eachItem = verifyAfterSales.map(itens => {
                
                if(itens === 0) {
                    return 0;
                }

                return Number(itens.map(e => e.item.quantidade));
            })

            //verificando valor atual em estoque
            const inventory = await Inventory(itens.item.codigo);

            //somando todas as quantidades dos pedidos
            const sumQtde = eachItem.reduce((acc, curr) => {return acc + curr});
            // somando a quantidade com o valor de estoque
            const sumInvQtd = Number(inventory) + sumQtde;
            console.log(itens.item.descricao);
            console.log(sumInvQtd);

            const filter = buy.map(buys => {

                const filtered =filterCod(buys.pedidocompra.itens, codItens)

                if(filtered === 0) {
                    return 0;
                }

                const q = filtered.map(e => e.item.qtde);
                
                const qtde = q.reduce((acc, curr) => {
                    return acc + curr;
                })
                const order = buys.pedidocompra.numeropedido;
                return { order, qtde };
            })

            console.log(filter);
            //tentar retornar o numero do pedido assim que satisfazer o sumInvQtd
            
            const onlyOrder = filter.filter((i) =>  typeof(i) === 'object');
            console.log(onlyOrder)
            
            const orders = onlyOrder.reduce((acc: any, curr: any, index) => {
                console.log("acc : " + acc);
                console.log("curr : " + curr.qtde);
                console.log("sum: " + sumInvQtd);
                console.log("index: " + index);
                const sum = acc + curr.qtde;

                if(sum > sumInvQtd) {

                    return index;
                } 
                    return sum;
                
            }, 0);
            console.log(orders);

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
                        <a href="/sales">Vendas</a>
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
                <div>R$ {(e.pedido.valorfrete).replace(".",",")}</div>
                </>
                    
                </SalesTable>
                ))}
  
         
    

                
        </>
    );      

}





export default Sales;