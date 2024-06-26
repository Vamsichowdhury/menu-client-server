<template>
  <v-card>
    <!-- <v-sheet elevation="6">
      <v-tabs v-model="tab" align-tabs="center" color="primary" bg-color="medium-emphasis"
        next-icon="mdi-arrow-right-bold-box-outline" prev-icon="mdi-arrow-left-bold-box-outline" show-arrows>
        <v-tab v-for="category in getCategories" :key="category?._id" :value="category?._id">{{ category?.title
          }}</v-tab>
      </v-tabs>
    </v-sheet> -->
    <v-sheet class="mx-auto" max-width="600">
      <v-slide-group show-arrows v-model="tab">
        <v-slide-group-item v-for="category in getCategories" :key="category?._id" :value="category?._id"
          v-slot="{ isSelected, toggle }">
          <v-btn :color="isSelected ? 'primary' : undefined" class="ma-2" rounded @click="toggle">
            {{ category?.title }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="category in getCategories" :key="category?._id" :value="category?._id">
        <v-container fluid class="scrollable-container">
          <v-row>
            <v-col v-for="(item, index) in category?.totalItems" :key="i" cols="12" md="3">
              <v-hover v-slot="{ isHovering, props }">
                <v-card :class="{ 'on-hover': isHovering }" :elevation="isHovering ? 24 : 6" v-bind="props" :key="index"
                  :disabled="item.loading" :loading="item.loading" class="mx-auto my-12" max-width="374">
                  <template v-slot:loader="{ isActive }">
                    <v-progress-linear :active="isActive" color="primary" height="4" indeterminate></v-progress-linear>
                  </template>

                  <v-img height="250" :src="getImageUrl(item?.imageSrc)" cover></v-img>

                  <v-card-item>
                    <v-card-title>{{ item?.name }}</v-card-title>
                  </v-card-item>

                  <v-card-text>
                    <div class="my-4 text-subtitle-1">
                      {{ item?.description }}
                    </div>

                    <v-card-text class="d-flex justify-space-around">
                      <v-chip class="ma-2" color="primary" variant="outlined" size="x-large">
                        Price : <p class="font-weight-bold">
                          ₹ {{ item.price }}
                        </p>
                        <v-icon icon="mdi-outline" end></v-icon>
                      </v-chip>

                    </v-card-text>
                  </v-card-text>

                  <v-divider class="mx-4 mb-1"></v-divider>
                  <!-- <v-card-actions>
                    <v-btn color="primary" text="Add to Cart" block border @click="reserve(index)">
                      <v-icon class="mx-2">mdi-cart</v-icon>
                      Add to Cart
                    </v-btn>
                  </v-card-actions> -->
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    tab: null,
    scrollInvoked: 0,
    items: []
  }),
  computed: {
    ...mapGetters("menu/menuDashboard", ["getCategories"]),
  },
  methods: {
    ...mapActions("menu/menuDashboard", ["fetchCategories"]),

    // reserve(index) {
    //   this.cardItems[index].loading = true;
    //   setTimeout(() => (this.cardItems[index].loading = false), 2000);
    // },
    getImageUrl(relativePath) {
      const baseUrl = process.env.BASE_URL;
      return `${baseUrl}${relativePath}`;
    }
  },
  watch: {
    tab(newValue, oldValue) {
      this.items = this.getCategories.find((category) => category?._id === newValue).totalItems
    }
  },
  async created() {
    const response = await this.fetchCategories();
    this.tab = response?.data?.[0]?._id
  },
}
</script>

<style lang="scss" scoped>
.scrollable-container {
  height: 85vh;
  overflow-y: auto;
}
</style>
