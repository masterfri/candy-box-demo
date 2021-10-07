export default {
    server: {
        host: '127.0.0.1',
        port: 8088,
    },
    db: {
        usePool: true,
        host: 'localhost',
        user: 'homestead',
        database: 'candybox_demo',
        password : 'secret',
    },
    crypto: {
        password: 'secret',
        salt: 'salt',
    },
    webtoken: {
        password: 'secret',
    },
    logger: {
        type: 'console',
    }
}