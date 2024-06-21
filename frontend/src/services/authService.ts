import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_BASE + "/api/v1/auth";

const authService = {
  login: (
    data: {
      username?: string;
      password: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/login`, data, {
      cancelToken: tokenAxios,
    });
  },
};

export default authService;
