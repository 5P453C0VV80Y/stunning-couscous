import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { Controller, useFormContext } from 'react-hook-form';
import { T_ItemProperties } from './CreateModal/types';
import { formatStringToDate } from '@/utils';

export function DatePicker() {
	const { getValues } = useFormContext<T_ItemProperties>();
	const [open, setOpen] = useState(false);
	const date = getValues('date');
	const formattedDate =
		typeof date === 'string' ? formatStringToDate(date) : date;

	return (
		<fieldset className="fieldset">
			<legend className="fieldset-legend">Deadline</legend>

			<button
				type="button"
				//@ts-ignore
				popovertarget="rdp-popover"
				className="input input-border w-full"
				onClick={() => setOpen(true)}
				style={{ anchorName: '--rdp' } as React.CSSProperties}
			>
				{formattedDate
					? formattedDate.toLocaleDateString()
					: 'Pick a date'}
			</button>

			{open && (
				<Controller
					name="date"
					render={({
						field: { onChange },
						fieldState: { error }, //TODO ?
					}) => (
						<div
							//@ts-ignore
							popover="auto"
							id="rdp-popover"
							className="dropdown m-0"
							style={
								{
									positionAnchor: '--rdp',
								} as React.CSSProperties
							}
						>
							<DayPicker
								className="react-day-picker"
								mode="single"
								selected={formattedDate}
								onSelect={(selected) => {
									onChange(selected);
									setOpen(false);
								}}
							/>
						</div>
					)}
				/>
			)}
		</fieldset>
	);
}
