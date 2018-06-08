#!/usr/bin/env bash
export VERSION=`cat version.txt`
CONTAINER_NAME="site_dwy_"
# lets find the first container
FIRST_NUM=`docker ps | awk '{print $NF}' | grep $CONTAINER_NAME | awk -F  "_" '{print $NF}' | sort | head -1`
NUM_OF_CONTAINERS=2
MAX_NUM_OF_CONTAINERS=4
echo $FIRST_NUM
docker-compose config
docker-compose pull

docker-compose stop dwy1
docker-compose up -d --force-recreate dwy1

sleep 10

docker-compose stop dwy2
docker-compose up -d --force-recreate dwy2
