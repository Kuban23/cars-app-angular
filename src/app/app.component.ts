import { Component, HostListener } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   priceForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      car: ['', Validators.required],
   });

   carsData: any;

   //  carsData = [
   //     {
   //        image: "lambo.svg",
   //        name: "Lamborghini Huracan Spyder",
   //        gear: "полный",
   //        engine: 5.2,
   //        places: 2
   //     },
   //     {
   //        image: "chevrolet_corvette.svg",
   //        name: "Chevrolet Corvette",
   //        gear: "полный",
   //        engine: 6.2,
   //        places: 2
   //     },
   //     {
   //        image: "ferrari.svg",
   //        name: "Ferrari California",
   //        gear: "полный",
   //        engine: 3.9,
   //        places: 4
   //     },
   //     {
   //        image: "lambo_urus.svg",
   //        name: "Lamborghini Urus",
   //        gear: "полный",
   //        engine: 4.0,
   //        places: 5
   //     },
   //     {
   //        image: "audi.svg",
   //        name: "Audi R8",
   //        gear: "полный",
   //        engine: 5.2,
   //        places: 2
   //     },
   //     {
   //        image: "chevrolet_camaro.svg",
   //        name: "Chevrolet Camaro",
   //        gear: "полный",
   //        engine: 2.0,
   //        places: 4
   //     }

   //  ];

   constructor(private fb: FormBuilder, private appService: AppService) {

   }

   // При загрузке страницы получаем данные об авто с сервера
   ngOnInit() {
      // this.appService.getData().subscribe(carsData => this.carsData = carsData);
      this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData);
   }

   goScroll(target: HTMLElement, car?: any) {
      target.scrollIntoView({ behavior: "smooth" });
      if (car) {
         this.priceForm.patchValue({ car: car.name });
      }
   }

   trans: any;
   @HostListener('document:mousemove', ['$event'])
   onMouseMove(e: MouseEvent) {
      this.trans = { transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)' };
   }

   bgPos: any;
   @HostListener('document:scroll', ['$event'])

   category: string = 'sport';
   toggleCategory(category: string) {
     this.category = category;
     this.ngOnInit();
   }

   onScroll() {
      this.bgPos = { backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px' };
   }

   onSubmit() {
      if (this.priceForm.valid) {
         this.appService.sendQuery(this.priceForm.value)
            .subscribe(
               {
                  next: (response: any) => {
                     alert(response.message)
                     this.priceForm.reset();
                  },
                  error: (response) => {
                     alert(response.error.message);
                  }
               }
            );
      }
   }
}
