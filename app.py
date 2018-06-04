from flask import Flask
from flask_cors import CORS
import cherrypy
from cherrypy import _cpwsgi_server
import os
from paste.translogger import TransLogger
import appconfig

import item, user

app = Flask('WarpWeft')
app.secret_key = 'YouKnowNothing!'
CORS(app)

app.register_blueprint(item.blueprint, url_prefix="/items")
app.register_blueprint(user.blueprint, url_prefix="/users")


class Root:
    @cherrypy.expose
    def index(self):
        raise cherrypy.HTTPRedirect("index.html")

def run_server():

    # Static Files
    path = os.path.join(appconfig.BUNDLE_DIR, 'ui')
    configuration = {'/': {
        'tools.staticdir.on': True,
        'tools.staticdir.dir': path}
    }
    cherrypy.tree.mount(Root(), '/', config=configuration)

    #Flask Web services
    app_logged = TransLogger(app)
    cherrypy.tree.graft(app_logged, '/api')

    cherrypy.config.update({
        'engine.autoreload_on':appconfig.ENGINE_AUTO_RELOAD,
        'server.socket_port':appconfig.PORT,
        'server.server_host':appconfig.HOST_ADDR
    })

    cherrypy.engine.start()
    cherrypy.engine.block()


if __name__ == "__main__":
    print("Starting app..")
    run_server()