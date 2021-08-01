<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead class="primary-bg-color text-info">
        <tr>
          <template v-if="headers.length">
            <th v-for="header in headers" scope="col" :key="header">
              {{ header }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-if="rows.length">
          <slot name="table-rows" :rows="rows"></slot>
        </template>
        <template v-else>
          <slot name="no-data"></slot>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Tabular",
  props: {
    headers: {
      required: true,
      type: Array,
      default: () => [],
    },
    rows: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped></style>
