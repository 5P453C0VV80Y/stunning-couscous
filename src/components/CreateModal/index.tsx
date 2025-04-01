import { DatePicker } from '../DatePicker';
import { T_ItemProperties } from './types';
import { FormProvider, UseFormReturn } from 'react-hook-form';

export function CreateModal({
	onAdd,
	methods,
}: {
	onAdd: (props: T_ItemProperties) => void;
	methods: UseFormReturn<T_ItemProperties, any, T_ItemProperties>;
}) {
	const {
		reset,
		formState: { isValid, errors },
	} = methods;

	console.log('isValid', isValid);
	const handleSubmit = (data: T_ItemProperties) => {
		console.log('[SUBMIT]', data);

		onAdd(data);

		//? close the modal
		(document?.getElementById('createModal') as HTMLFormElement)?.close();

		methods.reset();
	};

	return (
		<FormProvider {...methods}>
			<dialog id="createModal" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Create new todo</h3>

					<div className="modal-action block">
						<form
							method="dialog"
							className="flex flex-col gap-4"
							onSubmit={methods.handleSubmit(handleSubmit)}
						>
							<fieldset className="fieldset">
								<legend className="fieldset-legend">
									Task name
								</legend>
								<input
									type="text"
									placeholder="Type here"
									className="input input-bordered w-full min-h-10"
									{...methods.register('name')}
								/>
							</fieldset>

							<DatePicker />

							<button
								type="submit"
								disabled={!isValid}
								className="btn btn-active btn-primary"
							>
								Submit
							</button>
						</form>
					</div>
				</div>

				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</FormProvider>
	);
}
