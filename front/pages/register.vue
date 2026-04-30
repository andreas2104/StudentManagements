<script setup lang="ts">
import { toast } from 'vue3-toastify';

definePageMeta({
  layout: "auth",
  middleware: "guest",
});

const { post } = useApi();
const router = useRouter();

const name = ref("");
const firstname = ref("");
const contact = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const globalError = ref("");
const errors = ref<Record<string, string>>({});
const loading = ref(false);

const handleSubmit = async () => {
  if (password.value !== passwordConfirm.value) {
    globalError.value = "Passwords do not match.";
    return;
  }

  globalError.value = "";
  errors.value = {};
  loading.value = true;

  try {
    await post("/api/users", {
      name: name.value,
      firstname: firstname.value,
      contact: contact.value,
      email: email.value,
      password: password.value,
    });

    toast.success("Account created successfully!");
    router.push("/login?registered=true");
  } catch (err: any) {
    if (err.data && err.data.violations) {
      err.data.violations.forEach((v: any) => {
        errors.value[v.propertyPath] = v.message;
      });
    } else {
      const errorMsg = err.message || "Registration failed. Please try again.";
      globalError.value = errorMsg;
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center bg-gray-500 justify-center p-4">
    <div class="w-full max-w-md glass-card border border-gray-500 rounded-3xl bg-gray-700 px-10 py-12">
      <div class="flex justify-center items-center mb-6">
        <p class="text-2xl font-bold text-white">Create an account</p>
      </div>

      <div
        v-if="globalError"
        class="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-6"
      >
        {{ globalError }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6 text-sm font-medium text-slate-300">
        <div class="flex flex-col gap-2">
          <div class="flex gap-4">
            <div class="flex-1">
              <label for="name">
                Name
              </label>
              <input
                id="name"
                v-model="name"
                type="text"
                required
                class="w-full border border-gray-500 rounded-xl p-1 bg-transparent focus:outline-none focus:border-indigo-500"
              />
              <p v-if="errors.name" class="text-red-400 text-xs mt-1">{{ errors.name }}</p>
            </div>
            <div class="flex-1">
              <label for="firstname">
                First name
              </label>
              <input
                id="firstname"
                v-model="firstname"
                type="text"
                required
                class="w-full border border-gray-500 rounded-xl p-1 bg-transparent focus:outline-none focus:border-indigo-500"
              />
              <p v-if="errors.firstname" class="text-red-400 text-xs mt-1">{{ errors.firstname }}</p>
            </div>
          </div>

          <div>
            <label for="email">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full border border-gray-500 rounded-xl p-1 bg-transparent focus:outline-none focus:border-indigo-500"
            />
            <p v-if="errors.email" class="text-red-400 text-xs mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label for="contact">
              Contact
            </label>
            <input
              id="contact"
              v-model="contact"
              type="text"
              required
              class="w-full border border-gray-500 rounded-xl p-1 bg-transparent focus:outline-none focus:border-indigo-500"
            />
            <p v-if="errors.contact" class="text-red-400 text-xs mt-1">{{ errors.contact }}</p>
          </div>

          <div>
            <label for="password">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full border border-gray-500 rounded-xl p-1 bg-transparent focus:outline-none focus:border-indigo-500"
            />
            <p v-if="errors.password" class="text-red-400 text-xs mt-1">{{ errors.password }}</p>
          </div>

          <div>
            <label for="passwordConfirm">
              Confirmation
            </label>
            <input
              id="passwordConfirm"
              v-model="passwordConfirm"
              type="password"
              required
              class="w-full border border-gray-500 rounded-xl p-1 bg-transparent focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full border border-gray-500 hover:bg-gray-600 disabled:bg-gray-500 rounded-xl p-2 transition-colors flex justify-center items-center gap-2"
        >
          <svg v-if="loading" class="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <span>{{ loading ? "Creating account..." : "Sign up" }}</span>
        </button>
      </form>

      <div class="flex justify-center items-center mt-6">
        <p class="text-sm text-slate-300">
          Already have an account?
          <NuxtLink
            to="/login"
            class="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Log in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
