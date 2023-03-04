## FreeBoard


```bash

# to build (example freebaord)

cd source/frontend/ && npm run build:freeboard

# to push, assuming you have proper .env in .temphia/freeboard
# first export .bprint.yaml file and temphia-cli  bdev push <file> 

export TEMPHIA_BDEV_BPRINT_CONFIG=".temphia/freeboard/bprint.yaml"
temphia-cli bdev push client.js

```
