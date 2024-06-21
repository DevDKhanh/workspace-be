import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_BASE + "/api/v1/Account";

const accountService = {
  login: (
    data: {
      phoneNumber?: string;
      email?: string;
      password: string;
      ip: string;
      phoneNumberHeader?: any;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/login`, data, {
      cancelToken: tokenAxios,
    });
  },
  signUpStep1: (
    data: {
      phoneNumber?: string;
      email?: string;
      nationalCode?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/signup/stage1`, data, {
      cancelToken: tokenAxios,
    });
  },
  signUpStep2: (
    data: {
      shopName?: string;
      idCard?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/signup/stage2`, data, {
      cancelToken: tokenAxios,
    });
  },
  signUpStep3: (
    data: {
      email: string;
      phoneNumber: string;
      password: string;
      ip: string;
      shopLogo: string;
      idCard: string;
      shopName: string;
      ownerName: string;
      nationalCode: string;
      idCardBefore: string;
      idCardAfter: string;
      idCardNextFace: string;
      referralCode: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/signup/stage3`, data, {
      cancelToken: tokenAxios,
    });
  },
  info: (tokenAxios?: any) => {
    return axiosClient.get(`${routeName}/info`, {
      cancelToken: tokenAxios,
    });
  },
  changeInfo: (
    data: {
      shopName?: string;
      phoneNumber: string;
      introduce?: string;
      welcome?: string;
      idCard?: string;
      shopLogo?: string;
      shopCover1?: string;
      shopCover2?: string;
      shopCover3?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(`${routeName}/info`, data, {
      cancelToken: tokenAxios,
    });
  },
  changePass: (
    data: {
      password: string;
      newPassword: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(`${routeName}/password`, data, {
      cancelToken: tokenAxios,
    });
  },
  changeFundPass: (
    data: {
      password: string;
      newPassword: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(`${routeName}/fund-password`, data, {
      cancelToken: tokenAxios,
    });
  },
};

export default accountService;
