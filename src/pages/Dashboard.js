import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { Modal } from "antd";
import AddExpenseModal from "../Modals/addExpense";
import AddIncomeModal from "../Modals/addIncome";

function Dashboard() {
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
  const onFinish=(values,type)=>{
    console.log("On Finish",values,type)
  }
  return (
    <div>
      <Header />
      <Cards
        showExpenseModal={showExpenseModal}
        showIncomeModal={showIncomeModal}
        handleExpenseCancel={handleExpenseCancel}
        handleIncomeCancel={handleIncomeCancel}
      />
      <Modal
        style={{ fontWeight: 600 }}
        title="Add Income"
        open={isIncomeModalVisible}
        onCancel={handleIncomeCancel}
        footer={null}
      >
        Income
      </Modal>
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
    </div>
  );
}

export default Dashboard;
