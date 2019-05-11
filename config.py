class Configuration(object):
    #DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://vlad:vlad@localhost/maindb'
    TEMPLATES_AUTO_RELOAD = True
