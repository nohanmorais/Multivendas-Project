import LOGOMULTI from '../assets/LOGOMULti.png';
import styled from 'styled-components';
import { tint } from 'polished';



export const TopMenuMV = styled.div`

    position: relative;
    padding: 1px;
    width: 100%;
    height: 70px;
    background: rgba(0, 0, 0, 0.80) url(${LOGOMULTI}) no-repeat 1%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); 


div {

    padding-left: 35%;

    a {
    position: relative;
    width: 118px;
    height: 79px;
    
    font-family: Palanquin;
    font-size: normal;
    color: #FFFF;
    opacity: 0.7;
    font-size: 25px;
    line-height: 65px;
    padding-left:10%;
    text-decoration: none;

        &:hover {
        color: ${tint(0.1, '#C70000')};
        font-size: bold;
        }
    }
}
`;