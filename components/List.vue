<template>
    <table class="portal-list">
        <thead>
            <tr>
                <th v-for="column in columns"
                    :key="column.name"
                    v-bind:class="column.hide ? 'portal-td-hide' : ''"
                    v-on:click="sortTable(column.name)">
                    {{ column.name }}
                    <span class="portal-icon material-icons-outlined"
                        v-if="sortColumn === column.name && ascending">
                        arrow_drop_up
                    </span>
                    <span class="portal-icon material-icons-outlined"
                        v-if="sortColumn === column.name && !ascending">
                        arrow_drop_down
                    </span>
                </th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'List',
    props: {
        'columns': Array,
        'rows': Array
    },
    data() {
        var ascending = false;
        var sortColumn = '';

        return { ascending, sortColumn }
    },
    methods: {
        sortTable: function(column) {
            if (this.sortColumn === column) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = column;
            }

            var ascending = this.ascending;
            var sortIndex = column.toLowerCase();

            this.rows.sort(function(a, b) {
                if (a[sortIndex] > b[sortIndex]) {
                    return ascending ? 1 : -1;
                } else if (a[sortIndex] < b[sortIndex]) {
                    return ascending ? -1 : 1;
                }
                return 0;
            });
        }
    }
}
</script>

<style>
.portal-list th:hover {
    background: #EEEEEE;
}
</style>
