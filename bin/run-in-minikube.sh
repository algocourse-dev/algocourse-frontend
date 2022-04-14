#!/bin/sh
set -e

deletepod()
{
    if [[ $(kubectl get pods -o=jsonpath='{.items[?(@.metadata.name=="nextjs"})]}') != "" ]]; then
        kubectl delete po nextjs
    fi
}

cleanup ()
{
    # Return to using docker daemon in host machine
    eval $(minikube docker-env -u)

    # Delete pod created from deployment
    deletepod
}

trap cleanup EXIT

# Use the docker daemon inside minikube
eval $(minikube docker-env)

# Build the frontend image
docker build -t algocourse/frontend-development:latest .

# Create the pod from YAML file
kubectl create -f k8s/deployments/nextjs.yaml

# Port forwarding to the pod for access from host
while [[ $(kubectl get pods -o=jsonpath='{.items[?(@.metadata.name=="nextjs"})].status.phase}') != "Running" ]]; do
   sleep 1
done
kubectl port-forward nextjs 3000:3000

# Cleanup
cleanup
