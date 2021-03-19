import { apikey } from "../../shared/utils/endpoints";
import api from "../api";
import {ordertoproduct} from '../../models/products/index';


export async function Inventory (id_product: string): Promise<any> {

    const response = await api.get<ordertoproduct>(
        `produto/${id_product}/json/?apikey=${apikey}&estoque=S`);
    
    const products = response.data.retorno.produtos;
    
    
    const atual = products.map(e => {
        return e.produto.estoqueAtual;
    })

    return atual;
}