import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'snardev-page-not-found',
  template: `
    <div class="bg-white min-h-full flex flex-col lg:relative">
      <div class="flex-grow flex flex-col">
        <main class="flex-grow flex flex-col bg-white">
          <div
            class="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8"
          >
            <div class="flex-shrink-0 pt-10 sm:pt-16">
              <a href="/" class="inline-flex">
                <span class="sr-only">Workflow</span>
                <span class="text-4xl h-12 w-auto text-indigo-600 font-semibold"
                  >Foodie Fixins</span
                >
              </a>
            </div>
            <div class="flex-shrink-0 my-auto py-16 sm:py-32">
              <p
                class="text-sm font-semibold text-indigo-600 uppercase tracking-wide"
              >
                404 error
              </p>
              <h1
                class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl"
              >
                Page not found
              </h1>
              <p class="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div class="mt-6">
                <a
                  routerLink="/home"
                  class="text-base font-medium text-indigo-600 hover:text-indigo-500"
                  >Go back home<span aria-hidden="true"> &rarr;</span></a
                >
              </div>
            </div>
          </div>
        </main>
        <!-- <footer class="flex-shrink-0 bg-gray-50">
          <div class="mx-auto max-w-7xl w-full px-4 py-16 sm:px-6 lg:px-8">
            <nav class="flex space-x-4">
              <a
                href="#"
                class="text-sm font-medium text-gray-500 hover:text-gray-600"
                >Contact Support</a
              >
              <span
                class="inline-block border-l border-gray-300"
                aria-hidden="true"
              ></span>
              <a
                href="#"
                class="text-sm font-medium text-gray-500 hover:text-gray-600"
                >Status</a
              >
              <span
                class="inline-block border-l border-gray-300"
                aria-hidden="true"
              ></span>
              <a
                href="#"
                class="text-sm font-medium text-gray-500 hover:text-gray-600"
                >Twitter</a
              >
            </nav>
          </div>
        </footer> -->
      </div>
      <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          class="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
          alt=""
        />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
