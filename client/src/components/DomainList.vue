<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <AppItemList
              title="Prefixes"
              type="prefix"
              :items="items.prefix"
              @addItem="addItem"
              @deleteItem="deleteItem"
            ></AppItemList>
          </div>
          <div class="col-md">
            <AppItemList
              title="Suffixes"
              type="suffix"
              :items="items.suffix"
              @addItem="addItem"
              @deleteItem="deleteItem"
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
                  <div class="col-md-6">
                    {{ domain.name }}
                  </div>
                  <div class="col-md-3">
                    <span
                      class="badge"
                      :class="[domain.available ? 'bg-success' : 'bg-danger']"
                      >{{
                        domain.available ? "Available" : "Unavailable"
                      }}</span
                    >
                  </div>
                  <div class="col-md-3 text-end">
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
      items: {
        prefix: [],
        suffix: [],
      },
      domains: [],
    };
  },
  components: {
    AppItemList,
  },
  methods: {
    addItem(item) {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
            mutation ($item: ItemInput) {
              newItem: saveItem(item: $item) {
                id
                type
                description
              }
            }
        `,
          variables: { item },
        },
      }).then((response) => {
        const query = response.data;
        const newItem = query.data.newItem;
        this.items[item.type].push(newItem);
        this.generateDomains();
      });
    },
    deleteItem(item) {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
            mutation ($id: Int) {
              deleted: deleteItem(id: $id)
            }
          `,
          variables: {
            id: item.id,
          },
        },
      }).then(() => {
        this.items[item.type].splice(this.items[item.type].indexOf(item), 1);
        this.generateDomains();
      });
    },

    getItems(type) {
      return axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
            query ($type: String){
              items: items (type: $type) {
                id
                type
                description
              }
            }
        `,
          variables: {
            type,
          },
        },
      }).then((response) => {
        const query = response.data;
        this.items[type] = query.data.items;
      });
    },
    generateDomains() {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
            mutation {
              domains: generateDomains {
                name
                checkout
                available
              }
            }
          `,
        },
      }).then((response) => {
        const query = response.data;
        this.domains = query.data.domains;
      });
    },
  },

  created() {
    Promise.all([this.getItems("prefix"), this.getItems("suffix")]).then(() => {
      this.generateDomains();
    });
  },
};
</script>
