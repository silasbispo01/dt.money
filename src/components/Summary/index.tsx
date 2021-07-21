import { Container } from "./styles";
import incomeSvg from '../../assets/income.svg'
import outcomeSvg from '../../assets/outcome.svg'
import totalSvg from '../../assets/total.svg'
import { useTransactions } from "../../hooks/useTransactions";


export function Summary () {
    const {transactions} = useTransactions()
    
    const summary = transactions.reduce((ac, transaction) => {
        if(transaction.type === 'deposit') {
            ac.deposits += transaction.amount;
            ac.total += transaction.amount;
        } else {
            ac.withdraw += transaction.amount;
            ac.total -= transaction.amount;
        }

        return ac;
        
    },{
        deposits: 0,
        withdraw: 0,
        total: 0,
    })

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeSvg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',            
                    }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeSvg} alt="Saídas" />
                </header>
                <strong>
                    -
                {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',            
                    }).format(summary.withdraw)}
                </strong>
            </div>
            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={totalSvg} alt="Total" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
} 