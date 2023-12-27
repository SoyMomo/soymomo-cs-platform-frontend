#!/usr/bin/env bash
# exit on error
set -o errexit

export REACT_APP_BACKEND_HOST="https://csapi-dev.soymomo.io"
export FAST_REFRESH=false

npm run build