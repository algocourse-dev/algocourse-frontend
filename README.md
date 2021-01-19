## Table of contents

- [Development](#development)
- [Production](#production-wip)

## Development

- Install `npm`.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start the development server at `http://localhost:3001`.

## Production (WIP)

From root directory of this repo, run:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```
* `-d`, `--detach`: Detached mode: Run containers in the background, print new container names. Incompatible with `--abort-on-container-exit`.
* `--build`: Build images before starting containers.
* `-f`: Build from file.
