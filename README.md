# Unified Next.js Front-End Integration

This project integrates three core back-end modules into a unified Next.js front-end UI with dedicated tabs for Compliance, Brand Alignment, and Competitor Research.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the live application.

## Integration Roadmap

### Accomplished
- **Compliance Engine Integration**: Implemented a front-end Compliance Checklist that interacts with the back-end compliance check API. Users can select between Full Automation and Human-in-the-Loop modes.
- **Brand Alignment Integration**: Set up a dynamic Brand Alignment Q&A interface that fetches insights using a local hybrid search RAG system.
- **Competitor Research Integration**: Developed a Competitor Research tab that initiates automated competitor analysis and supports follow-up queries.
- **Unified Client-Side Interactivity**: Ensured all interactive components (buttons, dialogs, forms) are client components using the `"use client"` directive.

### In Progress / Pending
- **Advanced Multi-Agent Supervisor**: Further integration of LangChain/LangGraph for finer-grained compliance steps including real-time streaming of compliance check updates.
- **Email Notification Integration**: Implement real email notifications for compliance steps flagged for human review.
- **Unified Database and Async Processing**: Enhance the database layer and incorporate asynchronous processing for long-running tasks like detailed competitor research.
- **Security and Rate-Limiting Enhancements**: Implement further security protocols and rate limiting for enhanced production-readiness.
- **Additional UI/UX Enhancements**: Improve error handling, loading states, and mobile responsiveness.

## Project Overview

This application leverages a unified back-end strategy to integrate:
- **Compliance Engine**: Uses AI components (LLM via Ollama and browser automation via Playwright) to validate business profiles.
- **Brand Alignment RAG**: Fetches and synthesizes brand-related documents using hybrid search techniques and LLM.
- **Competitor Research**: Utilizes automated research flows to generate comprehensive competitor profiles with an option for iterative follow-ups.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [LangChain Documentation](https://python.langchain.com/)
- [Ollama API Reference](https://ollama.com/)

## Future Directions

The roadmap outlines our phased approach from MVP to a fully integrated, scalable, and secure multi-tenant platform. Contributions and feedback are welcome as we expand these features.
