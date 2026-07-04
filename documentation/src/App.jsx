import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import FeatureCard from './components/FeatureCard'
import Sidebar from './components/Sidebar'
import Section from './components/Section'
import CodeBlock from './components/CodeBlock'
import SplashScreen from './components/SplashScreen'
import ScrollProgress from './components/ScrollProgress'
import CopyButton from './components/CopyButton'
import BackToTop from './components/BackToTop'

const featureItems = [
  {
    title: 'Decorator-based tracing',
    description: 'Wrap functions with a single decorator and capture traces without intrusive instrumentation.',
  },
  {
    title: 'Latency and token metrics',
    description: 'Measure execution time and track input/output tokens automatically for every request.',
  },
  {
    title: 'Cost-aware insights',
    description: 'Surface pricing estimates based on model usage to help teams understand spend.',
  },
  {
    title: 'Rich terminal output',
    description: 'Present traces in a polished CLI experience that makes debugging and review effortless.',
  },
]

function HomePage() {
  return (
    <main className="page-shell">
      <Hero />
      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Why teams use Avenix</p>
          <h2>Built for developers who care about observability.</h2>
        </div>
        <div className="feature-grid">
          {featureItems.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.06 }}>
              <FeatureCard title={feature.title} description={feature.description} />
            </motion.div>
          ))}
        </div>
      </section>
      <section className="content-section compact stats-panel">
        <div className="stats-grid">
          <div>
            <strong>10x</strong>
            <span>faster debugging loops</span>
          </div>
          <div>
            <strong>0</strong>
            <span>setup overhead</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>terminal-ready insights</span>
          </div>
        </div>
      </section>
      <section className="content-section compact">
        <div className="section-heading">
          <p className="eyebrow">Quick example</p>
          <h2>Trace a model request in a few lines of Python.</h2>
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35 }}>
          <CodeBlock>{`from avenix import trace
from openai import OpenAI

client = OpenAI()

@trace
def get_response(prompt):
    return client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )`}</CodeBlock>
        </motion.div>
      </section>
    </main>
  )
}

