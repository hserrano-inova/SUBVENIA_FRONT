<template>
  <div :class="['modal fade show', { 'modal-win-open': show }]" v-if="data">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLiveLabel">{{ title }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="rsocial" class="form-label">Descripcion Fase</label>
                <input type="text" class="form-control form-control-sm" v-model="data.row.nfase" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="mb-3">
                <label for="rsocial" class="form-label">Estado</label>
                <select class="form-select form-select-sm" v-model="data.row.estado" v-if="settings">
                  <option v-for="s in settings.licita_estados" :key="s" :value="s" >{{ s }}</option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="mb-3">
                <label for="rsocial" class="form-label">Fecha</label>
                {{ data.row.fecha }}
                <input type="date" class="form-control form-control-sm" v-model="data.row.fecha" />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label class="form-label mt-4" >Observaciones</label>
                <textarea  class="form-control is-valid" v-model="data.row.observaciones">{{ data.row.observaciones }}</textarea>
              </div>
            </div>
          </div>

        </div>


        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-primary" @click="$emit('new', data.pos)">New</button>
          <button type="button" class="btn btn-sm btn-danger" @click="confirmDel">Del</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { ref } from 'vue'
import { inject } from 'vue'
export default {
  name: 'ModalControl',
  props: ['title'],
  setup() {
    const settings = inject('settings');
    return { settings };
  },
  data() {
    return {
      show: false,
      data: null
    }
  },
  methods: {
    closeModal() {
      this.show = false
    },
    showModal(data) {
      this.data = data
      this.show = true
    },
    confirmDel() {
      if (confirm('Estas segur@?')) {
        if (confirm('Se va a proceder a eliminar este registro')) {
          this.$emit('del', this.data.pos)
        }
      }
    }
  }
}
</script>