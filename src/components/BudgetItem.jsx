import { BanknotesIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Form, Link } from 'react-router-dom';
import {
  calculateSpentByBudget,
  formatCurrency,
  formatProcentage,
} from '../helpers';

function BudgetItem({ budget, showDelete = false }) {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    <div
      className="budget"
      style={{
        '--accent': color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)}</p>
      </div>
      <progress max={amount} value={spent}>
        {formatProcentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small> S-au cheltuit {formatCurrency(spent)}</small>
        <small>Au mai ramas {formatCurrency(amount - spent)}</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!window.confirm('Esti sigur ca vreai sa stergi acest buget?')) {
                event.preventDefault();
              }
            }}
          >
            <button className="btn" type="submit">
              <span>Sterge bugetul</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`budget/${id}`} className="btn">
            <span>Vezi Detalii</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default BudgetItem;
