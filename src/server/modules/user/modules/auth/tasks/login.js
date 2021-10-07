import { CredentialsResolver } from 'candy-box/auth/credentials.js';
import { auth,
    AuthorizationError } from 'candy-box/auth/auth.js';
import Response, {
    Status } from 'candy-box/transport/response.js';
import { is } from 'candy-box/helpers.js';

export default (request) => {
    let resolver = new CredentialsResolver();
    return auth().resolveWith(request, resolver)
        .then((identity) => {
            return identity.getInstance()
                .then((user) => {
                    return auth().putTrace(new Response({
                        id: user.id,
                        name: user.name,
                        role: user.role,
                    }), identity);
                });
        }).catch((error) => {
            if (is(error, AuthorizationError)) {
                return new Response({
                    login: ['Invalid login or password'],
                }, Status.UNPROCESSABLE_ENTITY);
            }
            return Promise.reject(error);
        });
}