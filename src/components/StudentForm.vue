<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="space-y-6" @submit.prevent="handleSubmit(addStudent)">
      <div class="shadow sm:rounded-md border border-gray-300">
        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-4">
              <label
                class="text-2xl font-semibold text-gray-900"
              >{{ editableStudent._id? "Edit" : "Add" }} Student</label>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label for="table-no" class="ml-0 block text-sm font-medium text-black-700">Name</label>
              <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                <input
                  v-model="student.name"
                  type="text"
                  name="name"
                  id="name"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="barnch" class="block text-sm font-medium text-black-700">Branch</label>
              <ValidationProvider name="Branch" rules="required" v-slot="{ errors }">
                <select
                  v-model="student.branchId"
                  class="mt-1 w-full border pl-3 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md"
                >
                  <option value>Select branch</option>
                  <option
                    v-for="(branch, index) in branches"
                    :value="branch._id"
                    :key="index"
                  >{{branch.title}}</option>
                </select>
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label
                for="sequence"
                class="block text-sm font-medium text-black-700"
              >EnrollmentNumber</label>
              <ValidationProvider name="EnrollmentNumber" rules="required" v-slot="{ errors }">
                <input
                  v-model="student.enrollmentNumber"
                  type="number"
                  name="EnrollmentNumber"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="sequence" class="block text-sm font-medium text-black-700">Phone</label>
              <ValidationProvider name="Phone" rules="required" v-slot="{ errors }">
                <input
                  v-model="student.phone"
                  type="string"
                  name="Phone"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="email" class="block text-sm font-medium text-black-700">Email</label>
              <ValidationProvider name="Email" rules="required" v-slot="{ errors }">
                <input
                  v-model="student.email"
                  type="string"
                  name="Email"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="sequence" class="block text-sm font-medium text-black-700">Batch</label>
              <ValidationProvider name="Batch" rules="required" v-slot="{ errors }">
                <input
                  v-model="student.batch"
                  type="number"
                  name="Batch"
                  class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400"
                  :class="errors.length ? 'focus:ring-2 focus:ring-sky-500 ring-2 ring-rose-400' : 'focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200'"
                />
                <span class="text-red-600 text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="address" class="block text-sm font-medium text-black-700">Address</label>
              <ValidationProvider name="Address" rules="required" v-slot="{ errors }">
                <input
                  v-model="student.address"
                  type="string"
                  name="Address"
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
    editableStudent: {
      type: Object
    }
  },
  data() {
    return {
      student: {
        name: "",
        branchId: "",
        enrollmentNumber: undefined,
        phone: undefined,
        email: undefined,
        isActive: true,
        batch: undefined,
        address: undefined
      },
      branches: {},
      isLoading: false
    };
  },
  mounted() {
    this.setEditableData();
    this.getBranches();
  },
  watch: {
    editableStudent() {
      this.setEditableData();
    }
  },
  methods: {
    setEditableData() {
      if (this.editableStudent._id) {
        let data = JSON.parse(JSON.stringify(this.editableStudent));
        delete data._id;
        this.student = data;
      } else {
        this.student = {
          name: "",
          branchId: "",
          enrollmentNumber: undefined,
          phone: undefined,
          email: undefined,
          isActive: true,
          batch: undefined,
          address: undefined
        };
      }
    },
    closeForm() {
      this.$modal.hide("student-form");
    },
    async getBranches() {
      const response = await axios.get("/branches");
      this.branches = response.data.branches;
      console.log(this.branches);
    },
    async addStudent() {
      this.isLoading = true;
      if (this.editableStudent._id) {
        await axios.put("/students/" + this.editableStudent._id, this.student);
      } else {
        await axios.post("/students", this.student);
      }

      this.student = {
        name: "",
        branchId: "",
        enrollmentNumber: undefined,
        phone: undefined,
        email: undefined,
        isActive: true,
        batch: undefined,
        address: undefined
      };
      this.isLoading = false;
      this.$emit("refresh");
      this.closeForm();
    }
  }
};
</script>