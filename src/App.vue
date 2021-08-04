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
                    <div class="row">
                      <div class="col-md">
                        {{ prefix }}
                      </div>
                      <div class="col-md text-end">
                        <button
                          class="btn btn-info"
                          @click="deletePrefix(prefix)"
                        >
                          <span class="fa fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type the prefix"
                    v-model="prefix"
                    @keyup.enter="addPrefix(prefix)"
                  />
                  <div class="input-group-text bg-info p-0">
                    <button class="btn" @click="addPrefix(prefix)">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
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
                    v-for="suffix in suffixes"
                    :key="suffix"
                  >
                    <div class="row">
                      <div class="col-md">
                        {{ suffix }}
                      </div>
                      <div class="col-md text-end">
                        <button
                          class="btn btn-info"
                          @click="deleteSuffix(suffix)"
                        >
                          <span class="fa fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
                <br />
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type the suffix"
                    v-model="suffix"
                    @keyup.enter="addSuffix(suffix)"
                  />
                  <div class="input-group-text bg-info p-0">
                    <button class="btn" @click="addSuffix(suffix)">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
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
      prefix: "",
      suffix: "",
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
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
      this.prefix = "";
      this.generate();
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
      this.generate();
    },
    addSuffix(suffix) {
      this.suffixes.push(suffix);
      this.suffix = "";
      this.generate();
    },
    deleteSuffix(suffix) {
      this.suffixes.splice(this.suffixes.indexOf(suffix), 1);
      this.generate();
    },

    generate() {
      this.domains = [];
      for (const prefix of this.prefixes) {
        for (const suffix of this.suffixes) {
          this.domains.push(prefix + suffix);
        }
      }
    },
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
