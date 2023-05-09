import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddExpenceForm from '../components/AddExpenceForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers';

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    // 'params.id - 'id' asta ii de la path: 'budgets/:id' principalul sa coincida, nu condeaza cum numim
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: 'expenses',
    key: 'budgetId',
    // 'params.id - 'id' asta ii de la path: 'budgets/:id' principalul sa coincida, nu condeaza cum numim
    value: params.id,
  });

  if (!budget) {
    throw new Error('Bugetul pe care incerci sa-l deschizi nu exista!');
  }

  return { budget, expenses };
}

export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

function BudgetPage() {
  const { budget, expenses } = useLoaderData();
  return (
    <div
      className="grid-lg"
      style={{
        '--accent': budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span>
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenceForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
}

export default BudgetPage;
