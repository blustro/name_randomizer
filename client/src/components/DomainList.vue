<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <AppItemList
              title="Prefixes"
              :items="prefixes"
              @addItem="addPrefix"
              @deleteItem="deletePrefix"
            ></AppItemList>
          </div>
          <div class="col-md">
            <AppItemList
              title="Suffixes"
              :items="suffixes"
              @addItem="addSuffix"
              @deleteItem="deleteSuffix"
            ></AppItemList>
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
                :key="domain.name"
              >
                <div class="row">
                  <div class="col-md">
                    {{ domain.name }}
                  </div>
                  <div class="col-md text-end">
                    <a
                      class="btn btn-info"
                      :href="domain.checkout"
                      target="blank"
                    >
                      <span class="fa fa-shopping-cart"></span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AppItemList from "./AppItemList.vue";

export default {
  name: "App",
  data: () => {
    return {
      prefixes: [],
      suffixes: [],
    };
  },
  components: {
    AppItemList,
  },
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
    },
    addSuffix(suffix) {
      this.suffixes.push(suffix);
    },
    deleteSuffix(suffix) {
      this.suffixes.splice(this.suffixes.indexOf(suffix), 1);
    },
  },
  computed: {
    domains() {
      console.log("generating domains...");
      const domains = [];
      for (const prefix of this.prefixes) {
        for (const suffix of this.suffixes) {
          const name = prefix + suffix;
          const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.site`;
          domains.push({ name, checkout });
        }
      }
      return domains;
    },
  },

  created() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query: `
          {
            prefixes: items (type: "prefix") {
              id
              type
              description
            }
            suffixes: items (type: "suffix") {
              description
            }
            
          }
        `,
      },
    }).then((response) => {
      const query = response.data;
      this.prefixes = query.data.prefixes.map((prefix) => prefix.description);
      this.suffixes = query.data.suffixes.map((suffix) => suffix.description);
    });
  },
};
</script>

<style></style>
