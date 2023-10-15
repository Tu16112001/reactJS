import { UserOutlined ,SubnodeOutlined,SisternodeOutlined} from "@ant-design/icons";
import {Children, createElement } from "react";
import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/saff",
		id: "saff",
		Component: ContainerLayout,

		meta: {
			sort: 100,
			title: "User",
			icon: createElement(UserOutlined),
		},
		children: [
			{
				path: "/saff/menu1",
				id: "route-nest_saff1",
				lazy: async () => {
					const mod = await import("#src/layout");
					return {
						...mod,
						Component: mod.ParentLayout,
					};
				},
				meta: {
					title: "menu1",
					icon: createElement(SisternodeOutlined),
				},
				children: [
					{
						path: "/saff/menu1/saff1",
						id: "route-nest_menu1_saff1",
						lazy: async () => {
							const mod = await import("#src/pages/saff/menu1/add_saff");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: "saff1-1",
							icon: createElement(SubnodeOutlined),
						},
					},
					{
						path: "/saff/menu1/saff2",
						id: "route-nest_menu1_saff2",
						lazy: async () => {
							const mod = await import("#src/pages/saff/menu1/list_saff");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: "saff1-2",
							icon: createElement(SubnodeOutlined),
						},
					},
				],
			},

			{
				path: "/saff/menu2",
				id: "route-nest_saff2",
				lazy: async () => {
					const mod = await import("#src/layout");
					return {
						...mod,
						Component: mod.ParentLayout,
					};
				},
				meta: {
					title: "menu2",
					icon: createElement(SisternodeOutlined),
				},
				children: [
					{
						path: "/saff/menu2/saff2-1",
						id: "route-nest_menu1_saff2-1",
						lazy: async () => {
							const mod = await import("#src/pages/saff/menu2/add_saff");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: "saff2-1",
							icon: createElement(SubnodeOutlined),
						},
					},
					{
						path: "/saff/menu2/saff2-2",
						id: "route-nest_menu1_saff2-2",
						lazy: async () => {
							const mod = await import("#src/pages/saff/menu2/list_saff");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: "saff2-2",
							icon: createElement(SubnodeOutlined),
						},
					},
				]
			},

		],
	},
];

export default routes;
