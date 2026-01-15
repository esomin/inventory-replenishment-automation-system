export class SkuFilterDto {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    showStockoutRisks?: boolean; // If true, filter only those with stockout risk
    sortBy?: 'risk' | 'name' | 'sales' | 'stockoutDate';
    sortOrder?: 'ASC' | 'DESC';
}
