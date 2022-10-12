<template>
  <div v-if="student">
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Student Information</h3>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl class="sm:divide-y sm:divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{student.name}}</dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Enrollment Number</dt>
            <dd
              class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
            >{{student.enrollmentNumber}}</dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Branch</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ student.branch ? student.branch.title : '' }}</dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Batch</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{student.batch}}</dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Email</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{student.email}}</dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Phone</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{student.phone}}</dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Batch</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{student.batch}}</dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">Address</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{student.address}}</dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="mt-4">
      <h2 class="font-semibold text-lg mb-2">Borrowed Books</h2>
      <p v-if="borrowedBooks.length == 0">No borrowed books</p>
      <ul v-else role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="borrowedBook in borrowedBooks"
          :key="borrowedBook._id"
          class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div class="flex w-full items-center justify-between space-x-6 p-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3
                  class="truncate text-sm font-medium text-gray-900"
                >Id: {{ borrowedBook.bookItemId }}</h3>
              </div>
              <p
                class="mt-1 truncate text-sm text-gray-500"
              >Issue Date: {{ borrowedBook.issueDate }}</p>
              <p class="mt-1 truncate text-sm text-gray-500">Due Date: {{ borrowedBook.dueDate }}</p>
              <p class="mt-1 truncate text-sm text-gray-500">Status: {{ borrowedBook.status }}</p>
            </div>
            <!-- <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" :src="book.imageUrl" alt="" /> -->
          </div>
          <div>
            <div class="-mt-px flex divide-x divide-gray-200">
              <div class="flex w-0 flex-1">
                <a
                  class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <span class="ml-3">View</span>
                </a>
              </div>
              <div class="-ml-px flex w-0 flex-1">
                <button
                  @click="returnBook(borrowedBook);"
                  class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <span class="ml-3">Return</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="mt-8 flex flex-col">
      <p class="font-semibold text-lg mb-2">Book History</p>
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >Book Title</th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >Status</th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >Issue Date</th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >Due Date</th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >Return Date</th>
                  <th
                    scope="col"
                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >Fine Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-if="isLoading">
                  <td colspan="6" align="center" class="py-5">
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
                <tr v-else v-for="book in books" :key="book._id">
                  <td
                    class="whitespace-nowrap py-4     pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >{{ book.bookItem && book.bookItem.book ? book.bookItem.book.title : '' }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ book.status }}</td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >{{ book.issueDate }} - {{ book.issuerUser  ? book.issuerUser.name : '' }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ book.dueDate }}</td>
                  <td
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >{{ book.returnDate }} - {{ book.collecterUser ? book.collecterUser.name : '' }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ book.fineAmount }}</td>
                </tr>
              </tbody>
            </table>
            <nav
              class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
              aria-label="Pagination"
            >
              <div class="hidden sm:block">
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{books.length}}</span>
                  results of page number
                  <span class="font-medium">{{filters.page}}</span>
                </p>
              </div>
              <div class="flex flex-1 justify-between sm:justify-end">
                <select
                  @change="loadBorrowedBooks"
                  v-model="filters.limit"
                  class="py-2 w-ayto border pl-3 pr-3 mr-4 text-base border-gray-300 sm:text-sm rounded-md"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>

                <button
                  :disabled="disablePreviousButton"
                  @click="previousPage"
                  :class="disablePreviousButton?'text-gray-300':'text-gary-700'"
                  class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >Previous</button>
                <button
                  :disabled="disableNextButton"
                  @click="nextPage"
                  :class="disableNextButton?'text-gray-300':'text-gary-700'"
                  class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >Next</button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>No Student Found</div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      studentId: undefined,
      student: undefined,
      borrowedBooks: [],
      books: [],
      isLoading: false,
      filters: {
        limit: 10,
        page: 1,
      },
    }
  },
  computed: {
    disablePreviousButton() {
      return this.filters.page == 1
    },
    disableNextButton() {
      return this.books.length < this.filters.limit
    },
  },
  mounted() {
    this.studentId = this.$route.params.id
    this.findStudent()
  },
  methods: {
    async findStudent() {
      const response = await axios.get('/students/' + this.studentId)
      this.student = response.data.student
      console.log(this.student)
      this.loadBorrowedBooks()
    },
    async loadBorrowedBooks() {
      this.isLoading = true
      const response = await axios.get('borrowedBooks', {
        params: { student: this.student._id, status: 'borrowed' },
      })

      this.borrowedBooks = response.data.borrowedBooks
      const book = await axios.get('borrowedBooks', {
        params: {
          student: this.student._id,
          limit: this.filters.limit,
          page: this.filters.page,
        },
      })
      this.books = book.data.borrowedBooks
      this.isLoading = false
    },
    async returnBook(borrowedBook) {
      await axios.put('/borrowedBooks', {
        bookItemId: borrowedBook.bookItemId,
      })
      this.loadBorrowedBooks()
    },
    nextPage() {
      this.filters.page++
      this.loadBorrowedBooks()
    },
    previousPage() {
      this.filters.page--
      this.loadBorrowedBooks()
    },
  },
}
</script>

<style>
</style>