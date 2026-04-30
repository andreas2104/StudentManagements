<template>
  <div class="min-h-screen flex items-center bg-gray-500 justify-center p-4">
    <div class="w-full max-w-md glass-card border border-gray-500 rounded-3xl bg-gray-700 px-10 py-12">
      <form class="space-y-6 text-sm font-medium text-slate-300">
        <div class="flex justify-center items-center">
          <p>Registration</p>
        </div>
        <div class="flex flex-col gap-2">
          <div>
            <label>  
              Email
            </label>
            <input type="email" 
            class="w-full border border-gray-500 rounded-xl p-1"/>
          </div>
          <div>
            <label for="">
              Name
            </label>
            <input type="text" 
            class="w-full border border-gray-500 rounded-xl p-1"/>
          </div>
          <div>
            <label for="">
              Contact
            </label>
            <input type="contact"
            class="w-full border border-gray-500 rounded-xl p-1">
          </div>
          <div>
            <label> 
              Password
            </label>
            <input type="password" 
            class="w-full border border-gray-500 rounded-xl p-1"/>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>