import React from 'react'
import Header from '../../components/Header'
import {Container} from 'react-bootstrap'
import {StatsContainer} from './styles'

import bitUrlService from '../../services/bitUrlService'

class RedirectPage extends React.Component {
    constructor (props) {
        super(props) 
        this.state = {
            isLoading: false,
            url: '',
            errorMessage: ''
        }
    }

    async componentDidMount() {
        const { code } = this.props.match.params
        try {
            const service = new bitUrlService()
            const { url } = await service.getLink(code)
            window.location = url
        } catch (error) {
            this.setState({isLoading: false, errorMessage: 'Ops! A URL não existe!'})
        }
    }

    render() {
        const {errorMessage} = this.state
        return (
            <Container>
                {errorMessage ? (
                    <>
                        <Header>
                            Seu novo encurtador de URL
                        </Header>
                        <StatsContainer className="text-center">
                            <p>{errorMessage}</p>
                            <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                        </StatsContainer>
                    </>
                ) : (
                    <p>Redirecionando...</p>
                )}
            </Container>
        )
    }

}

export default RedirectPage