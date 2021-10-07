import App from 'candy-box/app.js';
import 'candy-box-demo/client/boot.js';

App.boot(({app, router, store}) => {
    app.use(router);
    app.use(store);
    app.mount('#app');
}, 1000);

App.run();
