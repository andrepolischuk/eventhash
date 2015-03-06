
default: test

test: build
	@open test/index.html

clean:
	@rm -rf build.js eventhash.js eventhash.min.js components node_modules

build: $(wildcard test/*.js)
	@duo --development --stdout test/test.js > build.js

bundle: index.js
	@duo --standalone eventhash --stdout index.js > eventhash.js
	@uglifyjs eventhash.js --mangle --compress --output eventhash.min.js

.PHONY: clean test
