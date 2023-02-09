import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Estudiante } from './estudiante';
//import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';


@Component(
  { selector: 'app-modal',
  templateUrl: './modal.component.html',
})


function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { range: true };
    }
    return null;
  };
}



  estudianteForm: FormGroup;
  estudiante = new Estudiante();
  emailMessage: string;

  get addresses(): FormArray {
    return this.estudianteForm.get('addresses') as FormArray;
  }

  private validationMessages = {
    required: 'por favor ingrese su email',
    email: 'por favor ingrese su correo electronico'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.estudianteForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: emailMatcher }),
      phone: '',
      notification: 'email',
     
      addresses: this.fb.array([this.buildAddress()])
    });

    this.estudianteForm.get('notification').valueChanges.subscribe(
      value => this.setNotification(value)
    );

    const emailControl = this.estudianteForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(emailControl)
    );
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: ['', Validators.required],
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  populateTestData(): void {
    this.estudianteForm.patchValue({
      firstName: 'juan',
      lastName: 'perez',
      emailGroup: { email: 'juan@mail.com', confirmEmail: 'juan@email.com' }
    });
    const addressGroup = this.fb.group({
      addressType: 'work',
      street1: 'calle republica',
      street2: '',
      city: 'ciudad de cordoba',
      state: 'CBA',
      zip: '123'
    });
    this.estudianteForm.setControl('addresses', this.fb.array([addressGroup]));
  }

  save(): void {
    console.log(this.estudianteForm);
    console.log('Saved: ' + JSON.stringify(this.estudianteForm.value));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.estudianteForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }





export class modal1Component {
  title: string | null = null;

  constructor(public modalRef: MdbModalRef<modal1Component>) {}
}