import { FormEvent, useState } from 'react'

import Modal from 'react-modal'

import { Container, RadioBox, TransactionTypeContainer } from './styles'
import incomeSvg from '../../assets/income.svg'
import outcomeSvg from '../../assets/outcome.svg'
import CloseSvg from '../../assets/close.svg'
import { useTransactions } from '../../hooks/useTransactions'

// Acessibilidade
Modal.setAppElement('#root')

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal ({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions()
    const [type, setType] = useState('deposit')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)

    async function handleCreateNewTransaction (event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        })

        setTitle('')
        setCategory('')
        setAmount(0)
        setType('deposit')
        onRequestClose()
    }

    return (
        <Modal
         isOpen={isOpen}
         onRequestClose={onRequestClose}
         overlayClassName="react-modal-overlay"
         className="react-modal-content"
        >

            <button
             type="button" 
             onClick={onRequestClose} 
             className="react-modal-close"
            >
                <img src={CloseSvg} alt="Fechar Modal"/>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>    

                <input
                 placeholder="Título" 
                 value={title} 
                 onChange={e => setTitle(e.target.value)}
                />

                <input
                 type="number" 
                 placeholder="Valor" 
                 value={amount} 
                 onChange={e => setAmount(Number(e.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                     type="button" 
                     onClick={() => setType('deposit')}
                     isActive={type === 'deposit'}
                     activeColor="green"
                    >
                        <img src={incomeSvg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                     type="button" 
                     onClick={() => setType('withdraw')}
                     isActive={type === 'withdraw'}
                     activeColor="red"
                    >
                        <img src={outcomeSvg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                 type="text" 
                 placeholder="Categoria"
                 value={category} 
                 onChange={e => setCategory(e.target.value)}
                />
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}