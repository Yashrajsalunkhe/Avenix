import { motion } from 'framer-motion'
import Button from './Button'

function Hero() {
  return (
    <motion.section className="hero-section" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <div className="hero-copy">
        <p className="eyebrow">Open-source tracing for AI workflows</p>
        <h1>Observe every LLM request with elegant clarity.</h1>
        <p className="hero-text">
          Avenix helps teams trace model calls, track tokens, calculate costs, and surface rich terminal insights without adding friction to their Python apps.
        </p>
        <div className="hero-actions">
          <Button href="/docs">View Documentation</Button>
          <Button href="https://pypi.org/project/avenix/" variant="secondary" external>
            View on PyPI
          </Button>
          <Button href="https://github.com/avenix/avenix" variant="secondary" external>
            GitHub
          </Button>
        </div>
      </div>
      <motion.div className="hero-panel" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
        <div className="panel-header">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
        <pre>{`from avenix import trace
from openai import OpenAI

client = OpenAI()

@trace
def get_response(prompt):
    return client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )`}</pre>
      </motion.div>
    </motion.section>
  )
}

export default Hero
