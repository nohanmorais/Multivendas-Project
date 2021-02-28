import { ordertobuy } from "../../models/buy";
import { apikey } from "../../shared/utils/endpoints";
import api from "../api";


async function Buy (id_product: string): Promise<any> {

    const response = await api.get<ordertobuy>(
        `pedidoscompra/json/?apikey=${apikey}&filters=situacao[1]`);

    // retornando os codigos dos produtos
     const buy = response.data.retorno.pedidoscompra;
    console.log(buy);
    const found1 = buy.map(g => {
        const found2 = g.map(h => {
            const product = h.pedidocompra.itens.map(i => {
                const findId = i.item.codigo;
                const findQtd = i.item.qtde;
                const findValue = Number(i.item.valor)*findQtd;
                if (id_product === findId) {
                    return findValue
                } else {
                    return 0;
                }
            })
            return product;
        })
        return found2;
    })

    const value = found1[0];

    // retornando soma total dos produtos
    const totalArray = await value.map(e => 
        e.reduce((acc, curr) => {
            return acc + curr;
        }))

    const totalValue = await totalArray.reduce((acc, curr) => {
        return acc + curr;
    })

    // retornando a quantidade de itens comprados
    const howMany = buy.map(g => {
        const found2 = g.map(h => {
            const product = h.pedidocompra.itens.map(i => {
                const findId = i.item.codigo;
                const findValue = i.item.qtde;
                if (id_product === findId) {
                    return findValue
                } else {
                    return 0;
                }
            })
            return product;
        })
        return found2;
    })

    const values = howMany[0];


    //retornando a quantidade total de itens comprados

    const totalQtde = await values.map(e => 
        e.reduce((acc, curr) => {
            return acc + curr;
        }))

    const totalValueQtde = await totalQtde.reduce((acc, curr) => {
        return acc + curr;
    })

    //media
    const media = totalValue/totalValueQtde;

    return totalValue;
}




export default Buy;

