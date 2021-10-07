<template>
    <page 
        title="Users">
        <nav>
            <router-link 
                v-if="$can('users.write')"
                :to="{name: 'user-create'}">
                Create
            </router-link>
        </nav>
        <dataset 
            ref="dataset"
            :repository="users">
            <template v-slot:header>
                <th>Login</th>
                <th>Name</th>
                <th>Role</th>
                <th class="number">Balance</th>
                <th></th>
            </template>
            <template v-slot:row="row">
                <td>
                    {{ row.login }}
                </td>
                <td>
                    {{ row.name }}
                </td>
                <td>
                    {{ row.role }}
                </td>
                <td class="number">
                    {{ row.balance.toFixed(2) }}
                </td>
                <td class="actions">
                    <template v-if="$can('users.write')">
                        <router-link :to="{name: 'user-edit', params: {id: row.id}}">
                            Edit
                        </router-link>
                        <a 
                            href="#"
                            class="danger"
                            @click.prevent="remove(row)">
                            Delete
                        </a>
                    </template>
                </td>
            </template>
        </dataset>
    </page>
</template>

<script>
import users from 'candy-box-demo/modules/user/repositories/users.js';
import errors from 'candy-box-demo/client/mixins/errors.js';

export default {
    mixins: [
        errors,
    ],
    data() {
        return {
            users: users(),
        }
    },
    methods: {
        remove(user) {
            if (confirm('Are you sure you want to delete user "' + user.login + '" ?')) {
                users().delete(user.id).then(() => {
                    this.$refs.dataset.refresh(false);
                }).catch((error) => {
                    this.$catchErrors(error);
                });
            }
        }
    }
}
</script>