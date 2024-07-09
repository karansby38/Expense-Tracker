import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpenseForm from './ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem'; // Assuming you have an IncomeItem component for displaying expenses

function Expenses() {
  const { addExpense, expenses, getExpenses, deleteExpense, totalExpense, error } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className='total-expense'>Total Expenses: <span>Rs {totalExpense()}</span></h2>
        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="expenses">
            {expenses && expenses.length > 0 ? (
              expenses.map((expense) => {
                const { _id, title, amount, date, category, description, type } = expense;
                return (
                  <IncomeItem
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpense}
                  />
                );
              })
            ) : (
              <p>No expenses found.</p>
            )}
          </div>
        </div>
        {error && <p className="error">{error}</p>}
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
   display: flex;
   overflow: auto;
   .total-expense {
       display: flex;
       justify-content: center;
       align-items: center;
       background: #FCF6F9;
       border: 2px solid #FFFFFF;
       box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
       border-radius: 20px;
       padding: 1rem;
       margin: 1rem 0;
       font-size: 2rem;
       gap: .5rem;
       span {
           font-size: 2.5rem;
           font-weight: 800;
           color: var(--color-green);
       }
   }
   .expense-content {
       display: flex;
       gap: 2rem;
       .expenses {
           flex: 1;
       }
   }
`;

export default Expenses;
