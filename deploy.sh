#!/bin/bash
env=$1

echo "[start deploy react app] $env"

echo "[pulling repository]"
if [ "$env" = "dev" ]; then
  git pull origin develop 2>/dev/null || res=$?
else
  git pull origin main 2>/dev/null || res=$?
fi

if [ "${res}" = 1 ]; then
  echo "failed, git pull"
  exit 1
else
  echo "success, git pull"
fi

echo "[start backup build]"

if [ ! -d "./build" ]; then
  echo 'Does not exists build'
else
  cp -r ./build ./build_back 2>/dev/null || res=$?

  if [ "${res}" = 1 ]; then
    echo "failed, backup"
    exit 2
  else
    echo "success, backup"
  fi
fi

echo "[install new package]"

yarn 2>/dev/null || res=$?

if [ "${res}" = 1 ]; then
  echo "failed, install package"
  exit 2
else
  echo "success, install package"
fi

echo "[start build react app]"

yarn run build 2>/dev/null || res=$?

if [ "${res}" = 1 ]; then
  echo "failed, build"
  exit 3
else
  echo "success, build"
fi

echo "copy ./build >> ./build_prd"

if [ ! -d "./build_prd" ]; then
  mkdir ./build_prd
  chmod -R 775 ./build_prd
else
  rm -rf ./build_prd/*
fi

cp ./public/.htaccess ./build && cp -r ./build/* ./build_prd 2>/dev/null || res=$?
cp ./public/.htaccess ./build_prd
chmod -R 775 ./build_prd

if [ "${res}" = 1 ]; then
  echo "failed copy build directory"
  exit 4
else
  echo "success copy!"
fi

rm -rf ./build

exit 0