function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.doc-section')
      const offset = 140
      let current = 'introduction'
      sections.forEach((section) => {
        if (window.scrollY + offset >= section.offsetTop) {
          current = section.id
        }
      })
      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  return (
    <main className="docs-page">
      <div className="docs-breadcrumbs">
        <span>Docs</span>
        <span>/</span>
        <span>Overview</span>
      </div>
      <div className="docs-layout">
        <Sidebar activeSection={activeSection} />
        <div className="docs-content">
          <Section id="introduction" title="Introduction" intro="Avenix is a Python tracing library that automatically captures AI and LLM request information for local debugging and observability.">
            <p>
              It gives you a decorator-based API for tracing AI model calls, capturing timing, token usage, and cost information, and presenting them in a clean terminal experience.
            </p>
          </Section>

          <Section id="installation" title="Installation" intro="Install the package from PyPI with pip.">
            <div className="code-shell">
              <CopyButton text="pip install avenix" />
              <CodeBlock>{`pip install avenix`}</CodeBlock>
            </div>
          </Section>

          <Section id="requirements" title="Requirements" intro="The current release targets modern Python environments.">
            <ul>
              <li>Python 3.11+</li>
              <li>pydantic ^2.0</li>
              <li>rich ^13.0</li>
            </ul>
          </Section>

          <Section id="quick-start" title="Quick Start" intro="The simplest workflow uses the trace decorator to wrap an AI request.">
            <div className="code-shell">
              <CopyButton text={`from avenix import trace
from openai import OpenAI

client = OpenAI()

@trace
def get_gpt_response(prompt: str):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response

result = get_gpt_response("What is machine learning?")`} />
              <CodeBlock>{`from avenix import trace
from openai import OpenAI

client = OpenAI()

@trace
def get_gpt_response(prompt: str):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response

result = get_gpt_response("What is machine learning?")`}</CodeBlock>
            </div>
            <p>When the function executes, Avenix measures latency, extracts model details, tracks tokens, estimates cost, and prints a rich trace output.</p>
          </Section>

          <Section id="trace-decorator" title="@trace Decorator" intro="Use the decorator for transparent tracing with minimal boilerplate.">
            <CodeBlock>{`@trace
def your_function():
    return response`}</CodeBlock>
            <p>The decorator measures execution time with perf_counter, captures the result, forwards it to the global tracer, and preserves the original function behavior.</p>
          </Section>

          <Section id="tracer-class" title="Tracer Class" intro="For manual control, instantiate the Tracer API directly.">
            <CodeBlock>{`from avenix import Tracer

tracer = Tracer()
tracer.create_trace(
    model="gpt-4",
    latency=2.5,
    input_tokens=150,
    output_tokens=300,
    cost=0.045,
    prompt="What is AI?",
    response="AI is artificial intelligence..."
)`}</CodeBlock>
            <p>The Tracer class exposes capture_trace and create_trace methods for manual or programmatic tracing.</p>
          </Section>

          <Section id="tracemodel" title="TraceModel" intro="TraceModel stores validated trace data for each request.">
            <ul>
              <li>model: name of the AI model</li>
              <li>latency: elapsed time in seconds</li>
              <li>input_tokens: number of input tokens</li>
              <li>output_tokens: number of output tokens</li>
              <li>cost: estimated request cost in dollars</li>
              <li>prompt and response: text payloads</li>
            </ul>
          </Section>

          <Section id="supported-models" title="Supported Models" intro="Avenix includes built-in extractors for popular providers.">
            <h3>OpenAI</h3>
            <ul>
              <li>gpt-4</li>
              <li>gpt-4-turbo</li>
              <li>gpt-3.5-turbo</li>
            </ul>
            <h3>Anthropic</h3>
            <ul>
              <li>claude-3-opus</li>
              <li>claude-3-sonnet</li>
              <li>claude-3-haiku</li>
            </ul>
          </Section>

          <Section id="features" title="Features" intro="The package focuses on a small but powerful set of features.">
            <ul>
              <li>Decorator-based tracing</li>
              <li>Automatic latency measurement</li>
              <li>Token tracking</li>
              <li>Cost calculation</li>
              <li>Rich terminal output</li>
              <li>OpenAI and Anthropic support</li>
              <li>Manual tracing</li>
              <li>Error handling and graceful fallbacks</li>
            </ul>
          </Section>

          <Section id="architecture" title="Architecture" intro="Avenix is organized into focused layers for models, decorators, tracing, extraction, and formatting.">
            <ol>
              <li>Models layer for TraceModel validation</li>
              <li>Decorator layer for the trace wrapper</li>
              <li>Tracer layer for orchestration</li>
              <li>Extractor layer for provider-specific parsing</li>
              <li>Formatter and logger layers for terminal rendering</li>
            </ol>
          </Section>

          <Section id="examples" title="Examples" intro="The examples directory includes working reference scripts.">
            <ul>
              <li>openai_example.py</li>
              <li>anthropic_example.py</li>
              <li>manual_trace.py</li>
            </ul>
          </Section>

          <Section id="testing" title="Testing" intro="The project ships with verification-focused tests.">
            <CodeBlock>{`pytest tests/ -v
pytest tests/ --cov`}</CodeBlock>
            <p>Property-based testing and targeted unit tests help verify correctness across the core behavior.</p>
          </Section>

          <Section id="error-handling" title="Error Handling" intro="Avenix is designed to fail safely and preserve normal application behavior.">
            <ul>
              <li>Extraction failures fall back to sensible defaults.</li>
              <li>Validation issues do not break the traced function.</li>
              <li>Formatting failures gracefully fall back to plain output.</li>
              <li>Exceptions inside traced functions still propagate normally.</li>
            </ul>
          </Section>

          <Section id="api-reference" title="API Reference" intro="The public API remains simple and documented around the decorator and tracer utilities.">
            <p>See the project API documentation for detailed signatures and module-level references.</p>
          </Section>

          <Section id="changelog" title="Changelog" intro="The current package version is v0.1.">
            <p>Review the project changelog for release notes and upcoming milestones.</p>
          </Section>

          <Section id="contributing" title="Contributing" intro="Feedback and contributions are welcome for this early release.">
            <p>The project is open to improvements, bug fixes, and new provider integrations.</p>
          </Section>

          <Section id="license" title="License" intro="Avenix is distributed under an MIT license.">
            <p>See the repository license file for the full text.</p>
          </Section>
        </div>
      </div>
    </main>
  )
}

function App() {
  const location = useLocation()
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('avenix-splash-seen'))

  useEffect(() => {
    if (!showSplash) return
    sessionStorage.setItem('avenix-splash-seen', 'true')
  }, [showSplash])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="app-shell">
      <ScrollProgress />
      {showSplash ? <SplashScreen onFinish={() => setShowSplash(false)} /> : null}
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<DocsPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
