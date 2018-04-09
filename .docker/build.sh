#!/bin/bash

docker login -u pushakovv@yandex.ru -p Gniou423gbBFGOY*#^&gf762
docker build -t mtemplate/nodejs .
docker push mtemplate/nodejs