.PHONY: build zip clean
NAME=ai-interact-chrome-extension

build: build_sass
	npm run build

build_sass:
	npm run buildsass

build_dev: build_sass
	npm run builddev

zip: build
	zip -r ${NAME}.zip manifest.json _locales resources html css build

clean:
	rm -f ${NAME}.zip
	rm -rf dist