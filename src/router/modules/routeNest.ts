import { NodeExpandOutlined, SisternodeOutlined, SubnodeOutlined } from "@ant-design/icons";
import { Children, createElement } from "react";
import type { AppRouteRecordRaw } from "../types";
import { ContainerLayout } from "#src/layout";

const routes: AppRouteRecordRaw[] = [
	{
		path: "/route-nest",
		id: "route-nest",
		Component: ContainerLayout,
		meta: {
			sort: 10,
			title: "Crud",
			icon: createElement(NodeExpandOutlined),
		},
		children: [
			{
				path: "/route-nest/menu1",
				id: "route-nest_menu1",
				lazy: async () => {
					const mod = await import("#src/layout");
					return {
						...mod,
						Component: mod.ParentLayout,
					};
				},
				meta: {
					title: "Product",
					icon: createElement(SisternodeOutlined),
				},
				children: [
					{
						path: "/route-nest/menu1/menu1-1",
						id: "route-nest_menu1_menu1-1",
						lazy: async () => {
							const mod = await import("#src/pages/routeNest/menu1/menu1-1");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: "List",
							icon: createElement(SubnodeOutlined),
						},
					},
					{
						path: "/route-nest/menu1/menu1-2",
						id: "route-nest_menu1_menu1-2",
						lazy: async () => {
							const mod = await import("#src/pages/routeNest/menu1/menu1-2");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: "Add",
							icon: createElement(SubnodeOutlined),
						},
					},
				],
			},

			{
				path: "/route-nest/menu2",
				id: "route-nest_menu2",
				lazy: async () => {
					const mod = await import("#src/layout");
					return {
						...mod,
						Component: mod.ParentLayout,
					};
				},
				meta: {
					title: "menu2",
					icon: createElement(SubnodeOutlined),
				},
				children: [
					{
						path: "/route-nest/menu2/menu2-1",
						id: "route-nest_menu1_menu2-1",
						lazy: async () => {
							const mod = await import("#src/pages/routeNest/menu2/menu2-1");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: "menu2-1",
							icon: createElement(SubnodeOutlined),
						},
					},
					{
						path: "/route-nest/menu2/menu2-2",
						id: "route-nest_menu1_menu2N-2",
						lazy: async () => {
							const mod = await import("#src/pages/routeNest/menu2/menu2-2");
							return {
								...mod,
								Component: mod.default,
							};
						},
						meta: {
							title: "menu2-2",
							icon: createElement(SubnodeOutlined),
						},
					},
				]
			},

		],
	},
];


export default routes;
