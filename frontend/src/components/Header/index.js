import React from 'react'
import { Logo, HeaderContainer } from './styles.js'
import LogoImg from '../../assets/logo.png'

function Header(props) {
    return  (
        <>
            <HeaderContainer>
                <Logo src={LogoImg} alt='bitUrl - Encurtador de URL' />
                <h1>BitURL</h1>
                <p>{props.children}</p>
            </HeaderContainer>
        </>
    )
} 

export default Header