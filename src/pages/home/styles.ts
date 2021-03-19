import styled from "styled-components";

export const Quadrate1=styled.div`

    display: flex;
    flex-direction: row;

`;

export const DateFiltered = styled.div`

    height: 5rem;
    width: 51rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;

    flex: 1;

    background: #515151;
    box-shadow: 6px 6px 6px 2px rgba(0, 0, 0, 0.27);
    backdrop-filter: blur(20px);
    border-radius: 10px;

    p {

        font-family: Oxygen;
        font-style: normal;
        font-weight: 600;
        font-size: 2rem;
        line-height: 5rem;
        padding-left: 1rem;
        color: #FCFCFC;
    }
`;

export const SmallQuadrate = styled.div`
    
    height: 10rem;
    width: 12rem;
    margin-bottom: 1rem;
    margin-left: 1rem;

    background: #515151;
    box-shadow: 6px 6px 6px 2px rgba(0, 0, 0, 0.27);
    backdrop-filter: blur(20px);
    border-radius: 10px;

strong {
    
    padding-left: 10px;
    line-height: 43px;

    font-family: Oxygen;
    font-style: normal;
    font-weight: 600;
    font-size: 1rem;

    color: #FCFCFC;
}

p {

    position: relative;

    text-align: center;
    line-height: 6rem;
    
    font-family: Oxygen;
    font-style: normal;
    font-weight: bold;
    font-size: 4rem;

    color: #DA3264;
}

`;

export const BigQuadrate = styled.div`

    height: 10rem;
    width: 25rem;
    margin-bottom: 1rem;
    margin-left: 1rem;

    background: #515151;
    box-shadow: 6px 6px 6px 2px rgba(0, 0, 0, 0.27);
    backdrop-filter: blur(20px);
    border-radius: 10px;
    
    strong {

        padding-left: 10px;
        line-height: 43px;

        font-family: Oxygen;
        font-style: normal;
        font-weight: 600;
        font-size: 1rem;

        color: #FCFCFC;
    }

    p {

        position: relative;

        text-align: center;
        line-height: 6rem;

        font-family: Oxygen;
        font-style: normal;
        font-weight: bold;
        font-size: 5rem;
    

        color: #4D9AB2;
    }

`;
