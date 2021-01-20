install:
	npm install

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	npx -n --experimental-vm-modules jest
	
test-coverage:
	npx -n --experimental-vm-modules jest -- --coverage --coverageProvider=v8
