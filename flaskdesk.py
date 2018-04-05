import sys, os

import cherrypy

from paste.translogger import TransLogger
import appconfig
from flask import Flask
import item, user

from PyQt5.QtCore import QThread, QUrl, Qt
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView


PORT = 5000
ROOT_URL = 'http://localhost:{}'.format(PORT)


class FlaskThread(QThread):
    def __init__(self):
        QThread.__init__(self)
        self.flaskapp = Flask('WarpWeft')
        self.flaskapp.register_blueprint(item.blueprint, url_prefix="/items")
        self.flaskapp.register_blueprint(user.blueprint, url_prefix="/users")

    def __del__(self):
        self.wait()

    def run(self):
        class Root:
            pass

        # Static Files
        path = os.path.join(appconfig.BUNDLE_DIR, 'ui')
        configuration = {'/': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': path}
        }
        cherrypy.tree.mount(Root(), '/', config=configuration)

        # Flask Web services
        app_logged = TransLogger(self.flaskapp)
        cherrypy.tree.graft(app_logged, '/api')

        cherrypy.config.update({
            'engine.autoreload_on': appconfig.ENGINE_AUTO_RELOAD,
            'server.socket_port': appconfig.PORT,
            'server.server_host': appconfig.HOST_ADDR
        })

        cherrypy.engine.start()
        cherrypy.engine.block()


if __name__ == '__main__':
    qtapp = QApplication(sys.argv)


    ft = FlaskThread()
    ft.start()

    # qtapp.aboutToQuit.connect(webapp.terminate)

    browser = QWebEngineView()
    url = "http://"+appconfig.HOST_ADDR+":"+str(appconfig.PORT)+"/index.html"
    print(url)
    browser.load(QUrl(url))
    browser.setWindowTitle("Warp Weft Calculator")
    browser.setWindowFlags(Qt.FramelessWindowHint)
    browser.showFullScreen()

    sys.exit(qtapp.exec_())