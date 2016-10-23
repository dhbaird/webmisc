BOWER = ./node_modules/.bin/bower

setup:
	npm install
	cd npm1 && npm install
	$(BOWER) install

