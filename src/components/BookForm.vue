<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="space-y-6" @submit.prevent="handleSubmit(addBook)">
      <div class="shadow sm:rounded-md border border-gray-300">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-4">
              <label
                class="text-2xl font-semibold text-gray-900"
              >{{ editableBook._id? "Edit" : "Add" }} Book </label>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label for="table-no" class="ml-0 block text-sm font-medium text-black-700">Name</label>
              <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                <input
                  v-model="book.title"
                  type="text"
                  name="Name"
                  id="name"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label
                for="ISBN"
                class="block text-sm font-medium text-black-700"
              >ISBN</label>
              <ValidationProvider name="ISBN" rules="required" v-slot="{ errors }">
                <input
                  v-model="book.ISBN"
                  type="string"
                  name="ISBN"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="category" class="block text-sm font-medium text-black-700">Category</label>
              <ValidationProvider name="Category" rules="required" v-slot="{ errors }">
                <select
                  v-model="book.categoryId"
                  class="mt-1 w-full border pl-3 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md"
                >
                  <option value>Select category</option>
                  <option
                    v-for="(category, index) in categories"
                    :value="category._id"
                    :key="index"
                  >{{category.title}}</option>
                </select>
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="author" class="block text-sm font-medium text-black-700"> Author </label>
              <ValidationProvider name="Author" v-slot="{ errors }">
                <input
                  v-model="book.author"
                  type="string"
                  name="author"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="language" class="block text-sm font-medium text-black-700">Language</label>
              <ValidationProvider name="Language" v-slot="{ errors }">
                <input
                  v-model="book.language"
                  type="string"
                  name="language"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="publisher" class="block text-sm font-medium text-black-700">Publisher</label>
              <ValidationProvider name="publisher" v-slot="{ errors }">
                <input
                  v-model="book.publisher"
                  type="string"
                  name="Publisher"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="address" class="block text-sm font-medium text-black-700">PublicationYear</label>
              <ValidationProvider name="PublicationYear" v-slot="{ errors }">
                <input
                  v-model="book.publicationYear"
                  type="number"
                  name="PublicationYear"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="address" class="block text-sm font-medium text-black-700">Price</label>
              <ValidationProvider name="Price" v-slot="{ errors }">
                <input
                  v-model="book.price"
                  type="number"
                  name="Price"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="description" class="block text-sm font-medium text-black-700">Description</label>
              <ValidationProvider name="Description" v-slot="{ errors }">
                <input
                  v-model="book.description"
                  type="string"
                  name="Description"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
        </div>

        <div class="px-4 py-3 flex justify-end bg-gray-50 text-right sm:px-6">
          <button
            type="button"
            @click="closeForm"
            class="inline-flex justify-center py-2 px-4 text-sm font-medium"
          >Close</button>
          <button
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="isLoading"
            :class="
              isLoading
              ? 'bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 '
              "
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            Save
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import axios from "axios";
export default {
  props: {
    editableBook: {
      type: Object
    }
  },
  data() {
    return {
      book: {
        title: undefined,
        ISBN: undefined,
        image: undefined,
        categoryId: undefined,
        author: undefined,
        language: undefined,
        publisher: undefined,
        publicationYear: undefined,
        price: undefined,
        description: "",
      },
      categories: {},
      isLoading: false
    };
  },
  mounted() {
    this.setEditableData();
    this.getCategories();
  },
  watch: {
    editableBook() {
      this.setEditableData();
    }
  },
  methods: {
    setEditableData() {
      if (this.editableBook._id) {
        let data = JSON.parse(JSON.stringify(this.editableBook));
        delete data._id;
        this.book = data;
      } else {
        this.book = {
          title: undefined,
          ISBN: undefined,
          image: undefined,
          categoryId: undefined,
          author: undefined,
          language: undefined,
          publisher: undefined,
          publicationYear: undefined,
          price: undefined,
          description: ""
        };
      }
    },
    closeForm() {
      this.$modal.hide("book-form");
    },
    async getCategories() {
      const response = await axios.get("/categories");
      console.log(response.data);
      this.categories = response.data.categories;
    },
    async addBook() {
      this.isLoading = true;
      if (this.editableBook._id) {
        await axios.put("/books/" + this.editableBook._id, this.book);
      } else {
        await axios.post("/books", this.book);
      }

      this.book = {
        title: undefined,
        ISBN: undefined,
        image: undefined,
        categoryId: undefined,
        author: undefined,
        language: undefined,
        publisher: undefined,
        publicationYear: undefined,
        price: undefined,
        description: "",
      };
      this.isLoading = false;
      this.$emit("refresh");
      this.closeForm();
    }
  }
};
</script>