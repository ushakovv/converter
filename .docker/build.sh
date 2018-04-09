#!/bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdi
docker build -t mtemplate/nodejs .
docker push mtemplate/nodejs