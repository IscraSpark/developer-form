import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { ServerServiceService } from './services/server-service.service';
import { EmailValidator } from './validators/validators'


interface Frameworks {
  angular: string[];
  react: string[];
  vue: string[];
}

const frameworks: Frameworks = {
  angular: ['1.1.1', '1.2.1', '1.3.3'],
  react: ['2.1.2', '3.2.4', '4.3.1'],
  vue: ['3.3.1', '5.2.1', '5.1.3']
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  versions = frameworks.angular;
  frameworksList = ['angular', 'react', 'vue'];

  developerForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    birth: ['', Validators.required],
    technology: ['', Validators.required],
    version: [ {value: '', disabled: true}, Validators.required ],
    email: ['', [ Validators.required, Validators.email],  EmailValidator.createValidator(this.serv)],
    hobbies: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        duration: ['', Validators.required]
        }),
      ])
  })


  get hobbies() {
    return this.developerForm.get('hobbies') as FormArray;
  }

  constructor(private fb: FormBuilder, private serv: ServerServiceService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.developerForm.get('technology')!.valueChanges.subscribe( val  => {
      switch (val) {
        case 'angular': {
          this.versions = frameworks.angular;
          break;
        }
        case 'react': {
          this.versions = frameworks.react;
          break;
        }
        case 'vue': {
          this.versions = frameworks.vue;
          break;
        }
      }
      this.developerForm.get('version')!.enable();

    }
     )
  }

  addHobby() {
    this.hobbies.push(this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required]
      }),
    );
  }

  removeHobby() {
    this.hobbies.removeAt(this.hobbies.controls.length-1)
  }

  clear(form: 'name' | 'surname' | 'email') {
    this.developerForm.get(form)!.setValue('')
  }
  
  isDisabled() {
    return !(this.hobbies.controls.length > 1)
  }

  send() {
    let temp = this.developerForm.getRawValue()

    this.serv.send(
      {
        firstName: temp.name,
        lastName: temp.surname,
        dateOfBirth: temp.birth,
        framework: temp.technology,
        frameworkVersion: temp.version,
        email: temp.email,
        hobby: temp.hobbies
      }
    )
  }
}
