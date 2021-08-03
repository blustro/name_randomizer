<template>
  <div>
    <div id="slogan" class="text-center">
      <h1>NameGator</h1>
      <br />
      <h6 class="text-secondary">
        Name Generator with Vue.js, GraphQL and Node
      </h6>
    </div>

    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <h5>
              Prefixes
              <span class="badge bg-secondary">{{ prefixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="prefix in prefixes"
                    :key="prefix"
                  >
                    {{ prefix }}
                  </li>
                </ul>
                <br />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type the prefix"
                />
              </div>
            </div>
          </div>
          <div class="col-md">
            <h5>
              Suffixes
              <span class="badge bg-secondary">{{ suffixes.length }}</span>
            </h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="sufix in suffixes"
                    :key="sufix"
                  >
                    {{ sufix }}
                  </li>
                </ul>
                <br />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type the sufix"
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <h5>
          Domains <span class="badge bg-secondary">{{ domains.length }}</span>
        </h5>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="domain in domains"
                :key="domain"
              >
                {{ domain }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

export default {
  name: "App",
  data: () => {
    return {
      prefixes: ["Air", "Jet", "Flight"],
      suffixes: ["Hub", "Station", "Mart"],
      domains: [
        "AirHub",
        "AirStation",
        "AirMart",
        "JetHub",
        "JetStation",
        "JetMart",
        "FlightHub",
        "FlightStation",
        "FlightMart",
      ],
    };
  },
};
</script>

<style>
#slogan {
  margin: 30px 0;
}
#main {
  background-color: #f1f1f1;
  padding: 30px 0;
}
</style>
