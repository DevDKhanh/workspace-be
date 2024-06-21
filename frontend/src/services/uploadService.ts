import axiosClient from ".";

const uploadServices = {
  // upload(files: any) {
  //   const dataFile = new FormData();
  //   dataFile.append("file", files);
  //   return axiosClient.post(
  //     `${process.env.NEXT_PUBLIC_API_BASE_3}/api/${routeName}`,
  //     dataFile,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Accept: "text/plain",
  //       },
  //     }
  //   );
  // },
  uploadOrigin(files: any[]) {
    const dataFile = new FormData();
    files.forEach((file) => {
      return dataFile.append("files", file);
    });
    return axiosClient.post(
      `${process.env.NEXT_PUBLIC_API_IMAGE}/api/v1/Uploads`,
      dataFile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "text/plain",
        },
      }
    );
  },
};

export default uploadServices;
