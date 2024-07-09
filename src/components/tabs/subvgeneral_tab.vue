<template>
  <div class="row" v-if="data">
    <div class="col-6 right-border">
      <legend>Promotor</legend>

      <div class="row">
        <div class="col-6">
          <div class="mb-3">
            <label for="rsocial" class="form-label">Estado Subvencion</label>
            <select class="form-select form-select-sm" v-model="data.estado" v-if="settings">
              <option v-for="s in settings.licita_estados" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
        </div>
        <div class="col-6">
          <fieldset disabled="">
            <label class="form-label" for="disabledInput">Actualizada</label>
            <input class="form-control form-control-sm" type="text" :placeholder="data.actualizada" disabled="">
          </fieldset>
        </div>
      </div>

      <div class="mb-3">
        <label for="rsocial" class="form-label">Nombre Subvencion</label>
        <textarea class="form-control form-control-sm" v-model="data.nsubvencion"></textarea>
      </div>
      <div class="mb-3">
        <label for="rsocial" class="form-label">Organismo Promotor</label>
        <textarea class="form-control form-control-sm" v-model="data.organismo"></textarea>
      </div>

      <div class="mb-3">
        <label for="rsocial" class="form-label">Fechas</label>
        <STable :data="data.fechas" :columns="columns_fechas" :filters="[]" @rowClick="$emit('rowClick', $event)" />
      </div>

    </div>

    <div class="col-6">
      <legend>Economico</legend>
      <div class="row">
        <div class="col-4">
          <div class="mb-3">
            <label for="rsocial" class="form-label">Minimis</label>
            <input type="text" class="form-control form-control-sm" v-model="data.minimis" />
          </div>
        </div>
        <div class="col-4">
          <div class="mb-3">
            <label for="rsocial" class="form-label">Presup. Min</label>
            <input type="text" class="form-control form-control-sm" v-model="data.presupuesto_minimo" />
          </div>
        </div>
        <div class="col-4">
          <div class="mb-3">
            <label for="rsocial" class="form-label">Presup. Max</label>
            <input type="text" class="form-control form-control-sm" v-model="data.presupuesto_maximo" />
          </div>
        </div>
      </div>

      <legend>Varios</legend>
      <div class="row">
        <div class="col-12">

          <div class="input-group mb-3">
            <span class="input-group-text" @click="linkClick">Link</span>
            <input type="text" class="form-control form-control-sm" :value="data.enlace">
          </div>

        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="mb-3">
            <label class="form-label mt-4">Observaciones</label>
            <textarea rows=5 class="form-control is-valid" v-model="data.observaciones"></textarea>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, inject } from 'vue' //watch
import STable from '@/components/smart_table/smart_table.vue';

export default {
  name: 'SGeneral',
  props: ['data',],
  emits: ['rowClick'],
  components: { STable },
  setup(props, { emit }) {
    const settings = inject('settings');

    const formattedDate = (dateStr) => {
      const dateObj = new Date(dateStr);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const linkClick = () => {
      window.open("", '_blank');
    }
    // watch(
    //   () => props.data,
    //   (newValue, oldValue) => {
    //     console.log('Data changed from', oldValue, 'to', newValue);
    //     // Perform any other logic when props.data changes
    //   }
    // );

    return {
      settings,
      columns_fechas: ['nfase', 'estado', 'fecha'],
      linkClick,
      formattedDate
    }
  }
}
</script>