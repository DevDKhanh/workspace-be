import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { Fragment, memo, useMemo } from "react";
import useQueryParams, { useQueryNextJS } from "~/common/hooks/useQueryParams";

import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import Popup from "../Popup";
import { PropsSelectFiatCurrency } from "./interfaces";
import PullToRefreshData from "../PullToRefreshData";
import { QUERY_KEY } from "~/constants/enum";
import Search from "../Search";
import WrapperLoadMore from "../WrapperLoadMore";
import clsx from "clsx";
import commonService from "~/services/commonService";
import { convertCoin } from "~/common/func/convertCoin";
import { httpRequest } from "~/services";
import i18n from "~/locale/i18n";
import styles from "./SelectFiatCurrency.module.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const Limit = 40;

function SelectFiatCurrency({ title, form, setForm, name, placeholder }: PropsSelectFiatCurrency) {
	const { page, keyword } = useQueryParams();
	const router = useRouter();
	const { setQuery } = useQueryNextJS();
	const { [name]: chooseBank } = router.query;

	const currencies = useInfiniteQuery({
		queryKey: [QUERY_KEY.currencies, keyword],
		queryFn: ({ pageParam }) =>
			httpRequest({
				isList: true,
				http: commonService.currencies({
					Limit: Limit,
					Page: pageParam,
					Keyword: keyword || null,
				}),
			}).then((res) => {
				return {
					items: res?.items || [],
					total: res?.total || 0,
				};
			}),
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {

			if (!lastPage || !pages) {
				return undefined;
			}
			if (pages.length < Math.ceil(lastPage.total / Limit)) {
				return pages.length + 1;
			}
			return undefined;
		},
	});

	const itemActive: any = useMemo(() => {
		let dataItem = null;
		currencies.data?.pages?.forEach((group) => {
			group?.items?.forEach((v: any) => {
				if (v.currency == form?.[name]) {
					dataItem = v;
				}
			})
		})
		return dataItem
	},
		[currencies.data?.pages, form, name])

	return (<Fragment>
		<div className={styles.group}>
			<label className={styles.label}>{title}</label>
			<div className={styles.groupBox} onClick={() => {
				setQuery({ [name]: "true" })
			}}>
				<input className={styles.input} placeholder={placeholder} readOnly value={itemActive?.currency ?
					` ${itemActive?.currency} - ${convertCoin(Number(itemActive?.comparedUsd))}` : ""} />
				<div className={styles.select}>
					{!chooseBank ? <FaAngleRight /> : <FaAngleDown />}
				</div>
			</div>
		</div>

		<Popup open={chooseBank == "true"} classMain={clsx(styles.classMain, { [styles.hidden]: chooseBank != 'true' })} onClose={() => { setQuery({ [name]: null }) }}>
			<div className={styles.container}>
				<div className={clsx(styles.header)}>
					<p>{title || ""}</p>
					<i onClick={() => { setQuery({ [name]: null, keyword: null }) }}>
						<IoCloseOutline />
					</i>
				</div>
				<div className={styles.search}>
					<Search placeholder={i18n.t("common.Nhập tên quốc gia, loại tiền tệ")} />
				</div>
				<PullToRefreshData onRefresh={() => { }}>
					<WrapperLoadMore
						fetchNextPage={currencies.fetchNextPage}
						isFetchingNextPage={currencies.isFetchingNextPage}
						hasNextPage={currencies.hasNextPage}
						className={styles.box}
						activeWindow
						textLoad={i18n.t("common.Đang tải thêm...")}
					>
						{currencies.data?.pages.map((group, i) => (

							<Fragment key={i}>
								{group?.items.map((item: any) => (
									<div className={clsx(styles.group_box, { [styles.active]: itemActive?.currency == item.currency })}
										key={item.currency} onClick={() => {
											setQuery({ [name]: null, keyword: null });
											setForm((prev: any) => ({ ...prev, [name]: item.currency, fee: item.fee, comparedUsd: item.comparedUsd }))
										}}>
										<p className={styles.textItem}>{item.currency} - {convertCoin(Number(item.comparedUsd))}</p>
										{itemActive?.currency == item.currency ? <i><FaCheck /></i> : null}
									</div>
								))}
							</Fragment>
						))}
					</WrapperLoadMore>
				</PullToRefreshData>
			</div>
		</Popup></Fragment>);
}

export default memo(SelectFiatCurrency);
