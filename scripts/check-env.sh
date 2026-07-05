#!/bin/bash

echo "==============================="
echo " InfraVision Environment Check "
echo "==============================="

check_command () {
    if command -v "$1" >/dev/null 2>&1; then
        echo "[OK] $1 : $(command -v $1)"
    else
        echo "[ERROR] $1 non installé"
    fi
}

check_command git
check_command docker
check_command kubectl
check_command helm
check_command dotnet
check_command node
check_command npm

echo
echo "Versions :"
echo

docker --version 2>/dev/null
kubectl version --client 2>/dev/null
helm version --short 2>/dev/null
dotnet --version 2>/dev/null
node --version 2>/dev/null
npm --version 2>/dev/null

echo
echo "Cluster Kubernetes"

kubectl get nodes
