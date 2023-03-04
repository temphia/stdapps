build_n_push:
	# nvm use 18
	# export TEMPHIA_BDEV_BPRINT_CONFIG=".temphia/simpletasks/bprint.yaml"
	cd source/frontend && npm run build:simpletasks
	temphia-cli bdev push client.css
	temphia-cli bdev push client.js