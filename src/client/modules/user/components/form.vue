<template>
    <form 
        action="javascript:;"
        @submit.prevent="save">
        <div class="control">
            <label>Username</label>
            <input v-model="doc.login" />
            <ul 
                v-if="$error('login')"
                class="errors">
                <li 
                    v-for="(error, index) in $error('login')"
                    :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>
        <div class="control">
            <label>Password</label>
            <input type="password" v-model="doc.password" />
            <ul 
                v-if="$error('password')"
                class="errors">
                <li 
                    v-for="(error, index) in $error('password')"
                    :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>
        <div class="control">
            <label>Name</label>
            <input v-model="doc.name" />
            <ul 
                v-if="$error('name')"
                class="errors">
                <li 
                    v-for="(error, index) in $error('name')"
                    :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>
        <div class="control">
            <label>Role</label>
            <select v-model="doc.role">
                <option 
                    v-for="role in roles"
                    :key="role"
                    :value="role"
                    :selected="doc.role === role">
                    {{ role }}
                </option>
            </select>
            <ul 
                v-if="$error('role')"
                class="errors">
                <li 
                    v-for="(error, index) in $error('role')"
                    :key="index">
                    {{ error }}
                </li>
            </ul>
        </div>
        <div class="control">
            <button type="submit">Save</button>
        </div>
    </form>
</template>

<script>
import errors from 'candy-box-demo/client/mixins/errors.js';
import users from 'candy-box-demo/modules/user/repositories/users.js';

export default {
    mixins: [
        errors,
    ],
    props: {
        doc: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            roles: [
                'customer', 
                'delivery', 
                'manager', 
                'admin',
            ]
        }
    },
    methods: {
        save() {
            users().store(this.doc).then(() => {
                this.$router.push({name: 'users'});
            }).catch((error) => {
                this.$catchErrors(error);
            });
        },
    },
}
</script>