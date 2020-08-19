#!/bin/bash
set -e
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker build -t "leads-manage:$TRAVIS_TAG" .
docker tag "leads-manage:$TRAVIS_TAG" "limit0/leads-manage:$TRAVIS_TAG"
docker push "limit0/leads-manage:$TRAVIS_TAG"
docker image rm "leads-manage:$TRAVIS_TAG"
