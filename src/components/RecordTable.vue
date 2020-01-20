<template>
  <table>
    <thead>
      <tr>
        <th>Artist</th>
        <th>Album</th>
        <th>Label</th>
        <th>Genre</th>
        <th>Release Date</th>
        <th>Discogs</th>
      </tr>
    </thead>
    <tr v-for="record in recordCollection" :key=record.album>
      <td data-column="Artist">{{ record.artist }}</td>
      <td data-column="Album">{{ record.album }}</td>
      <td data-column="Label">{{ record.label }}</td>
      <td data-column="Genre">{{ record.genre }}</td>
      <td data-column="Release Date">{{ record.release }}</td>
      <td data-column="Discogs">
        <a :href="'https://www.discogs.com/release/' + record.id">
          {{ record.id }}
        </a>
      </td>
    </tr>
  </table>
</template>

<script>
import { RECORDCOLLECTION } from '../data/recordCollection';

export default {
  data() {
    return {
      recordCollection: RECORDCOLLECTION,
    };
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 50px auto;
}

/* Zebra striping */
tr:nth-of-type(odd) {
  background: #eee;
}

th {
  background: #ccc;
  color: #000;
  font-weight: bold;

}

td, th {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
  font-size: 18px;

}

@media
only screen and (max-width: 760px),
(min-device-width: 768px) and (max-device-width: 1024px)  {
  table {
    width: 100%;
  }

  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr { border: 1px solid #ccc;  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;

  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-column);
    color: #000;
    font-weight: bold;
  }
}
</style>
