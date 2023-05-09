import { Link, useLoaderData } from 'react-router-dom';
import {
  createBudget,
  fetchData,
  waitFn,
  createExpense,
  deleteItem,
} from '../helpers';
import { toast } from 'react-toastify';

import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenceForm from '../components/AddExpenceForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

export function dashBoardLoader() {
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');
  const expenses = fetchData('expenses');
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
  await waitFn();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === 'newUser') {
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName));
      return toast.success(`Bine ai venit ${values.userName}`);
    } catch (error) {
      throw new Error('A aparut o problema la crearea contului!');
    }
  }
  if (_action === 'createBudget') {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success('Buget creat!');
    } catch (error) {
      throw new Error('A aparut o problema la crearea bugetului!');
    }
  }
  if (_action === 'createExpense') {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Ai adaugat ${values.newExpense} la cheltuieli!`);
    } catch (error) {
      throw new Error('A aparut o problema la adaugarea unei chetuieli!');
    }
  }
  if (_action === 'deleteExpense') {
    try {
      deleteItem({
        key: 'expenses',
        id: values.expenseId,
      });
      return toast.success('Cumparatura a fost stearsa!');
    } catch (error) {
      throw new Error('A aparut o problema la stergerea unei cumparaturi!');
    }
  }
}

function DashBoard() {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Bine ai revenit, <span className="accent">{userName}</span>!
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenceForm budgets={budgets} />
                </div>
                <h2>Bugeturi existente</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Cheltuieli recente</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 5)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        Vezi toate chetuielile
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Creaza-ti bugetul si urmareste toate cheltuielele.</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}

export default DashBoard;
