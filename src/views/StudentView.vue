<template>
  <div>
    <div class="py-4">
      <div>
        <div class="flex flex-col">
          <modal
            name="student-form"
            height="auto"
            :min-width="200"
            :min-height="200"
            :scrollable="true"
            :reset="true"
          >
            <StudentForm :editableStudent="editableStudent" @refresh="loadStudents"></StudentForm>
          </modal>
          <div>
            <div class="sm:flex justify-between">
              <h1 class="text-2xl font-semibold text-gray-900"> Students </h1>
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
                Add Student
              </button>
            </div>

            <div class="flex bg-white mt-4 border rounded-lg shodow py-6 px-4">
                <div class="px-2"><input v-model="filters.name" placeholder="Name" class="appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" /></div>
                <div class="px-2"><input v-model="filters.enrollmentNumber" placeholder="Enrollment No." class="appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" /></div>
                <div class="px-2"><input v-model="filters.batch" placeholder="Batch" class="appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" /></div>
                <button @click="loadStudents" class="bg-indigo-600 px-4 py-2 flex text-white rounded ml-4">
                  <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke-width="1.5" 
                  stroke="currentColor" 
                  class="w-5 h-5 pt-1 mr-2">
                      <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
                      />
                  </svg>
                  Search 
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
                          >Name</th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >Branch</th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >EnrollmentNumber</th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >Phone</th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >Email</th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >isActive</th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >Batch</th>
                          <th
                            scope="col"
                            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >Address</th>
                          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span class="sr-only">Edit</span>
                          </th>
                          <th></th>
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
                        <tr v-else v-for="student in students" :key="student._id">
                          <td
                            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                          >{{ student.name }}</td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >{{ student.branch ? student.branch.title : 'a' }}</td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >{{ student.enrollmentNumber }}</td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >{{ student.phone }}</td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >{{ student.email }}</td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >{{ student.isActive }}</td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >{{ student.batch }}</td>
                          <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          >{{ student.address }}</td>
                          <td
                            class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                          >
                            <a
                              href="#"
                              class="text-indigo-600 hover:text-indigo-900"
                              @click="edit(student)"
                            >
                              Edit
                              <span class="sr-only"></span>
                            </a>
                          </td>
                          <td>
                            <a
                              class="text-indigo-600 hover:text-indigo-900 ml-2 hover:cursor-pointer"
                              @click="deleteStudent(student)"
                            >Delete</a>
                          </td>
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
                          <span class="font-medium">{{students.length}}</span>
                          results of page number
                          <span class="font-medium">{{filters.page}}</span>
                        </p>
                      </div>
                      <div class="flex flex-1 justify-between sm:justify-end">
                        <select
                          @change="loadStudents"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StudentForm from "@/components/StudentForm.vue";

export default {
  components: {
    StudentForm
  },
  data() {
    return {
      students: [],
      isLoading: false,
      editableStudent: {},
      filters: {
        page: 1,
        limit: 10,
        enrollmentNumber:"",
        batch: "",
        name: ""
      }
    };
  },
  created() {
    this.loadStudents();
  },
  computed: {
    disablePreviousButton() {
      return this.filters.page == 1;
    },
    disableNextButton() {
      return this.students.length < this.filters.limit;
    }
  },
  methods: {
    async loadStudents() {
      this.isLoading = true;
      const response = await axios.get("/students", {
        params: this.filters
      });
      this.students = response.data.students;
      this.isLoading = false;
    },

    async edit(student) {
      this.editableStudent = student;
      this.$modal.show("student-form");
    },

    async deleteStudent(student) {
      if (confirm("Are you sure you wants to delete?") === true) {
        await axios.delete("/students/" + student._id);
        await this.loadStudents();
      }
    },
    async nextPage() {
      this.filters.page++;
      this.loadStudents();
    },
    async previousPage() {
      this.filters.page--;
      this.loadStudents();
    },
    showForm() {
      this.editableStudent = {};
      this.$modal.show("student-form");
    }
  }
};
</script>
