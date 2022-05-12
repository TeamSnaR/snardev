import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'snardev-split-form-ui',
  template: `
    <form class="space-y-8 divide-y divide-gray-200">
      <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Item</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <!-- <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="about"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                About
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="about"
                  name="about"
                  rows="3"
                  class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                ></textarea>
                <p class="mt-2 text-sm text-gray-500">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div> -->
            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="first-name"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Quantity
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="first-name"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Description
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div
              class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="first-name"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Price
              </label>
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-start">
          <button
            type="button"
            class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
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
export class SplitFormUiComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
