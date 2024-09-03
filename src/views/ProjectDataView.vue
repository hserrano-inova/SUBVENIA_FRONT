<template>
  <div>
    <ModalF ref="modal_evalua" title="Evaluacion" @evalRun="evalRun" @saveEval="saveEval" />
    <div class="row">
      <VHead :data="header_data" ref="vhead" @new="newreg" @save="saveData" @del="delData" />
      <div class="col-12">
        <img v-show="waiting" src="@/assets/img/loading.gif" class="floating_gif" />
        <LTabs :data="data" :tabs="tabs" :dataEval="dataEval" 
        :secciones="[['beneficiarios', 'objetivo', 'inversion_inovacion', 'conceptos_financiables', 'consorcio'],[false, true, false, false, false]]" 
        @selTab="selTab" @runEval="runEval" @autoGen="autoGen" />
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
    const empid = ref(0)


    const renderTabs = () => {
      tabs.value = [{ 'header': 'general', 'tipo': 'pgeneral', 'fields': [] }]
      tabs.value.push({ 'header': 'beneficiarios', 'tipo': 'seccion', 'fields': [] })
      tabs.value.push({ 'header': 'objetivo', 'tipo': 'seccion', 'fields': [] })
      tabs.value.push({ 'header': 'inovacion', 'tipo': 'seccion', 'fields': [] })
      tabs.value.push({ 'header': 'conceptos_financiables', 'tipo': 'seccion', 'fields': [] })
      tabs.value.push({ 'header': 'consorcio', 'tipo': 'seccion', 'fields': [] })
    }


    const queryData = async () => {
      await axios.get('/projects/' + idSub.value)
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
          data.value['id_empresa'] = empid.value
          await axios.post('/projects/',
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
          await axios.put('/projects/' + idSub.value,
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
      await axios.delete('/projects/' + idSub.value)
        .then(() => {
          //console.log(response.data)
          router.push('/eview')
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const runEval = () => {
      alert('rueval')
    }

    const autoGen = async(sel_option) =>{
      await axios.post('/autogen/',
        JSON.stringify({
          "source":"projects", 
          "option":sel_option,
          "prompt":data.value[sel_option]['descripcion']
      }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        data.value[sel_option]['descripcion'] = response.data
      })
      .catch((error) => {
        vhead.value.showaviso(1, error)
      })
    }

    onMounted(() => {
      const p = route.query
      if (Object.prototype.hasOwnProperty.call(p, 'empid')) {
        empid.value = p.empid
      }
      if (Object.prototype.hasOwnProperty.call(p, 'id')) {
        idSub.value = p.id
        queryData()
      }
    })

    return {
      header_data: { title: "Proyecto", icon: "bi-wrench", btn: ['save', 'del'] },
      data,
      dataEval,
      tabs,
      selectedTab,
      empid,
      vhead,
      queryData,
      renderTabs,
      saveData,
      delData,
      runEval,
      autoGen
    }

  },
}
</script>
