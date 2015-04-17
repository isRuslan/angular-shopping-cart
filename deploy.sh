#!/bin/bash
set -e

cd prod
git init

git config user.name "Travis CI"
git config user.email "isRuslan@is.ismagilov@gmail.com"

git add -A
git commit -m "Deploy to GitHub Pages"

# Force push from the current repo's master branch to the remote repo's gh-pages branch.
git push --force "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
