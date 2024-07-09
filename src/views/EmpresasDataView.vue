<template>
  <div>
    <ModalF ref="modal_evalua" title="Evaluacion" @evalRun="evalRun" @saveEval="saveEval" />
    <div class="row">
      <VHead :data="header_data" ref="vhead" @new="newreg" @save="saveData" @del="delData" />
      <div class="col-12">
        <img v-show="waiting" src="@/assets/img/loading.gif" class="floating_gif" />
        <LTabs :data="data" :tabs="tabs" :dataEval="dataEval" @selTab="selTab" @evalTab="evalmodal" @newPrj="newPrj"
          @evalRowClick="evalRowClick" />
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
  name: 'EmpresasDataView',
  components: { VHead, LTabs, ModalF },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const data = ref([])
    const dataEval = ref({})
    const tabs = ref([])
    const idEmp = ref(0)
    const selectedTab = ref(0)
    const vhead = ref(null)

    const renderTabs = () => {
      tabs.value = [{ 'header': 'general', 'tipo': 'egeneral', 'fields': [] }]
      tabs.value.push({ 'header': 'descripcion', 'tipo': 'edescrip', 'fields': [] })
      tabs.value.push({ 'header': 'contacto', 'tipo': 'econtact', 'fields': [] })
    }

    const queryData = async () => {
      await axios.get('/empresas/' + idEmp.value)
        .then((response) => {
          //console.log(response.data)
          data.value = response.data
          renderTabs()
          queryProjectsData()
        })
        .catch((error) => {
          vhead.value.showaviso(1, error)
        })
    };

    const queryProjectsData = async () => {
      await axios.get('/projectsemp/' + idEmp.value)
        .then((response) => {
          //console.log(response.data)
          dataEval.value = response.data
        })
        .catch((error) => {
          vhead.value.showaviso(1, error)
        })
    };

    const evalRowClick = (row) => {
      router.push({
        name: 'pdata',
        query: { id: dataEval.value[row.pos].id }
      })
    }

    const saveData = async () => {
      //const method = id.value == '0' ? 'createlicita' : 'updatelicita'
      data.value.actualizada = new Date()

      if (data.value.nombre != '') {
        if (idEmp.value == '0') {

          await axios.post('/empresas/',
            JSON.stringify(data.value),
            { headers: { 'Content-Type': 'application/json' } }
          )
            .then(() => {
              router.push('/eview')
            })
            .catch((error) => {
              vhead.value.showaviso(1, error)
            })
        } else {
          await axios.put('/empresas/' + idEmp.value,
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
      await axios.delete('/empresas/' + idEmp.value)
        .then(() => {
          //console.log(response.data)
          router.push('/eview')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const newPrj = () => {
      router.push({ path: '/pdata', query: { id: 0, empid: idEmp.value } })
    }

    onMounted(() => {
      const p = route.query
      if (Object.prototype.hasOwnProperty.call(p, 'id')) {
        idEmp.value = p.id
        queryData()
      }
    })

    return {
      header_data: { title: "Empresa", icon: "bi-briefcase", btn: ['save', 'del'] },
      data,
      dataEval,
      tabs,
      selectedTab,
      vhead,
      queryData,
      renderTabs,
      saveData,
      delData,
      newPrj,
      evalRowClick
    }

  },
}
</script>
