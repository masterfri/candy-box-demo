import App from 'candy-box/app.js';
import 'candy-box-demo/server/boot.js';
import { server } from 'candy-box/server/base.js';

App.boot(() => {
    server().start();
});

App.run();