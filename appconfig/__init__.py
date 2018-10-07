import os, sys
ROOT = os.getcwd()
DB_FILE_NAME = 'app.db'
DB_FILE_PATH = os.path.join(ROOT,DB_FILE_NAME)
HOST_ADDR = '127.0.0.1'
PORT = 5060
UI_PATH='ui'
LOG_PATH = ROOT

ENGINE_AUTO_RELOAD = True
BUNDLE_DIR = ROOT
#After pyinstaller bundle
if getattr(sys, 'frozen', False):
    BUNDLE_DIR = sys._MEIPASS
    ENGINE_AUTO_RELOAD = False

