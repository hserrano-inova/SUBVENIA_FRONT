<template>
  <div>
    <br />
    <div class="row">
      <div class="col-12">
        <label class="form-label">
          Descripcion 
          <button v-if="secciones[1][row]" style="margin-left:30px;" class="btn btn-success btn-sm" @click="$emit('autoGen',secciones[0][row])">Asistente</button>
        </label>
        <textarea v-model="data[secciones[0][row]]['descripcion']" rows="10" class="form-control is-valid"></textarea>
      </div>
    </div>
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
  props: ['data', 'row', 'secciones'],
  emits: ['autoGen'],

  setup() {

    return {
    }
  }
}
</script>