import {
    BaseRequest,
    Method } from 'candy-box/transport/request.js';

class LoginRequest extends BaseRequest
{
    method() {
        return Method.POST;
    }

    route() {
        return '/api/auth/login';
    }

    validation() {
        return {
            login: this.validator().required(),
            password: this.validator().required(),
        }
    }
}

export default LoginRequest;