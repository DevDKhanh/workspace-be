export interface PropsFilterCustom {
  listFilter: { id: number | string; name: string }[] | any;
  name: string;
  query: string;
  useInfinite?: boolean;
  disableOptionAll?: boolean;
  isFetchingNextPage?: any;
  hasNextPage?: any;
  fetchNextPage?: any;
  dep?: any;
  keyName?: string;
}
