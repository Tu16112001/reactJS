import type { FormInitialValues } from "#src/pages/login";
import { request } from "#src/utils";

export interface FetchResponseType {
	code: number;
	message: string;
	type: string;
}

export interface LoginResponseType { token: string }
export function fetchLogin(data: FormInitialValues) {
	return (request.url("/login").post(data)) as Promise<Record<"result", LoginResponseType>>;
}

export function fetchLogout() {
	return (request.url("/logout").post()) as Promise<FetchResponseType>;
}

export interface UserinfoType {
	userId: string;
	username: string;
	realName: string;
	avatar: string;
	desc: string;
	password: string;
	permissions?: {
		label: string;
		value: string;
	}[];
}

export function fetchUserInfo() {
	return (request.url("/userinfo").get()) as Promise<Record<"result", UserinfoType>>;
}

//Category
export const API_CATEGORY = 'https://localhost:7200/api/category';


//Product
export const API_PRODUCT = 'https://fakestoreapi.com/products';
export const deteleProductImage = (filename) => {
  return API_PRODUCT + '/images/' + filename;
};
export const getProductImageUrl = (filename) => {
  return API_PRODUCT + '/images/' + filename;
};

//Login
export const API_LOGIN = 'https://fakestoreapi.com/users';

//Order
export const API_ORDER = '';

//Players
export const API_USER = '';
export const getUserImageUrl = (filename) => {
  return API_USER + '/images/' + filename;
};
export const deteleUserImage = (filename) => {
  return API_USER + '/images/' + filename;
};

export const API_PLAYER = '';
export const getPlayerImageUrl = (filename) => {
  return API_PLAYER + '/images/' + filename;
};
export const detelePlayerImage = (filename) => {
  return API_PLAYER + '/images/' + filename;
};
