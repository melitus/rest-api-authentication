import convict from 'convict';

// this loads the defined variables from .env
require('dotenv').config(); 

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['development', 'test', 'production'],
    default: 'development',
    env: 'NODE_ENV',
  },
  server: {
    hostname: {
      doc: 'rest-api-auth hostname',
      format: String,
      default: '127.0.0.1',
      env: 'SERVER_HOSTNAME',
      arg: 'server-hostname',
    },
    port: {
      doc: 'rest-api-auth port',
      format: 'port',
      default: 4015,
      env: 'SERVER_PORT',
      arg: 'server-port',
    },
    db: {
      doc: 'rest-api-auth database',
      format: String,
      default: 'mysql',
      env: 'SERVER_DB',
      arg: 'server-db',
    },
  },
  mysql: {
    host: {
      doc: 'MySQL Server hostname',
      format: String,
      default: 'localhost',
      env: 'MYSQL_HOST',
      arg: 'mysql-host',
    },
    database: {
      doc: 'MySQL database',
      format: String,
      default: '',
      env: 'MYSQL_DB',
      arg: 'mysql-db',
    },
    user: {
      doc: 'MySQL client username',
      format: String,
      default: 'user',
      env: 'MYSQL_USER',
      arg: 'mysql-user',
    },
    pass: {
      doc: 'MySQL client password',
      format: String,
      default: 'password',
      env: 'MYSQL_PASS',
      arg: 'mysql-pass',
    }
  },
  mongo: {
    host: {
      doc: 'Mongo server hostname',
      format: String,
      default: 'mongodb://127.0.0.1:27017',
      env: 'MONGO_CONNECT',
      arg: 'mongo-connect',
    },
    database: {
      doc: 'Mongo database',
      format: String,
      default: 'restapiauthdb',
      env: 'MONGO_DB',
      arg: 'mongo-db',
    },
    user: {
      doc: 'Mongo client username',
      format: String,
      default: 'user',
      env: 'MONGO_USER',
      arg: 'mongo-user',
    },
    pass: {
      doc: 'Mongo client password',
      format: String,
      default: 'password',
      env: 'MONGO_PASS',
      arg: 'mongo-pass',
    },
  },
  authentication: {
    google: {
        clientId: {
            doc: 'The Client ID from Google to use for authentication',
            format: String,
            default: 'clientid',
            env: 'GOOGLE_CLIENTID'
        },
        clientSecret: {
            doc: "The Client Secret from Google to use for authentication",
            format: String ,
            default: 'secretkey',
            env: "GOOGLE_CLIENTSECRET"
        }
    },
    facebook: {
        clientId: {
            doc: 'The Client ID from Facebook to use for authentication',
            format: String,
            default: 'clientid',
            env: 'FACEBOOK_CLIENTID'
        },
        clientSecret: {
            doc: "The Client Secret from Facebook to use for authentication",
            format: String,
            default:'secretKey',
            'env': 'FACEBOOK_CLIENTSECRET'
        }
    },
    token: {
        secret: {
            doc: 'The signing key for the JWT',
            format: String,
            default: 'mySuperSecretKey',
            env: 'JWT_SIGNING_KEY'
        },
        issuer: {
            doc: 'The issuer for the JWT',
            format: String,
            default: 'social-logins-spa'
        },
        audience: {
            doc: 'The audience for the JWT',
            format: String,
            default: 'social-logins-spa'
        }
    }
},
  
  
});

// load environment dependent configuration
// var env = config.get('env');
// config.loadFile('./config/test.json');

// throws error if config does not conform to schema
config.validate({ allowed: 'strict' });

export default config;
