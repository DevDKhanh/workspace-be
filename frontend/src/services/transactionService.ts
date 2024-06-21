import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_BASE + "/api/v1/Transaction";

const transactionService = {
    deposit: (
        data: {
            type: number
            amount: number
            walletId: number
            currency: string
            paymentVouchers: string
        },
        tokenAxios?: any
    ) => {
        return axiosClient.post(`${routeName}/deposit`, data, {
            cancelToken: tokenAxios,
        });
    },
    depositHistories: (
        data: {
            limit?: number
            page?: number
        },
        tokenAxios?: any
    ) => {
        return axiosClient.get(`${routeName}/deposit-histories`, {
            params: data,
            cancelToken: tokenAxios,
        });
    },
    withdraw: (
        data: {
            type?: number
            cryptoNetwork?: string
            walletAddress?: string
            bankName?: string
            bankAccount?: string
            bankOwner?: string
            currency?: string
            amount?: number
            fundPassword?: string
        },
        tokenAxios?: any
    ) => {
        return axiosClient.post(`${routeName}/withdraw`, data, {
            cancelToken: tokenAxios,
        });
    },
    withdrawHistories: (
        data: {
            limit?: number
            page?: number
        },
        tokenAxios?: any
    ) => {
        return axiosClient.get(`${routeName}/withdraw-histories`, {
            params: data,
            cancelToken: tokenAxios,
        });
    },
    transactionHistories: (
        data: {
            limit?: number
            page?: number,
            type?: number | null
        },
        tokenAxios?: any
    ) => {
        return axiosClient.get(`${routeName}/transaction-histories`, {
            params: data,
            cancelToken: tokenAxios,
        });
    },
    rollUp: (
        data: {},
        tokenAxios?: any
    ) => {
        return axiosClient.post(`${routeName}/attendance`, data, {
            cancelToken: tokenAxios,
        });
    },

};

export default transactionService;
