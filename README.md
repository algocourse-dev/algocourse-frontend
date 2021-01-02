# algocourse-frontend (Development only)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install Docker
Install latest version of Docker via Docker's official website:
```
https://docs.docker.com/get-docker/
```

## Development Mode

From root directory of this repo, run:

```
docker-compose up -d --build
```
* -d, --detach: Detached mode: Run containers in the background, print new container names. Incompatible with --abort-on-container-exit.
* --build: Build images before starting containers.

To stop the containers and remove them:  
```
docker-compose down -v
```
* -v, --volumes: Remove named volumes declared in the `volumes` section of the Compose file and anonymous volumes attached to containers.

To see logs of containers:  
```
docker-compose logs -f
```
* -f, --follow: Follow log output.

To check files in the container:  
```
docker exec -it CONTAINER_ID /bin/sh
```

To list out the running containers:  
```
docker ps
```
* -a: list out all the containers, including the non-running ones

Feel free to implement new things, new changes will be automatically updated.

If you need to add packages, please stop the containers, install new packages locally first and build again to Docker.

## Production Mode (WIP)

From root directory of this repo, run:

```
docker-compose -f docker-compose.prod.yml up -d --build
```
* -d, --detach: Detached mode: Run containers in the background, print new container names. Incompatible with --abort-on-container-exit.
* --build: Build images before starting containers.
* -f: Build from file.
