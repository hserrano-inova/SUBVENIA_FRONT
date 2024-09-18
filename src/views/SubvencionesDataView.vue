<template>
  <div>
    <ModalF ref="modal_fechas" title="Fechas" @new="new_fecha" @del="del_fecha" />

    <div class="row">
      <VHead :data="header_data" ref="vhead" @new="newreg" @save="saveData" @del="delData" />
      <div class="col-12">
        <img v-show="waiting" src="@/assets/img/loading.gif" class="floating_gif" />
        <LTabs :data="data" :tabs="tabs" :dataEval="dataEval" :secciones="[['beneficiarios', 'objetivo', 'inversion_inovacion', 'conceptos_financiables', 'consorcio'],[false, false, false, false, false]]" @selTab="selTab" @rowClick="rowClick" />
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from '@/authreq/axios';
import VHead from '@/components/navbar/viewheader.vue'
import LTabs from '@/components/tabs/tabcontrol.vue'
import ModalF from '@/components/modals/modal_fechas.vue'

export default {
  name: 'SubvencionesDataView',
  components: { VHead, LTabs, ModalF },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const data = ref([])
    const dataEval = ref({})
    const tabs = ref([])
    const idSub = ref(0)
    const selectedTab = ref(0)
    const vhead = ref(null)
    const modal_fechas = ref(null)

    const renderTabs = () => {
      tabs.value = [{ 'header': 'general', 'tipo': 'sgeneral', 'fields': [] }]
      tabs.value.push({ 'header': 'beneficiarios', 'tipo': 'seccion', 'fields': [] })
      tabs.value.push({ 'header': 'objetivo', 'tipo': 'seccion', 'fields': [] })
      tabs.value.push({ 'header': 'inovacion', 'tipo': 'seccion', 'fields': [] })
      tabs.value.push({ 'header': 'conceptos_financiables', 'tipo': 'seccion', 'fields': [] })
      tabs.value.push({ 'header': 'consorcio', 'tipo': 'seccion', 'fields': [] })
    }

    const queryData = async () => {
      await axios.get('/subvenciones/' + idSub.value)
        .then((response) => {
          //console.log(response.data)
          data.value = response.data
          renderTabs()
        })
        .catch((error) => {
          vhead.value.showaviso(1, error)
        })
    };

    const saveData = async () => {
      //const method = id.value == '0' ? 'createlicita' : 'updatelicita'
      data.value.actualizada = new Date()

      if (data.value.nombre != '') {
        if (idSub.value == '0') {

          await axios.post('/subvenciones/',
            JSON.stringify(data.value),
            { headers: { 'Content-Type': 'application/json' } }
          )
            .then(() => {
              router.push('/sview')
            })
            .catch((error) => {
              vhead.value.showaviso(1, error)
            })
        } else {
          await axios.put('/subvenciones/' + idSub.value,
            JSON.stringify(data.value),
            { headers: { 'Content-Type': 'application/json' } }
          )
            .then(() => {
              queryData()
              vhead.value.showaviso(0, "OK")
            })
            .catch((error) => {
              vhead.value.showaviso(1, error)
            })
        }
      } else {
        vhead.value.showaviso(1, "Falta el nombre de la licitación")
      }
    }

    const delData = async () => {
      await axios.delete('/subvenciones/' + idSub.value)
        .then(() => {
          //console.log(response.data)
          router.push('/sview')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const rowClick = (row) => {
      modal_fechas.value.showModal(row)
    }

    const new_fecha = () => {
      data.value.fechas.push(
        { 'nfase': '', 'estado': 0, 'fecha': '' }
      )
      const loc = data.value.fechas
      modal_fechas.value.showModal({ row: loc[loc.length - 1], pos: loc.length })
    }
    const del_fecha = (idx) => {
      const loc = data.value.fechas
      if (loc.length > 1) {
        loc.splice(idx, 1)
      }
      modal_fechas.value.closeModal()
    }

    onMounted(() => {
      const p = route.query
      if (Object.prototype.hasOwnProperty.call(p, 'id')) {
        idSub.value = p.id
        queryData()
      }
    })

    return {
      header_data: { title: "Subvencion", icon: "bi-bank", btn: ['save', 'del'] },
      data,
      dataEval,
      tabs,
      selectedTab,
      vhead,
      modal_fechas,
      queryData,
      renderTabs,
      saveData,
      delData,
      rowClick,
      new_fecha,
      del_fecha
    }

  },
}
</script>
