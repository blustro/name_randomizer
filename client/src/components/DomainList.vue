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

                    <button
                      class="btn btn-info ms-3"
                      @click="openDomain(domain)"
                    >
                      <span class="fa fa-search"></span>
                    </button>
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
import { mapState, mapActions } from "vuex";
import AppItemList from "./AppItemList.vue";

export default {
  name: "App",
  data: () => {
    return {};
  },
  components: {
    AppItemList,
  },
  methods: {
    ...mapActions(["addItem", "deleteItem", "getItems", "generateDomains"]),
    openDomain(domain) {
      this.$router.push({ path: `/domains/${domain.name}` });
    },
  },
  computed: {
    ...mapState(["items", "domains"]),
  },
  created() {},
};
</script>
