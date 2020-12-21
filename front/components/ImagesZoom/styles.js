import {CloseOutlined} from '@ant-design/icons'
import styled, { createGlobalStyle } from 'styled-components';


// `` 함수로 선언을 `` 로 가능 
export const Overlay = styled.div`
    position: fixed;
    z-index: 5000;
    top:0;
    left:0;
    right:0;
    bottom:0;
`;

export const Header = styled.header`
    header:44px;
    background: white;
    position:relative;
    padding: 0;
    text-align: center;

    & h1 {
        margin: 0;
        font-size: 17px;
        color: #333;
        line-height: 44px;
    }
`;

export const CloseBtn = styled(CloseOutlined)`
    position: absolute;
    right:0;
    top: 0;
    padding: 15px;
    line-height:14px;
    cursor: pointer;
`;

export const SlickWrapper = styled.div`
    height: calc(100% - 44px);
    background: #090909;
`;

export const ImgWrapper = styled.div`
    padding: 32px;
    text-align: center;

    & img {
        margin: 0 auto;
        max-height: 750px;
    }
`;

export const Indicator = styled.div`
    text-align: center;

    & > div {
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background: $313131;
        display: inline-block;
        text-align: center;
        color: white;
        font-size: 15px;
    }
`;

//이미 정해져 있는 클래스들의 css를 바꾸고 싶을 때 
//Global은 아무곳이나 태그를 넣어 주면 됨 

//ant-card-cover  -- fixed가 있는데도 ant-card-cover에 transform이 있어서 fixed가 안먹는 버그가 있음...
export const Global = createGlobalStyle`
    .slick-slide{
        display: inline-block;
    }
    .ant-card-cover {
        transform: none !important;
    }
`;