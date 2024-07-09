<template>
  <div class="row">
    <div class="col 8 right-border">
      <legend>Descripcion empresa</legend>
      <textarea v-model="data['descripcion']" rows="30" class="form-control is-valid"></textarea>
    </div>
    <div class="col 4">
      <legend>Observaciones</legend>
      <textarea v-model="data['observaciones']" rows="10" class="form-control is-valid"></textarea>
      <legend>Tags</legend>
      <textarea v-model="data['tags']" rows="5" class="form-control is-valid"></textarea>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SeccionTab',
  props: ['data', 'row'],

  setup() {

    return {
    }
  }
}
</script>