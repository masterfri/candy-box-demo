<template>
    <table 
        v-if="mode === 'table'"
        class="dataset">
        <thead>
            <slot name="header" />
        </thead>
        <tbody>
            <tr
                v-for="item in items"
                :key="item.id"
                class="item">
                <slot name="row" v-bind="item" />
            </tr>
        </tbody>
        <tfoot>
            <slot name="footer" />
        </tfoot>
    </table>
    <div
        v-else
        class="dataset">
        <slot name="header" />
        <ul>
            <li
                v-for="item in items"
                :key="item.id"
                class="item">
                <slot name="row" v-bind="item" />
            </li>
        </ul>
        <slot name="footer" />
    </div>
    <div class="pagination">
        <a 
            v-if="hasPrevPage"
            href="#"
            @click.prevent="prevPage">
            Prev
        </a>
        <a 
            v-if="hasNextPage"
            href="#"
            @click.prevent="nextPage">
            Next
        </a>
    </div>
</template>

<script>
import Query from 'candy-box/query/query.js';
import { Relation } from 'candy-box/repository/relation.js';

export default {
    props: {
        repository: {
            type: Object,
            required: true,
        },
        query: {
            type: Function,
            default: () => new Query(),
        },
        perPage: {
            type: Number,
            default: 30,
        },
        relations: {
            type: [String, Array, Function],
            default: null,
        },
        mode: {
            type: String,
            default: 'table',
        },
    },
    computed: {
        hasNextPage() {
            return this.page < this.count / this.perPage;
        },
        hasPrevPage() {
            return this.page > 1;
        },
    },
    data() {
        return {
            page: 1,
            count: 0,
            items: [],
        }
    },
    mounted() {
        this.refresh();
    },
    watch: {
        repository() {
            this.refresh();
        },
        query() {
            this.refresh();
        },
        perPage() {
            this.refresh();
        },
    },
    methods: {
        refresh(resetPage = true) {
            if (resetPage) {
                this.page = 1;
            }
            this.load();
            this.loadCount();
        },
        load() {
            let query = this.query();
            query
                .startFrom((this.page - 1) * this.perPage)
                .limitTo(this.perPage);
            this.repository.search(query).then((result) => {
                if (this.relations !== null) {
                    return Relation.resolve(result, this.relations).then(() => {
                        this.items = result.map((item) => Object.freeze(item));
                    });
                } else {
                    this.items = result.map((item) => Object.freeze(item));
                }
            }).catch((error) => {
                this.$store.dispatch('catchError', error);
            });
        },
        loadCount() {
            let query = this.query();
            this.repository.count(query).then((result) => {
                this.count = result;
            });
        },
        prevPage() {
            this.page--;
            this.load();
        },
        nextPage() {
            this.page++;
            this.load();
        },
    },
}
</script>