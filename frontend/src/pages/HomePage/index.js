import React from 'react'
import Header from '../../components/Header'
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap'
import { ContentContainer, Form } from './styles'
import bitUrlService from '../../services/bitUrlService'

class HomePage extends React.Component {
    constructor (props) {
        super(props) 
        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMessage: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const  { url } = this.state
        this.setState({ isLoading: true, errorMessage: '' })
        if(!url) {
            this.setState({ isLoading: false, errorMessage: 'Informe uma URL' })
        } else {
            try {
                const service = new bitUrlService()
                const result = await service.generate({ url })
                this.setState({ isLoading: false, code: result.code })
            } catch(error) {
                this.setState({ isLoading: false, errorMessage: 'Ops, deu algo errado!' })
            }
        }
    }

    copyToClipboard = () => {
        const element = this.inputURL
        element.select()
        document.execCommand('copy')
    }

    render() {
        const  { isLoading, errorMessage, code } = this.state
        return (
            <Container>
                <Header>
                    Seu encurtador de URL
                </Header>
                <ContentContainer>
                    <Form onSubmit={this.handleSubmit} >
                        <InputGroup>
                            <FormControl 
                                placeholder="Digite a URL" 
                                defaultValue="" 
                                onChange={e => this.setState({ url: e.target.value })}
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Encurtar</Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {isLoading ? (
                            <Spinner animation="border" />
                        ) : (
                            code && (
                                <>
                                    <InputGroup>
                                        <FormControl 
                                            autofocus={true}
                                            defaultValue={`https://bitUrl.biturl.des.br/${code}`}
                                            ref={ (input) => this.inputURL = input }
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={() => this.copyToClipboard()}>Copiar</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                            <p>Para acompanhar as estatísticas acesse https://bitUrl.biturl.des.br/{code}</p>
                                </>
                            )
                        )}
                        {errorMessage && <Alert variant="danger"> {errorMessage} </Alert>}
                    </Form>
                </ContentContainer>
            </Container>
        )
    }

}

export default HomePage