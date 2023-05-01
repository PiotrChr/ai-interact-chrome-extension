.PHONY: build zip clean
NAME=ai-interact-chrome-extension

build:
	npm run build

build_dev:
	npm run builddev

zip: build
	zip -r ${NAME}.zip manifest.json _locales resources html css build

clean:
	rm -f ${NAME}.zip
	rm -rf dist