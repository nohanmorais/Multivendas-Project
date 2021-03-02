import { ordertobuy } from "../../models/buy";
import { apikey } from "../../shared/utils/endpoints";
import api from "../api";


export async function getCoustValue(id_product: string): Promise<number> {

    const response = await api.get<ordertobuy>(
        `pedidoscompra/json/?apikey=${apikey}&filters=situacao[1]`);

    // retornando os codigos dos produtos
    const buy =  response.data.retorno.pedidoscompra;

    const coust =  buy.map(e => 
        e.map( f => f.pedidocompra.itens.map(
            g => {
                if(g.item.codigo === id_product) {
                    return Number(g.item.valor);
                } else {
                    return 0;
                }     
            }
        ))
    )

    const coustArray = coust[0];

    const totalArray =  coustArray.map(e => e.reduce((acc, curr) => 
            {return acc + curr}
    ));

    const totalValue =  totalArray.reduce((acc, curr) => {
        return acc + curr;
    })

    return totalValue;
    
    
}










