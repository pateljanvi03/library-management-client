<template>
  <div>
    <div class="py-4">
      <div>
        <div class="flex flex-col">
          <modal
            name="category-form"
            height="auto"
            :min-width="200"
            :min-height="200"
            :scrollable="true"
            :reset="true"
          >
            <CategoryForm :editableCategory="editableCategory" @refresh="loadCtegories"></CategoryForm>
          </modal>

          <div>
            <div class="sm:flex justify-between">
              <h1 class="text-2xl font-semibold text-gray-900">Categories</h1>

              <button
                type="button"
                @click="showForm"
                class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 mr-2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Category
              </button>
            </div>

            <div class="mt-8 flex flex-col">
              <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div
                    class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                  >
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >Category</th>
                          <th
                            scope="col"
                            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >No. of Books</th>
                          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span class="sr-only">Edit</span>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-if="isLoading">
                          <td colspan="5" align="center" class="py-5">
                            <svg
                              class="animate-spin -ml-1 mr-3 h-6 w-6 text-indigo-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                              />
                              <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          </td>
                        </tr>
                        <tr v-else v-for="category in categories" :key="category._id">
                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-900 sm:pl-6"
                          >{{ category.title }}</td>
                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-900 sm:pl-6"
                          >{{ category.booksCount }}</td>
                          <td
                            class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                          >
                            <button
                              type="button"
                              class="text-indigo-600 hover:text-indigo-900"
                              @click="edit(category)"
                            >
                              Edit
                              <span class="sr-only">{{ category.title}}</span>
                            </button>
                          </td>
                          <td>
                            <a
                              class="text-indigo-600 hover:text-indigo-900 ml-2 hover:cursor-pointer"
                              @click="deleteFromTable(category)"
                            >Delete</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryForm from "@/components/CategoryForm.vue";

export default {
  components: {
    CategoryForm
  },
  data() {
    return {
      categories: [],
      isLoading: false,
      editableCategory: {}
    };
  },
  created() {
    this.loadCtegories();
  },
  methods: {
    async loadCtegories() {
      this.isLoading = true;
      const response = await axios.get("/categories");
      this.categories = response.data.categories;
      this.isLoading = false;
    },

    async edit(category) {
      this.editableCategory = category;
      this.$modal.show("category-form");
    },

    async deleteFromTable(category) {
      if (confirm("Are you sure you wants to delete?") === true) {
        await axios.delete("/categories/" + category._id);
        await this.loadCtegories();
      }
    },
    showForm() {
      this.editableCategory = {};
      this.$modal.show("category-form");
    }
  }
};
</script>
