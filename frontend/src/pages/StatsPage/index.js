import React from 'react'
import Header from '../../components/Header'
import { Container } from 'react-bootstrap'
import bitUrlService from '../../services/bitUrlService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles'
import { parseISO, formatRelative } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

class StatsPage extends React.Component {
    constructor (props) {
        super(props) 

        this.state = {
            isLoading: false,
            shortURL: '',
            errorMessage: ''
        }
    }

    async componentDidMount() {
        const { code } = this.props.match.params
        try {
            const service = new bitUrlService()
            const shortURL = await service.getStats(code)
            this.setState({ isLoading: false, shortURL})
            const parsedDate = parseISO(shortURL.updatedAt)
            const currentDate = new Date()
            const relativeDate = formatRelative(parsedDate, currentDate, {
                locale: ptBR
            })
            shortURL.relativeDate = relativeDate

        } catch (error) {
            this.setState({isLoading: false, errorMessage: 'Ops, a URL não existe!'})
        }
    }

    render() {
        const { errorMessage, shortURL } = this.state
        return (
            <Container>
                <Header>
                    Estatísticas:
                </Header>
                {errorMessage ? (
                    <StatsContainer>
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclanation-triangle" />
                        <p className="m-3">{errorMessage}</p>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                ) : (
                    <StatsContainer>
                        <p>
                            <strong>https://bitUrl.des.br/{shortURL.code}</strong>
                        </p>
                        <p>
                            Redireciona para: <br/>
                            {shortURL.url}
                        </p>
                        <StatsRow>
                            <StatsBox>
                                <strong>{shortURL.hits}</strong>
                                <StatsBoxTitle>Visitas</StatsBoxTitle>
                            </StatsBox>
                            <StatsBox>
                                <strong>{shortURL.relativeDate}</strong>
                                <StatsBoxTitle>Última visita</StatsBoxTitle>
                            </StatsBox>
                        </StatsRow>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                )}
            </Container>
        )
    }

}

export default StatsPage