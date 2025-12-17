import db from "../db/db.ts";

export async function insertUnit(
  army_id: number,
  name: string,
  xml_id: string,
  selection: string
) {
  return await db.one(
    `INSERT INTO unit (army_id, name, xml_id, selection)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [army_id, name, xml_id, selection]
  );
}
