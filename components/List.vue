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

<script setup>
import { ref } from 'vue';

const props = defineProps(['columns', 'rows']);

const ascending = ref(false);
const sortColumn = ref('');

function sortTable(column) {
    if (this.sortColumn === column) {
        this.ascending = !this.ascending;
    } else {
        this.ascending = true;
        this.sortColumn = column;
    }

    var ascending = this.ascending;
    var sortIndex = column.toLowerCase();

    props.rows.sort(function(a, b) {
        if (a[sortIndex] > b[sortIndex]) {
            return ascending ? 1 : -1;
        } else if (a[sortIndex] < b[sortIndex]) {
            return ascending ? -1 : 1;
        }
        return 0;
    });
}
</script>

<style>
.portal-list th:hover {
    background: #EEEEEE;
}
</style>
