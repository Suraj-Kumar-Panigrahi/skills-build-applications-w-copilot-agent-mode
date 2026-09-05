import express from 'express'
import { connectDatabase } from './config/database'
import { createApiRouter } from './routes'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())
app.use('/api', createApiRouter())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl })
})

async function startServer(): Promise<void> {
  await connectDatabase()
  app.listen(port, () => {
    console.log(`OctoFit API listening on ${apiBaseUrl}`)
  })
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit API:', error)
  process.exitCode = 1
})