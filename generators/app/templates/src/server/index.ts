import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import nunjucks from 'nunjucks'
import path from 'path'
import winston from 'winston'

const main = async function main() {
    dotenv.config()

    winston.configure({
        format: winston.format.simple(),
        transports: [new winston.transports.Console()],
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
    })

    const app = express()

    nunjucks.configure('templates', { autoescape: true, express: app })

    app.use(morgan('common'))
    app.use('/static', express.static(path.resolve(process.cwd(), 'static')))

    app.get('/*', function _onIndex(req, res, next) {
        res.render('index.html', {
            dev: process.env.NODE_ENV === 'development'
        })
    })

    app.listen(8080, function _onListen () {
        winston.info(`application has started on [${this.address().port}]`)
    })
}

main().catch(function _onStartupError(err: Error) {
    throw err
})
