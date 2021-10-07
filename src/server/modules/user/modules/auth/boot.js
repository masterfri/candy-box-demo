import App from 'candy-box/app.js';
import {
    Authenticator, 
    Gate,
    AuthenticatorSymbol,
    GateSymbol } from 'candy-box/auth/auth.js';
import {
    WebtokenResolver, 
    WebtokenTrace } from 'candy-box/auth/webtoken.js';
import IdentityRepository from 'candy-box/auth/repository.js';
import { server } from 'candy-box/server/base.js';
import users from 'candy-box-demo/modules/user/repositories/users.js';
import LoginRequest from 'candy-box-demo/modules/user/modules/auth/requests/login.js';
import loginTask from 'candy-box-demo/server/modules/user/modules/auth/tasks/login.js';

App.register(({box}) => {
    box.singleton(AuthenticatorSymbol, () => new Authenticator(
        new IdentityRepository(users()), [new WebtokenResolver()], 
        new WebtokenTrace()
    ));
    box.singleton(GateSymbol, () => new Gate(
        App.make(AuthenticatorSymbol),
    ));
});

App.boot(() => {
    server().route(LoginRequest, loginTask);
});