import { T_Responsible } from "@/types";
import { atom, useAtom } from "jotai";

const responsibleQueryState = atom<T_Responsible[] | null>(null);

export const useResponsibleUsers = () => {
	const [users, setUsers] = useAtom(responsibleQueryState);

	const setBatchUsers = (users: T_Responsible[]) => {
		setUsers(users);
	};

	return {
		users,
		setBatchUsers
	};
};
