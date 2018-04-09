#!/bin/bash

docker login -u pushakovv@yandex.ru -p $DOCKER_PASSWORD
docker build -t mtemplate/nodejs .
docker push mtemplate/nodejs