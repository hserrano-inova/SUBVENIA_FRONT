<template>
<div class="card border-primary mb-6 shadow" style="margin: 20px;">
  <div class="card-header">{{ data['nsub'] }}</div>
  <div class="card-body">
    <div  v-for="(k,i) in Object.keys(data['response'])" :key="k">
      <h5 :class="['card-title',data['response'][k]['respuesta']?'text-success':'text-danger']">{{k}}</h5>
      <p :class="['card-text',data['response'][k]['respuesta']?'text-success':'text-danger']">{{data['response'][k]['argumento']}}</p>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'evalCard',
  props: ['data'],
  setup() {
    
  },
}
</script>
