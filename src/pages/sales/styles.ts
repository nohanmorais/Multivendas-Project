import styled from 'styled-components';
import { shade } from 'polished';


export const CardFilter = styled.div`

    
    height: 80px;
    background: #FFFF;
    opacity: 0.7;
    border: 1px solid;
    border-radius: 5px;
    margin-top: 15px;
    margin-left: 20px;
    margin-right: 20px;
    position: relative;

`;


export const TitleCard = styled.div`

    position: absolute;
    height: 20px;
    width: 100%;
    background: #c4c4c4;
    align-items: center;    
    align-content: center;
    padding: 0;
    border: 0.5px solid ;
    box-shadow: none;
    color: #000;
    text-align: center;

`;

export const BodyCard = styled.div`
    width: 100%;
    height: 75%;
    margin-top: 20px;
    padding-left: 10px;
    align-items: center;
    justify-items: center;
    display: flex;

    li   {
        color: #000;
        text-decoration: none;
        list-style: none;
        
    }

    u {
        text-decoration: none;
        padding-left: 50px;
        font-size: 30px;
    }


    input,button  {
        text-align: justify;
        height: 30px;
        font-size: 15px;
     

    }

    input + input {
        margin-left:300px;
        width: 300px;
    }

    button {
        background: #2CAA00;
        border-radius: 0px 5px 5px 0px;

        &:hover {
        background: ${shade(0.2, '#2CAA00')};
        cursor: pointer;
        }
    }
    

    
`;

export const SalesHeader = styled.div`
    
    height: 30px;
    background: #FFFF;
    opacity: 0.7;
    margin-top: 15px;
    margin-left: 20px;
    margin-right: 20px;
    position: relative;
    font-size: 20px;
    list-style: none;
    display: flex;
    font-weight: bold;

    li {
        width: 100%;
    }

    u {
        text-decoration: none;
        padding-left: 2%;

    }

    u + u {
        padding-left: 4%;
    }

    u + u + u {
        padding-left: 6%;
    }

    u + u + u + u {
        padding-left: 33%;
    }

    u + u + u + u + u {
        padding-left: 5%;
    }

    u + u + u + u + u + u {
        padding-left: 5%;
    }

`;

export const SalesTable = styled.div`

    height: 50px;
    background: #FFFF;
    opacity: 0.7;
    margin-top: 5px;
    margin-left: 20px;
    margin-right: 20px;
    position: relative;
    font-size: 15px;
    list-style: none;
    display: flex;  

    a {
        display: flex;
        margin-left: 5%;
        margin-right: 5%;
        text-decoration: none;
        max-width: 50px;
        min-width: 50px;
        align-items: center;
    }

    div {

        display: flex;
        max-width: 70px;
        min-width: 70px;
        margin-left: 0.5%;
        margin-right: 4%;
        align-items: center;


    }

    div + div {

        display: flex;
        max-width: 500px;
        min-width: 500px;
        margin-left: 3%;
        margin-right: 0%;
        align-items: center;
    }

    div + div + div {

        display: flex;
        max-width: 110px;
        min-width: 110px;
        margin-left: 5.5%;
        margin-right: 0.5%;
        align-items: center;            

    }

    div + div + div + div {

        display: flex;
        max-width: 110px;
        min-width: 110px;
        margin-left: 1%;
        margin-right: 1%;
        align-items: center;      
    }

    div + div + div + div + div {

        display: flex;
        max-width: 110px;
        min-width: 110px;
        margin-left: 1%;
        margin-right: 2%;
        align-items: center;      
}

    div + div + div + div + div + div {

    display: flex;
    max-width: 70px;
    min-width: 70px;
    margin-left: 0.5%;
    margin-right: 0;
    align-items: center;      
}




`;

