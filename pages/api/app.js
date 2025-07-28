// Import do nosso servidor Express customizado
import '../../../app'

export default function handler(req, res) {
  // Este arquivo serve como bridge entre Next.js e Express
  res.redirect(301, '/')
}