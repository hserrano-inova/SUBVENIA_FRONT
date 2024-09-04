<template>
  <div>
    <VHead :data="header_data" ref="vhead" @new="newreg" @save="saveData" @del="delData" />
    <div class="row">
      <LTabs :data="data" :tabs="tabs" :secciones="[['beneficiarios', 'objetivo', 'inversion_inovacion', 'conceptos_financiables', 'consorcio'],[false, false, false, false, false]]" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from '@/authreq/axios'
import VHead from '@/components/navbar/viewheader.vue'
import LTabs from '@/components/tabs/tabcontrol.vue'

export default {
  name: 'CriteriosGeneralesView',
  components: { VHead, LTabs },
  setup() {
    const data = ref([])
    const vhead = ref(null)
    const tabs = ref([])

    const renderTabs = () => {
      tabs.value.push({ 'header': 'beneficiarios', 'tipo': 'criteria', 'fields': [] })
      tabs.value.push({ 'header': 'objetivo', 'tipo': 'criteria', 'fields': [] })
      tabs.value.push({ 'header': 'inovacion', 'tipo': 'criteria', 'fields': [] })
      tabs.value.push({ 'header': 'conceptos_financiables', 'tipo': 'criteria', 'fields': [] })
      tabs.value.push({ 'header': 'consorcio', 'tipo': 'criteria', 'fields': [] })
    }

    const queryData = async () => {
      await axios.get('/criterios/')
        .then((response) => {
          //console.log(response.data)
          data.value = response.data
          tabs.value = []
          renderTabs()
        })
        .catch((error) => {
          vhead.value.showaviso(1, error)
        })
    };

    const saveData = async () => {
      await axios.post('/criterios/',
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

    };

    onMounted(() => {
      queryData()
    })

    return {
      header_data: { title: "Criterios Generales", icon: "bi-file-earmark-binary", btn: ['save'] },
      data,
      vhead,
      tabs,
      saveData,
      queryData,
    }
  }
}
</script>