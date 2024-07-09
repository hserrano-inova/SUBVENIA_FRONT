<template>
  <div>
    <br />
    <div class="row ">
      <div class="col-6 right-border ">
        <fieldset>
          <legend>General</legend>
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="rsocial" class="form-label">Razon Social</label>
                <input type="text" class="form-control form-control-sm" v-model="data.rsocial">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="mb-3">
                <label for="cif" class="form-label">CIF</label>
                <input type="text" class="form-control form-control-sm" v-model="data.cif">
              </div>
            </div>
            <div class="col-8">
              <div class="mb-3">
                <label for="acronimo" class="form-label">Acronimo</label>
                <input type="text" class="form-control form-control-sm" v-model="data.acronimo">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4">
              <div class="mb-3">
                <label for="tipo" class="form-label">Tipo Empresa</label>
                <select class="form-select form-select-sm" v-model="data.tipo" v-if="settings">
                  <option v-for="s in settings.tipo_empresa" :key="s">{{ s }}</option>
                </select>
              </div>
            </div>
            <div class="col-4">
              <div class="mb-3">
                <label for="sector" class="form-label">Sector</label>
                <input type="text" class="form-control form-control-sm" v-model="data.sector">
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <label for="nempleados" class="form-label">Empleados</label>
                <input type="number" class="form-control form-control-sm" v-model="data.nempleados">
              </div>
            </div>

            <div class="col-2">
              <div class="form-check" style="margin-top: 30px;">
                <input class="form-check-input" type="checkbox" :checked="data.pyme">
                <label class="form-check-label" for="flexCheckChecked">Es PYME?</label>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-2">
              <div class="mb-3">
                <label for="cnae-grupo" class="form-label">CNAE Grp</label>
                <select class="form-select form-select-sm" v-model="data.cnae_grupo">
                  <option>A</option>
                </select>
              </div>
            </div>
            <div class="col-2">
              <div class="mb-3">
                <label for="cnae-grupo" class="form-label">CNAE Cod.</label>
                <input type="text" class="form-control form-control-sm" v-model="data.cnae_cod">
              </div>
            </div>
            <div class="col-4">
              <div class="mb-3">
                <label for="facturacion" class="form-label">Facturacion</label>
                <input type="number" class="form-control form-control-sm" v-model="data.facturacion">
              </div>
            </div>
            <div class="col-4">
              <div class="mb-3">
                <label for="minimis" class="form-label">Minimis</label>
                <input type="number" class="form-control form-control-sm" v-model="data.minimis">
              </div>
            </div>
          </div>



        </fieldset>
      </div>
      <div class="col-6">
        <legend>
          Proyectos
          <button @click="$emit('newPrj')" type="button" class="btn btn-sm btn-primary float-end">New</button>
        </legend>
        <hr>
        <STable :data="dataEval" :columns="project_columns" :filters="filters"
          @rowClick="$emit('evalRowClick', $event)" />
      </div>
    </div>
  </div>

</template>

<script>
import { ref, inject } from 'vue' //watch
import STable from '@/components/smart_table/smart_table.vue';

export default {
  name: 'EGeneral',
  props: ['data', 'dataEval'],
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
      project_columns: ['nombre_proyecto', 'fecha_limite', 'madurez'],
      linkClick,
      formattedDate
    }
  }
}
</script>