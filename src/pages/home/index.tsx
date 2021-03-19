import React from 'react';
import { TopMenuMV } from '../../shared/styles/menuBar';
import { DateFiltered, BigQuadrate, Quadrate1, SmallQuadrate } from './styles';

const Home: React.FC = () => {






    return (
    <>
    <TopMenuMV >
        <div>
            <a href="/">Home</a>
            <a href="/sales">Vendas</a>
            <a href="/">Compras</a>
        </div>
    </ TopMenuMV>
    <DateFiltered>
        <p>Resultados em: 20/01/2020 a 22/01/2020</p>
    </DateFiltered>
    <Quadrate1>
        <SmallQuadrate>
            <strong>Total de Vendas Bruta:</strong>
            <p>30.000</p>
        </SmallQuadrate>
        <SmallQuadrate>
            <strong>Total de Vendas Líquida:</strong>
            <p>30.000</p>
        </SmallQuadrate>
        <BigQuadrate>
            <strong>Melhor Vendedor:</strong>
            <p>Instagram</p>
        </BigQuadrate>
    </Quadrate1>
    <Quadrate1>
        <BigQuadrate>
            <strong>Lucro Operacional:</strong>
            <p>20.000</p>
        </BigQuadrate>
        <SmallQuadrate>
            <strong>Total de Custo:</strong>
            <p>30.000</p>
        </SmallQuadrate>
        <SmallQuadrate>
            <strong>Quantidade de vendas:</strong>
            <p>10</p>
        </SmallQuadrate>
    </Quadrate1>



    </>
    )
};

export default Home;

