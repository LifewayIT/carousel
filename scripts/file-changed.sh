#! /bin/bash

file=${1-CHANGELOG.md}
parent_commit=${2-"upstream/master"}

! git diff -s --exit-code $parent_commit -- $file
