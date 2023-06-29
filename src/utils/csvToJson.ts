export interface CsvToJsonResultType {
	header: string[];
	rows: Record<string, unknown>[];
}

export default async function csvToJson(file: File) {
	const text = await file.text();

	const rows = text.split('\n');

	const header = rows[0].split(',');

	const data = rows.slice(1);

	const result = [];

	for (const row of data) {
		const cells = row.split(',');

		const obj: Record<string, string> = {};

		for (let i = 0; i < cells.length; i++) {
			obj[header[i]] = cells[i];
		}

		result.push(obj);
	}

	return { header, rows: result };
}
