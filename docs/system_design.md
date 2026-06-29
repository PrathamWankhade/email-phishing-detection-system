# System Design

React communicates with FastAPI over REST. FastAPI delegates analysis to independent services and the AI engine. Model artifacts live under `trained_models/`, while datasets preserve the raw → processed → validation rule.
