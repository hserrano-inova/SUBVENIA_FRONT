<template>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation" v-for="t, i in tabs" :key="i">
      <a :class="['nav-link', { 'active': i == 0 }]" data-bs-toggle="tab" :href="'#' + t.header" aria-selected="false"
        role="tab" tabindex="-1" @click.prevent="$emit('selTab', i - 1)">
        {{ t.header.toUpperCase() }}
        <span :class="['badge', { 'bg-light': i > 0, 'bg-warning': i == 0 }]">{{ t.badge }}</span>
      </a>
    </li>
  </ul>
  <div id="myTabContent" class="tab-content">
    <div v-for="t, i in tabs" :key="i" :class="['tab-pane fade', { 'show active': i == 0 }]" :id="t.header"
      role="tabpanel">
      <!-- ------------------EMPRESA------------------ -->
      <div v-if="t.tipo == 'egeneral'">
        <EmpGeneral :data="data" :dataEval="dataEval" :row="i" @newPrj="$emit('newPrj')"
          @evalRowClick="$emit('evalRowClick', $event)" />
      </div>
      <div v-if="t.tipo == 'edescrip'">
        <EmpDescrip :data="data" :row="i" @evalTab="$emit('evalTab', $event)" />
      </div>
      <div v-if="t.tipo == 'econtact'">
        <EmpContact :data="data" :row="i" @evalTab="$emit('evalTab', $event)" />
      </div>
      <!-- ------------------CRITERIA------------------ -->
      <div v-if="t.tipo == 'criteria'">
        <CriteriaTab :data="data" :row="i" @evalTab="$emit('evalTab', $event)" />
      </div>
      <!-- ------------------SUBV------------------ -->
      <div v-if="t.tipo == 'seccion'">
        <SeccionTab :data="data" :row="i - 1" @evalTab="$emit('evalTab', $event)" />
      </div>
      <div v-if="t.tipo == 'sgeneral'">
        <SubvGeneral :data="data" :dataEval="dataEval" @rowClick="$emit('rowClick', $event)"
          @evalRowClick="$emit('evalRowClick', $event)" />
      </div>
      <div v-if="t.tipo == 'pgeneral'">
        <ProjectGeneral :data="data" :dataEval="dataEval" @rowClick="$emit('rowClick', $event)"
          @evalRowClick="$emit('evalRowClick', $event)" />
      </div>
    </div>
  </div>

</template>

<script>
// import TxtAreaTab from '@/components/tabs/txtarea_tab.vue'
import CriteriaTab from '@/components/tabs/criteria_tab.vue'
import SeccionTab from '@/components/tabs/seccion_tab.vue'
import SubvGeneral from '@/components/tabs/subvgeneral_tab.vue'

import ProjectGeneral from '@/components/tabs/projectgeneral_tab.vue'

import EmpGeneral from '@/components/tabs/empresa/empgeneral_tab.vue'
import EmpDescrip from '@/components/tabs/empresa/edescrip_tab.vue'
import EmpContact from '@/components/tabs/empresa/econtact_tab.vue'


export default {
  name: 'LTabs',
  props: ['data', 'tabs', 'dataEval'],
  components: { CriteriaTab, SeccionTab, SubvGeneral, ProjectGeneral, EmpGeneral, EmpDescrip, EmpContact },
}
</script>

<style scoped>
textarea {
  width: 100%;
}
</style>