import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { RandomNumberService } from '../number-service/random-number.service';
import { ButtonComponent } from './button.component';

fdescribe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ButtonComponent
      ],
      providers: [
        {
          provide: RandomNumberService,
          useValue: {
            getNumberObservable: () => of(123),
            getNumberInstantly: () => 123
          }

        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set a new number when getNumber function is called', () => {
    expect(component.num).not.toBeDefined();

    component.getNumber();

    expect(component.num).toEqual(123);
  });

  it('should set set new number when button is clicked', () => {
    let instantButton = fixture.debugElement.query(By.css("#button-1")).nativeElement;

    instantButton.click();

    expect(component.num).toBeTruthy();
  });

  it('should set number when getNumberObservable is called', fakeAsync(() => {
    component.getNumberObservable();

    tick(1000);

    expect(component.num).toBeTruthy();
  }));

  it('should set number when getNumberObservable is called - whenStable/flush', fakeAsync(() => {
    component.getNumberObservable();

    flush();
    fixture.whenStable().then(() => {
      expect(component.num).toBeTruthy();
    })
  }));

  it('should set number with spy', () => {
    spyOn(component["numService"], "getNumberObservable").and.returnValue(of(123));

    component.getNumberObservable();

    expect(component.num).toBe(123);
  });

  it('should set number with spy', () => {
    spyOn(component["numService"], "getNumberObservable").and.returnValue(of(999));

    component.getNumberObservable();

    expect(component.num).toBe(999);
  });


  // it('should set new number when getNumberObservable is called - tick', () => {
  //   component.getNumberObservable();
  //
  //   expect(component.num).toBeTruthy();
  // });

  // it('should set new number when getNumberObservable is called - whenStable', fakeAsync(() => {
  //   component.getNumberObservable();

  //   flush();
  //   fixture.whenStable().then(() => {
  //     expect(component.num).toBeTruthy();
  //   })
  // }));

  // it('should set a number when "http" method is called', () => {
  //   spyOn(component["numService"], "getNumberObservable").and.returnValue(of(123));

  //   component.getNumberObservable();

  //   expect(component.num).toBe(123);
  // }); 

  // it('should set new number - spying', () => {
  //   spyOn(component["numService"], "getNumberObservable").and.returnValue(of(500000));

  //   component.getNumberObservable();

  //   expect(component.num).toBe(500000);
  //   expect(component["numService"].getNumberObservable).toHaveBeenCalled();
  // });
});
