import { getExample } from '../services/example.ts'
import type { Request, Response } from 'express'


// Request <
// { id: number}, // request params (request.params.x)
// any, // response body (response.send)
// void, // request body (request.body)
// void // request query (request.query)
export async function getExampleData(req: Request<{ id: number }, any, void, void>, res: Response) {
  const id = req.params.id
  const result = await getExample(id)

  res.json(result)
}
