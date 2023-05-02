.phony: build_n_push build_eventmap build_freeboard build_simpledoc build_simpletasks

SHELL := /bin/bash

build_eventmap:
	cd source/frontend && npm install && npm run build:eventmap && npm run build:eventmap:emitter 
build_freeboard:
	cd source/frontend && npm install && npm run build:freeboard
build_simpledoc:
	cd source/frontend && npm install && npm run build:simpledoc
build_simpletasks:
	cd source/frontend && npm install && npm run build:simpletasks

build_n_push:
	# nvm use 18
	# export TEMPHIA_BDEV_BPRINT_CONFIG=".temphia/simpletasks/bprint.yaml"
	cd source/frontend && npm run build:simpletasks
	temphia-cli bdev push client.css
	temphia-cli bdev push client.js