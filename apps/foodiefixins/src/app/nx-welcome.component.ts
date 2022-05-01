import { Component, OnInit, ViewEncapsulation } from '@angular/core';

/* eslint-disable */

@Component({
  selector: 'snardev-nx-welcome',
  template: `
    <div id="welcome">
      <h1>
        <span> Hello there, </span>
        Welcome foodiefixins 👋
      </h1>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
