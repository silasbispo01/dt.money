import { Container, Content } from './styles'
import logoSvg from '../../assets/logo.svg'

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {
    return (
        <Container>
            <Content>
                <img src={logoSvg} alt="dtmoney" />
                <button
                    type='button'
                    onClick={onOpenNewTransactionModal}
                >
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}