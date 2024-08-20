export interface IApiResponse {
  snapshotByPortfolio: ISnapshotByPortfolio;
  dailyEquityByPortfolioChartData: IDailyEquityByPortfolioChartDaum[];
  snapshotByProduct: ISnapshotByProduct[];
}

export interface ISnapshotByPortfolio {
  equity: number;
  valueApplied: number;
  equityProfit: number;
  percentageProfit: number;
  indexerValue: number;
  percentageOverIndexer: number;
}

export interface IDailyEquityByPortfolioChartDaum {
  correctedQuota: number;
  dailyReferenceDate: number;
  movementTypeId: number;
  portfolioProductId: number;
  productName: string;
  value: number;
}

export interface ISnapshotByProduct {
  due: Due;
  fixedIncome: IFixedIncome;
  hasBalance: number;
  position: IPosition;
  productHasQuotation: number;
}

export interface Due {
  date: string;
  daysUntilExpiration: number;
}

export interface IFixedIncome {
  bondType: string;
  name: string;
  portfolioProductId: number;
}

export interface IPosition {
  equity: number;
  indexerLabel: string;
  indexerValue: number;
  percentageOverIndexer: number;
  portfolioPercentage: number;
  profitability: number;
  valueApplied: number;
}
