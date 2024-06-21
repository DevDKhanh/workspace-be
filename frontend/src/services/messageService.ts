import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_CHAT;

const messageService = {
  listRoom: (
    data: {
      limit: number;
      page: number;
      keyword?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/MessageControler/list-room`, data, {
      cancelToken: tokenAxios,
    });
  },
  listMessage: (
    data: {
      limit: number;
      page: number;
      roomUuid: string;
      lastId?: number;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(
      `${routeName}/MessageControler/list-message`,
      data,
      {
        cancelToken: tokenAxios,
      }
    );
  },
};

export default messageService;
