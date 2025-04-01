'use client';
import { T_ItemProperties } from './CreateModal/types';
import React, { PropsWithChildren } from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface T_ListItem extends T_ItemProperties {
	index: number;
	id: string;
}

const Item = ({
	date,
	id,
	name,
	index,
	children,
}: PropsWithChildren<T_ListItem>) => {
	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<div
					className="bg-gray-200 rounded p-4 px-2 mt-2 flex justify-between items-center transition-colors duration-150 hover:bg-white ease-in"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div className="">
						<div className="font-bold">{name}</div>
						<div className="text-sm">{date.toString()}</div>
					</div>

					<div className="toolbar">{children}</div>
				</div>
			)}
		</Draggable>
	);
};

export default Item;
