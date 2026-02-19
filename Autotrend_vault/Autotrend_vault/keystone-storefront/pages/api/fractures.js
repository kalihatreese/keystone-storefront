import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const logPath = path.resolve(process.cwd(), 'runtime_fractures.log')
  try {
    const data = fs.readFileSync(logPath, 'utf-8')
    res.status(200).json({ status: 'online', fractures: data.split('\n') })
  } catch (e) {
    res.status(500).json({ error: 'Fracture log not found', details: e.message })
  }
}
