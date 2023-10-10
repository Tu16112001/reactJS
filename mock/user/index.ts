import Mock from "mockjs";
import { resultSuccess } from "../_util";

const { Random } = Mock;

const token = Random.string("upper", 32, 32);

const adminInfo = {
	userId: "1",
	username: "admin",
	realName: "Admin",
	avatar: "https://www.facebook.com/photo/?fbid=701168711568953&set=pob.100050274910149",
	desc: "manager",
	password: "admin",
	permissions: [
		{
			label: "Bảng điều khiển",
			value: "dashboard",
		},
	],
};

export default [
	{
		url: "/api/login",
		timeout: 1000,
		method: "post",
		// statusCode: 401,
		// response: () => ({ code: 401, message: "Unauthorized" }),
		// statusCode: 400,
		// response: () => ({ code: 404, message: "Not found" }),
		response: () => resultSuccess({ token }),
	},
	{
		url: "/api/logout",
		timeout: 1000,
		method: "post",
		response: () => resultSuccess({}),
	},
	{
		url: "/api/userinfo",
		timeout: 1000,
		method: "get",
		response: () => resultSuccess(adminInfo),
	},
];
