#!/usr/bin/env bash
# exit on error
set -o errexit

export REACT_APP_BACKEND_HOST="https://customerservice.soymomo.io"
export FAST_REFRESH=false

npm run build