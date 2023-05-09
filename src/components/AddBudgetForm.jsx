import {
  CurrencyDollarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import { useFetcher } from 'react-router-dom';

function AddBudgetForm() {
  const fetcher = useFetcher();
  const isSubmiting = fetcher.state === 'submitting';

  const formRef = useRef();
  const focusRef = useRef();

  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    if (!isSubmiting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmiting]);

  const arrowHandler = () => {
    setShowArrow(!showArrow);
  };

  return (
    <div className="form-wrapper">
      <div className="flex-md">
        <h2 className="h3">Creaza un buget</h2>
        <button className="arrow-button" onClick={arrowHandler}>
          <ChevronDownIcon
            style={{ display: `${showArrow === true ? 'none' : 'block'}` }}
          />
          <ChevronRightIcon
            style={{ display: `${showArrow === true ? 'block' : 'none'}` }}
          />
        </button>
      </div>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        {!showArrow && (
          <div>
            <div className="grid-xs">
              <label htmlFor="newBudget">Numele bugetului</label>
              <input
                type="text"
                name="newBudget"
                id="newBudget"
                placeholder="ex. , Cumparaturi"
                ref={focusRef}
              />
            </div>
            <div className="grid-xs">
              <label htmlFor="newBudgetAmount">Suma</label>
              <input
                type="number"
                step="0.01"
                name="newBudgetAmount"
                id="newBudgetAmount"
                placeholder="ex. , 350 MDL"
                inputMode="decimal"
              />
            </div>
            <input type="hidden" name="_action" value="createBudget" />
            <button
              type="submit"
              className="btn btn--dark"
              disabled={isSubmiting}
            >
              {isSubmiting ? (
                <span>Se creaza bugetul...</span>
              ) : (
                <>
                  <span>Creaza bugetul</span>
                  <CurrencyDollarIcon width={20} />
                </>
              )}
            </button>
          </div>
        )}
      </fetcher.Form>
    </div>
  );
}

export default AddBudgetForm;
