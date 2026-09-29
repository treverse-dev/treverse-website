.PHONY: build dev check
build:
	python3 scripts/build.py
dev:
	python3 -m http.server 4173 --directory dist
check:
	python3 scripts/check.py
