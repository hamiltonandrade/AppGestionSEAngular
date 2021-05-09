import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GSAngular';

  btrs(): void {

    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
      // tslint:disable-next-line:only-arrow-functions
      $('.sidebar-toggle').on('click', function() {
        $('.sidebar').toggleClass('toggled');
      });

      // tslint:disable-next-line:only-arrow-functions
      var active = $('.sidebar .active');
      if (active.length && active.parent('.collapse').length) {
        var parent = active.parent('.collapse');

        // @ts-ignore
        parent.prev('a').attr('aria-expanded', true);
        parent.addClass('show');
      }
    });
  }


}
