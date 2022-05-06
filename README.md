## Table of contents

- [Development](#development)

## Development

To build image with current code base and run in minikube (this will spin up all k8s resources as in production environment inside minikube):
```bash
npm run minikube
```

To run without minikube:
```bash
npm install
npm run dev
```

In both case, the server is located at `http://localhost:3000`.
