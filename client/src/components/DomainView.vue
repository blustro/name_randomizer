<template>
  <div>
    <div class="container">
      <router-link to="/domains">Back</router-link>
      <h2 class="my-3">{{ domain }}</h2>
      <div class="card">
        <div class="card-body">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="domain in domains"
              :key="domain.extension"
            >
              <div class="row">
                <div class="col-md-6">
                  {{ domain.extension }}
                </div>
                <div class="col-md-3">
                  <span
                    class="badge"
                    :class="[domain.available ? 'bg-success' : 'bg-danger']"
                    >{{ domain.available ? "Available" : "Unavailable" }}</span
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
</template>

<script>
import axios from "axios";

export default {
  props: ["domain"],
  data() {
    return { domains: [] };
  },
  created() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query: `
          mutation ($name: String) {
            domains: generateDomain(name: $name) {
              name
              extension
              checkout
              available
            }
          }
        `,
        variables: {
          name: this.domain,
        },
      },
    }).then((response) => {
      const query = response.data;
      this.domains = query.data.domains;
    });
  },
};
</script>
