<template>
  <!-- {{ data }} -->
  <div class="row" v-if="data">
    <div class="col-6 right-border">
      <br>
      <div class="row">
        <div class="mb-3">
          <label for="rsocial" class="form-label">Nombre Proyecto</label>
          <textarea class="form-control form-control-sm"
            v-model="data.nombre_proyecto">{{ data.nombre_proyecto }}</textarea>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="mb-3">
            <label for="rsocial" class="form-label">Madurez del Proyecto</label>
            <select class="form-select form-select-sm" v-model="data.madurez" v-if="settings">
              <option v-for="s in settings.madurez_proyecto" :key="s">{{ s }}</option>
            </select>
          </div>
        </div>
        <div class="col-6">
          <div class="mb-3">
            <label for="rsocial" class="form-label">Fecha Limite</label>
            <input type="date" class="form-control form-control-sm" v-model="data.fecha_limite" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <fieldset disabled="">
            <label class="form-label" for="disabledInput">Actualizada</label>
            <input class="form-control form-control-sm" type="text" :placeholder="data.actualizada" disabled="">
          </fieldset>
        </div>
        <div class="col-6">
          <div class="mb-3">
            <label for="rsocial" class="form-label">Estado</label>
            <select class="form-select form-select-sm" v-model="data.estado" v-if="settings">
              <option v-for="s in settings.proyecto_estados" :key="s">{{ s }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="mb-3">
            <label class="form-label mt-4">Observaciones</label>
            <textarea class="form-control is-valid" v-model="data.observaciones">{{ data.observaciones }}</textarea>
          </div>
        </div>
      </div>

    </div>

    <div class="col-6">
      <br>
      <legend>
        Evaluaciones
        <button @click="$emit('runEval')" type="button" class="btn btn-sm btn-danger float-end">Run</button>
      </legend>
      <hr>
      <!-- <STable :data="dataEval" :columns="project_columns" :filters="filters"
        @rowClick="$emit('evalRowClick', $event)" /> -->
      
      <div style="height:500px;overflow-y:auto">
        <evalCard v-for="(t, i) in dataEval" :key="i" :data="t"/>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, inject } from 'vue' //watch
// import STable from '@/components/smart_table/smart_table.vue';
import evalCard from '@/components/eval/eval_card.vue';

export default {
  name: 'SGeneral',
  props: ['data', 'dataEval'],
  emits: ['rowClick'],
  components: { evalCard  }, //STable

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
      project_columns: ['nsubvencion'],
      linkClick,
      formattedDate
    }
  }
}
</script>