#!/bin/bash

if [ -z "$(git status --porcelain)" ]; then
  # Working directory clean so we can proceed
  echo "Clean directory, so we can proceed"
else
  echo "Working directory not clean so we cannot build..."

  exit 1
fi
