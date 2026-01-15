import api from './api';

export interface Sku {
    id: string;
    sku: string;
    name: string;
    category: string;
    currentStock: number;
    safetyStock: number;
    unitCost: number;
    totalStock?: number; // From backend response enrichment
    latestPrediction?: {
        predictedStockoutDate: string | null;
        stockoutRiskScore: number;
    };
}

export interface SkuFilterParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    showStockoutRisks?: boolean;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
}

export interface SkuListResponse {
    items: Sku[];
    total: number;
    page: number;
    lastPage: number;
}

export const getSkus = async (params: SkuFilterParams): Promise<SkuListResponse> => {
    const response = await api.get('/skus', { params });
    return response.data;
};

export const getSku = async (id: string): Promise<Sku> => {
    const response = await api.get(`/skus/${id}`);
    return response.data;
};
