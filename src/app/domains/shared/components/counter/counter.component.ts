import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required:true}) duration = 0;
  @Input({required:true}) message = '';
  counter = signal(0);
  counterRef : number | undefined;

  constructor(){
    // NO ASYNC
    // before rendering
    // run only once
    console.log('constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    //before and during render
    console.log('ngOnChange');
    console.log('-'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    console.log(duration);
    if (duration && duration.currentValue !== duration.previousValue){
      this.doSomething();
    }
  }

  ngOnInit() {
    // after render
    // run only once
    // for async, then, subscribe, etc.
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration=> ', this.duration);
    console.log('message=> ', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval');
      this.counter.update(statePrev => statePrev + 1);
    }, 1000);

  }

  ngAfterViewInit(){
    // After render, after ngOnInit
    // check if children have been printed
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy(){
    //
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);

  }

  doSomething(){
    // Sync or async
    console.log(' change duration');
  }

}
