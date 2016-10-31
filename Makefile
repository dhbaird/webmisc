SHELL = /bin/bash
BOWER = ./node_modules/.bin/bower

setup:
	npm install
	cd npm1 && npm install
	$(BOWER) install

link:
	mkdir -p ~/public_html
	if [[ ! -e ~/public_html/webmisc ]]; then ln -s $(CWD) ~/public_html/webmisc; fi
