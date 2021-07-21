import { useContext } from "react";
import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";


export function TransactionTable () {
    const {transactions} = useTransactions()

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id} className="title">
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {/* Formatação de moeda */}
                                {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                
                                }).format(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {/* Formatação de data */}
                                {new Intl.DateTimeFormat('pt-BR', {
                                    dateStyle: 'medium'
                                
                                }).format(new Date(transaction.createdAt))}
                                
                            </td>
                        </tr>
                        
                        ))}
                </tbody>
            </table>
        </Container>
    )
}