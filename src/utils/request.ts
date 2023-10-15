import type { FetchLike } from "wretch";
import { message } from "antd";
import wretch from "wretch";
import { retry } from "wretch/middlewares";
import { store, globalSlice } from "#src/store";

function requestInterceptor(next: FetchLike): FetchLike {
	store.dispatch(globalSlice.actions.openGlobalSpin());
	return next;
}

function responseInterceptor(next: FetchLike): FetchLike {
	return (url, opts) => next(url, { ...opts, headers: { Authorization: `Bearer ${window.localStorage.getItem("token")}`, ...opts.headers } })
		.then(async (response) => {
			if (!response.ok) {
				if (response.status === 401) {
					window.location.href = "/login";
				}

				const json = await response.json();
				message.error(json.message);
				return Promise.reject(response);
			}
			return response;
		})
		.finally(() => {
			store.dispatch(globalSlice.actions.closeGlobalSpin());
		});
}

// wretch.options({ mode: "cors" });
export const request = wretch(import.meta.env.VITE_API_BASE_URL, {})
	.middlewares([requestInterceptor, responseInterceptor, retry({
		until: () => true,
	})])
	.resolve((r) => r.json());
	import axios from 'axios';
	import jwtDecode from 'jwt-decode';
	import { useContext } from 'react';
	import AuthContext from '../../tests/AuthContext';

	const useAxios = () => {
		const { setLogin, setAuthTokens } = useContext(AuthContext);

		const axiosInstance = axios.create({});

		axiosInstance.interceptors.request.use(
			function (config) {
				let localStorageData = localStorage.getItem('admin');
				if (localStorage && typeof localStorageData === 'string') {
					localStorageData = JSON.parse(localStorageData);
					const accessToken = localStorageData?.accessToken;
					const decodeToken = jwtDecode(localStorageData?.accessToken);
					const expires = decodeToken.exp;
					if (Date.now() >= expires * 1000) {
						setLogin(false);
						localStorage.removeItem('admin');
						localStorage.removeItem('login');
						setAuthTokens(null);
					}
					config.headers = { authorization: `Bearer ${accessToken}` };
					return config;
				} else return config;
			},
			function (err) {
				return Promise.reject(err);
			},
		);

		return axiosInstance;
	};

	export default useAxios;
