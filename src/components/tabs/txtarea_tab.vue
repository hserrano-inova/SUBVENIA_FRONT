<template>
  <div>
    <br />
    <div class="row">
      <div class="col-12">
        <label class="form-label">Criterio</label>
        <textarea rows="10" class="form-control is-valid">A</textarea>
      </div>
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