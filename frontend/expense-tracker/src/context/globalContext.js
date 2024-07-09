import { createContext, useContext, useState } from "react";
import axios from 'axios';


const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    //income calculation
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            // Optionally, fetch the incomes again or update the incomes state
            getIncomes();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    const deleteIncome= async(id)=>{
        const response = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome= ()=>{
        let totalIncome=0;
        incomes.forEach((income)=>{
            totalIncome+=income.amount
        })

        return totalIncome;
    }

    //expense calculation
    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}add-expense`, expense);
            // Optionally, fetch the incomes again or update the incomes state
            getExpenses();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    };

    const deleteExpense= async(id)=>{
        const response = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses();
    }

    const totalExpense= ()=>{
        let totalIncome=0;
        expenses.forEach((income)=>{
            totalIncome+=income.amount
        })

        return totalIncome;
    }

    const totalBalance=()=>{
        return totalIncome()-totalExpense()
    }

    const transactionHistory=()=>{
        const history=[...incomes,...expenses]
        history.sort((a,b)=>{
            return new Date(b.createdAt)-new Date(a.createContext)
        })
        return history.slice(0,3)
    }

    console.log('total',totalIncome());
    return (
        <GlobalContext.Provider value={{ addIncome, incomes, getIncomes: getIncomes, deleteIncome,totalIncome, expenses,
            addExpense,getExpenses,deleteExpense,totalExpense,totalBalance,transactionHistory,
        error, setError }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
