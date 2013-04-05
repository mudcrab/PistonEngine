#!/bin/bash

rm piston.js
rm *.min.js

declare -a Piston=('core' 'renderer' 'entity' 'stage' 'layer' 'input' 'camera' 'loader' 'map' 'tiledmap' 'astar' 'debug')

for F in ${Piston[@]}
do
	echo "Adding $F to piston.js"
	cat "$F.js" >> piston.js
	echo "Minifying $F to ${F%%.*}.min.js"
	uglifyjs "$F.js" -o "${F%%.*}.min.js" -c -m
	echo "Adding ${F%%.*}.min.js to piston.min.js"
	cat "${F%%.*}.min.js" >> piston.min.js
done
echo "All done"