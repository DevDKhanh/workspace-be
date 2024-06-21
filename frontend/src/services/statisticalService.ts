import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_BASE + "/api/v1/Statistical";

const statisticalService = {
  statistical_synthetic: (tokenAxios?: any) => {
    return axiosClient.post(
      `${routeName}/statistical-synthetic`,
      {},
      {
        cancelToken: tokenAxios,
      }
    );
  },
  statistical_order: (tokenAxios?: any) => {
    return axiosClient.post(
      `${routeName}/statistical-order`,
      {},
      {
        cancelToken: tokenAxios,
      }
    );
  },
  statistical_warehouse: (tokenAxios?: any) => {
    return axiosClient.post(
      `${routeName}/statistical-warehouse`,
      {},
      {
        cancelToken: tokenAxios,
      }
    );
  },
  statistical_chart: (
    data: {
      type: number
    },
    tokenAxios?: any) => {
    return axiosClient.post(

      `${routeName}/statistical-chart`,
      data,
      {
        cancelToken: tokenAxios,
      }
    );
  },
};

export default statisticalService;
