import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddExpenseModal from "../Modals/addExpense";
import AddIncomeModal from "../Modals/addIncome";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TransactionsTable";
import ChartComponent from "../components/Charts";
import NoTransactions from "../components/NoTransactions/NoTransactions";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState([false]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };
  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID:", docRef.id);
      toast.success("Transaction Added");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document:", e);
      toast.error("Couldn't add transaction");
    }
  }
  useEffect(() => {
    fetchTransactions();
  }, [user]);
  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
        console.log("transactionsArray", transactionsArray);
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }
  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function reset() {
    console.log("resetting");
  }
  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });
    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };
  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading....</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            reset={reset}
          />
          {transactions.length !== 0 ? (
            <ChartComponent sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
}
export default Dashboard;
