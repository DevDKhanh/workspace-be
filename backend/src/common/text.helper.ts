import { HttpStatus } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { promisify } = require('util');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export function radomText(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function radomNumber(length: number): string {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function createPagination<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number,
) {
  return {
    total: total,
    records: data,
    currentPage: page,
    pageSize: pageSize,
  };
}

export function resultData({
  statusCode = HttpStatus.OK,
  message = '',
  data = null,
}: {
  statusCode?: number;
  message?: string;
  data?: any;
}) {
  return {
    statusCode,
    message,
    data,
  };
}

export const deleteFile = async (file: string) => {
  try {
    const unlickSync = promisify(fs.unlink);
    await unlickSync(`./upload${file}`);
  } catch (err) {
    console.log(err);
  }
};

export function isValidString(string: string): boolean {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(string);
}
