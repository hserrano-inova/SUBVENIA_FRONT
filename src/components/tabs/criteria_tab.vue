<template>
  <div>
    <br />
    <div class="row">
      <div class="col-12">
        <label class="form-label">Criterio</label>
        <textarea v-model="data[secciones[0][row]]['criterio']" rows="10" class="form-control is-valid"></textarea>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SeccionTab',
  props: ['data', 'row','secciones'],

  setup() {

    return {
  
    }
  }
}
</script>