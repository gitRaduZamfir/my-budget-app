import { useRef, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import {
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { useEffect } from 'react';

function AddExpenceForm({ budgets }) {
  const fetcher = useFetcher();
  const isSubmiting = fetcher.state === 'submitting';
  const formRef = useRef();
  const focusRef = useRef();
  const [budgetName, setBudgetName] = useState(budgets[0].name);

  const [showArrow, setShowArrow] = useState(false);

  const arrowHandler = () => {
    setShowArrow(!showArrow);
  };

  const changeBudgetHandler = (e) => {
    // eslint-disable-next-line
    budgets.map((budg) => {
      if (e.target.value === budg.id) {
        setBudgetName(budg.name);
      }
    });
  };

  useEffect(() => {
    if (!isSubmiting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmiting]);

  return (
    <div className="form-wrapper">
      <div className="flex-md">
        <h2 className="h3">
          Adauga la <span className="accent">{`${budgetName} `}</span>o
          cumpratura.
        </h2>
        <button className="arrow-button" onClick={arrowHandler}>
          <ChevronDownIcon
            style={{ display: `${showArrow === true ? 'none' : 'block'}` }}
          />
          <ChevronRightIcon
            style={{ display: `${showArrow === true ? 'block' : 'none'}` }}
          />
        </button>
      </div>
      <fetcher.Form method="post" ref={formRef} className="grid-sm">
        {!showArrow && (
          <div className="flex-md">
            <div className="expense-inputs">
              <div className="grid-xs">
                <label htmlFor="newExpense">Nume produs</label>
                <input
                  type="text"
                  name="newExpense"
                  id="newExpence"
                  placeholder="e.g, Cofee"
                  ref={focusRef}
                  required
                />
              </div>
              <div className="grid-xs">
                <label htmlFor="newExpenseAmount">Pretul</label>
                <input
                  type="number"
                  step="0.01"
                  name="newExpenseAmount"
                  id="newExpenceAmount"
                  placeholder="e.g, 2.50"
                  inputMode="decimal"
                  required
                />
              </div>

              <div className="grid-xs" hidden={budgets.length === 1}>
                <label htmlFor="newExpenseBudget">Selecteaza bugetul</label>
                <select
                  name="newExpenseBudget"
                  id="newExpenseBudget"
                  required
                  onChange={changeBudgetHandler}
                >
                  {budgets
                    .sort((a, b) => a.createdAt - b.createdAt)
                    .map((budg) => (
                      <option key={budg.id} value={budg.id}>
                        {budg.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <input type="hidden" name="_action" value="createExpense" />
            <button
              type="submit"
              className="btn btn--dark"
              disabled={isSubmiting}
            >
              {isSubmiting ? (
                <span>Produsul se adauga...</span>
              ) : (
                <>
                  <span>Adauga produsul cumparat</span>
                  <PlusCircleIcon width={20} />
                </>
              )}
            </button>
          </div>
        )}
      </fetcher.Form>
    </div>
  );
}

export default AddExpenceForm;
