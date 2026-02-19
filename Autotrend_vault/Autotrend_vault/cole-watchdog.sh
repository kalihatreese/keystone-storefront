#!/bin/bash
echo 'Cole is watching...'
git fetch origin
git status
git log --oneline -n 5 > logs/cole-latest.log
node mutation-cycle.js &
