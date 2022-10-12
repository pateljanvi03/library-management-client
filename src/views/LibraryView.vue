<template>
  <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
    <section aria-labelledby="payment-details-heading">
      <form>
        <div class="shadow sm:overflow-hidden sm:rounded-md">
          <div class="bg-white py-6 px-4 sm:p-6">
            <modal
            name="student-form"
            height="auto"
            :min-width="200"
            :min-height="200"
            :scrollable="true"
            :reset="true"
            >
              <StudentSearchForm @studentId="studentId" @refresh="issueBook"> </StudentSearchForm>
            </modal>
            <div>
              <h2
                id="payment-details-heading"
                class="text-lg font-medium leading-6 text-gray-900"
              > Search Book</h2>
              <p
                class="mt-1 text-sm text-gray-500"
              >Update your billing information. Please note that updating your location could affect your tax rates.</p>
            </div>

            <div class="flex mt-6">
              <div class="mr-6">
                <label for="first-name" class="block text-sm font-medium text-gray-700">Name</label>
                <input
                  v-model="bookFilters.name"
                  type="text"
                  name="name"
                  id="name"
                  class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                />
              </div>

              <div class="mr-6">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Author</label>
                <input
                  v-model="bookFilters.author"
                  type="text"
                  name="author"
                  id="author"
                  class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                />
              </div>

              <div class="mr-6">
                <label
                  class="block text-sm font-medium text-gray-700"
                >ISBN</label>
                <input
                  v-model="bookFilters.ISBN"
                  type="text"
                  name="ISBN"
                  id="ISBN"
                  class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <div class="px-4 py-3 flex justify-end bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                @click="loadData"
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
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>

  <div>
    <h2 class="font-semibold text-lg mb-2">Books</h2>
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="book in books" :key="book._id" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div class="flex w-full items-center justify-between space-x-6 p-6">
        <div class="flex-1 truncate">
          <div class="flex items-center space-x-3">
            <h3 class="truncate text-sm font-medium text-gray-900">{{ book.title }}</h3>
            <span class="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">{{ book.quantity }}</span>
          </div>
          <p class="mt-1 truncate text-sm text-gray-500">Author: {{ book.author }}</p>
          <p class="mt-1 truncate text-sm text-gray-500">Publisher: {{ book.publisher }} ({{book.publicationYear}})</p>
          <p class="mt-1 truncate text-sm text-gray-500">ISBN:  {{ book.ISBN }}</p>
        </div>
        <!-- <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" :src="book.imageUrl" alt="" /> -->
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1">
            <a :href="`mailto:${book.author}`" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <span class="ml-3">View</span>
            </a>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <button @click="selectBook(book)" class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <span class="ml-3">Select</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
  </div>

  <div v-if="selectedBook">
    <h2 class="font-semibold text-lg mb-2">Book copies</h2>
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="bookItem in bookItems" :key="bookItem._id" class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div class="flex w-full items-center justify-between space-x-6 p-6">
        <div class="flex-1 truncate">
          <div class="flex items-center space-x-3">
            <h3 class="truncate text-sm font-medium text-gray-900">{{ bookItem._id }}</h3>
          </div>
          <p class="mt-1 truncate text-sm text-gray-500"> status: {{ bookItem.status }}</p>
        </div>
        <!-- <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" :src="book.imageUrl" alt="" /> -->
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1">
            <button class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <span class="ml-3">View</span>
            </button>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <button v-if="bookItem.status === 'borrowed'" @click="returnBook(bookItem)" class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <span  class="ml-3">Return</span>
            </button>
            <button v-else type="button" @click="showForm(bookItem)" class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <span class="ml-3">Issue</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      bookFilters: {
        name:"",
        author:"",
        ISBN: ""
      },
      books: [],
      isLoading: false,
      selectedBook: undefined,
      bookItems: [],
      selectedBookItem: undefined,
      borrowerId: undefined
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.isLoading = true;
      const response = await axios.get('/books', {
        params: this.bookFilters
      });
      this.selectedBook = undefined;
      this.books = response.data.books;
      this.isLoading = false
    },
    async selectBook(book) {
      this.selectedBook = book;
       this.loadBookItems();
    },
    async returnBook(bookItem) {
      await axios.put("/borrowedBooks", {
        bookItemId: bookItem._id
      })
      this.loadBookItems();
    },
    async issueBook() {
      await axios.post("/borrowedBooks", {
        studentId: this.borrowerId,
        bookItemId: this.selectedBookItem._id
      })
      this.loadBookItems();
      this.selectedBookItem = undefined;
      this.borrowerId = undefined;
    },
    async loadBookItems() {
      const response = await axios.get('/bookItems',{
        params : { bookId: this.selectedBook._id }
      });
      this.bookItems = response.data.bookItems
    },
    async showForm(bookItem) {
      this.selectedBookItem = bookItem;
      this.$modal.show("student-form");
    },
    async studentId(id) {
      this.borrowerId = id;
    }
  }
}
</script>