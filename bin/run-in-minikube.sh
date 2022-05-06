#!/bin/sh
export IMAGE_TAG='local'

set -e

deletens()
{
    if [[ $(kubectl get ns -o=jsonpath='{.items[?(@.metadata.name=="algocourse-beta"})]}') != "" ]]; then
        kubectl delete ns algocourse-beta
    fi
}

cleanup ()
{
    # Delete all resources by deleting the namespace
    deletens

    # Return to using docker daemon in host machine
    eval $(minikube docker-env -u)
}

trap cleanup EXIT

# Use minikube context, not the one of the cloud.
kubectl config use-context minikube

# Use the docker daemon inside minikube
eval $(minikube docker-env)

# Build the frontend image
docker build -t algocourse/frontend-development:$IMAGE_TAG .

# Create beta namespace
kubectl create -f k8s/namespaces/algocourse-beta-ns.yaml

# Deploy frontend pods
envsubst < k8s/deployments/nextjs-deployment.yaml | kubectl apply -f -

# Expose the frontend internally with a ClusterIP service
kubectl create -f k8s/services/nextjs-cluster-ip-service.yaml

# Deploy nginx pods with frontend pods as upstream
kubectl create -f k8s/deployments/nginx-deployment.yaml

# Port forwarding to the nginx pods for access from host
while [[ -z $(kubectl get deploy -n algocourse-beta -o=jsonpath='{.items[?(@.metadata.name=="nginx-deployment"})].status.readyReplicas}') ]]; do
   sleep 1
done
kubectl port-forward deployment/nginx-deployment 3000:80 -n algocourse-beta

# Cleanup
cleanup
