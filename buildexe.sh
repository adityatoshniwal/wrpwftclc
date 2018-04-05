rm -rf ./dist
pyinstaller --onedir app.pyinstaller.spec
cp app.db ./dist
