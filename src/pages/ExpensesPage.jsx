import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../components/Table';
import { deleteItem, fetchData } from '../helpers';

export async function expensesLoader() {
  const expenses = await fetchData('expenses');
  return { expenses };
}

export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

function ExpensesPage() {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Cheltuieli recente <small>(Total {expenses.length})</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>Nu ai cheltui inca nimic</p>
      )}
    </div>
  );
}

export default ExpensesPage;
