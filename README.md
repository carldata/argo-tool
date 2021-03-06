# Quickstart

## First steps

```
git clone https://github.com/carldata/argo-tool.git
cd argo-tool
npm i
```

## Backless development

Install the latest version of TypeScript:
```
npm i typescript -g
```

To rebuild server (required only once to create /backless-development folder):
```
npm run bd-server-build
```

To start the server:
```
npm run bd-server-serve
```

Backless Server should be available at http://localhost:3900 

**Warning !** Backless development is **required** to make JEST tests working !

## Testing with JEST

```
npm run test
```

## Storybook support

**First installation**

```
npm i -g @storybook/cli@alpha
```
see also https://github.com/storybooks/storybook/issues/3044

**Running**

```
npm run storybook
```
then open http://localhost:6006/ to browse your stories !

# Integrations

## Building docker images

These steps verify docker image is built correctly and can be deployed to k8s.

* Create (the most up-to-date) dist folder containing the client application
`npm run prod-k8s`

* Start docker daemon, then:
`docker build -t flowworks-carlsolutions.azurecr.io/flowworks/argo-tool .`

* Find unique id of built image:
`docker images`

* Run the image to test
`docker run -d -p 8450:80 [imageId]`

* Visit http://localhost:8450 in the browser.

## Pushing docker image to repository

```
docker push flowworks-carlsolutions.azurecr.io/flowworks/argo-tool
```

## Republishing k8s deployment

### Starting from scratch

```
kubectl delete deployment argo-tool
kubectl delete service argo-tool
kubectl delete ingress argo-tool
kubectl create -f argo-tool-deployment.yaml
kubectl create -f argo-tool-service-ingress.yaml
```

### Republishing

```
kubectl delete deployment argo-tool
kubectl create -f argo-tool-deployment.yaml
```

## Exposing the deployment with an IP

```
kubectl expose deployment argo-tool --port=80 --target-port=80 --name=argo-tool --type=LoadBalancer
```

Follow instructions on https://carlsolutions.atlassian.net/wiki/spaces/DT/pages/38809810/Deploying+app+on+kubernetes+and+exposing+it+with+service