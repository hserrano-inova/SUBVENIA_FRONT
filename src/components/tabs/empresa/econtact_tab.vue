<template>
  <div>
    <br />
    <div class="row">
      <div class="col-4">
        <div class="card mb-3">
          <h3 class="card-header">Card header</h3>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <h6 class="card-subtitle text-muted">Support card subtitle</h6>
          </div>

          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
          <div class="card-footer text-muted">
            2 days ago
          </div>
        </div>
      </div>
      <div class="col-4 right-border"></div>
      <!-- --------------------------TEMPLATE---------------------- -->
      <div class="col-4">
        <div class="card mb-3">
          <h3 class="card-header">Card header</h3>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <h6 class="card-subtitle text-muted">Support card subtitle</h6>
          </div>

          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
          <div class="card-footer text-muted">
            2 days ago
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'SeccionTab',
  props: ['data', 'row'],

  setup() {

    return {
    }
  }
}
</script>