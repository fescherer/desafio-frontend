import './styles.css';
import { useQuery } from '@tanstack/react-query';
import { getIncome } from '../../services/income';
import { useState } from 'react';
import { IDailyEquityByPortfolioChartDaum } from '../../@types/income';

export default function Table() {
  const [searchFilter, setSearchFilter] = useState('');
  const [isAscValueEnabled, setIsAscValueEnabled] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ['income-data'],
    queryFn: getIncome,
  });

  function handleSearchFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchFilter(e.target.value);
  }

  function filterBySearch(item: IDailyEquityByPortfolioChartDaum) {
    const safeFilter = searchFilter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rg = new RegExp(`^(?=.*\\b${safeFilter}).*$`, 'gmi');

    return item.portfolioProductId.toString().match(rg) || item.productName.toString().match(rg);
  }

  function handleIsAscValueEnabled() {
    setIsAscValueEnabled((prev) => !prev);
  }

  function sortValue(itemA: IDailyEquityByPortfolioChartDaum, itemB: IDailyEquityByPortfolioChartDaum) {
    if (isAscValueEnabled) return itemA.value > itemB.value ? 1 : itemA.value < itemB.value ? -1 : 0;
    else return itemA.value > itemB.value ? -1 : itemA.value < itemB.value ? 1 : 0;
  }

  if (data)
    return (
      <div className="container">
        <input
          value={searchFilter}
          onChange={handleSearchFilter}
          type="search"
          className="input"
          id="serch"
          placeholder="Pesquisar por id ou nome..."
        />

        <table id="income">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome do Produto</th>
              <th>Cota Corrigida</th>
              <th className="btn-value-header">
                Valor{' '}
                <button type="button" onClick={handleIsAscValueEnabled}>
                  {isAscValueEnabled ? 'ASC' : 'DEC'}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.dailyEquityByPortfolioChartData
              .filter((item) => filterBySearch(item))
              .sort(sortValue)
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.portfolioProductId}</td>
                  <td>{item.productName}</td>
                  <td>{item.correctedQuota}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  if (isLoading)
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  return <></>;
}
