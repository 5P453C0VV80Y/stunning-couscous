import { T_CreateModalItemProps } from "@/components/CreateModal/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const itemListSchema = yup
	.object({
		name: yup.string().required(),
		deadline: yup.string().required(),
		responsible: yup.string().required()
	})
	.required();

export function useCreateModalForm() {
	//? validation is applied per component basis
	const createModalForm = useForm<T_CreateModalItemProps>({
		resolver: yupResolver(itemListSchema)
	});

	return {
		createModalForm
	};
}
