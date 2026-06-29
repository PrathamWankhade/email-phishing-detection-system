# Architecture

The system uses a modular architecture: React frontend, FastAPI backend, AI/NLP engine, dataset layer, model artifact layer, reports, Docker deployment, and tests.

## Patterns

1. **MVC:** frontend is the view, backend controllers manage request flow, and database/model artifacts represent data.
2. **Layered architecture:** API routes, controllers, services, AI engine, and database are separate.
3. **Pipeline pattern:** clean text → tokenize → extract features → score/predict → explain.
4. **Service-oriented modules:** URL analyzer, sender analyzer, phishing detector, and explanation engine work independently.
