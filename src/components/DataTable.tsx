import * as React from 'react';
import {
	TableContainer,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} from '@chakra-ui/react';
import {
	useReactTable,
	flexRender,
	getCoreRowModel,
	ColumnDef,
	SortingState,
	getSortedRowModel,
} from '@tanstack/react-table';

export interface DataTableProps<Data extends object> {
	data: Data[];
	columns: Array<ColumnDef<Data, any>>;
}

export function DataTable<Data extends object>({
	data,
	columns,
}: DataTableProps<Data>): JSX.Element {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	return (
		<TableContainer overflowX='hidden' whiteSpace='normal'>
			<Table>
				<Thead>
					{table.getHeaderGroups().map(headerGroup => (
						<Tr key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<Th key={header.id} fontWeight='bold' fontSize='1rem'>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</Th>
								);
							})}
						</Tr>
					))}
				</Thead>
				<Tbody>
					{table.getRowModel().rows.map(row => (
						<Tr key={row.id} fontWeight='semibold'>
							{row.getVisibleCells().map(cell => {
								return (
									<Td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								);
							})}
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
