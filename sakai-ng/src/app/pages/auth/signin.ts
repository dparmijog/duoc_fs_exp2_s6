import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, ReactiveFormsModule, PasswordModule],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            
                        </div>

                        <div class="flex flex-col items-center justify-center">
                            <form  class="flex flex-col items-center justify-center" [formGroup]="formGroup">
                            <label for="email" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email" formControlName="email" type="text" placeholder="Email address" class="mb-8 width-[150]"  />
                            <div>
                            <label for="password0" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password0" formControlName="password0" placeholder="Password" styleClass=" mb-8" [toggleMask]="true" [feedback]="false"></p-password>
                            </div>
                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password1" formControlName="password1"  [(ngModel)]="password1" placeholder="Password" styleClass="w-full md:w-[30rem] mb-8" [toggleMask]="true" [feedback]="false"></p-password>

                            <label for="displayName" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Display Name</label>
                            <input pInputText id="displayName" formControlName="displayName" type="text" placeholder="Display Name" class="w-full md:w-[30rem] mb-8"  />

                            <label for="favouriteNumber" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Favourite Number</label>
                            <input pInputText id="favouriteNumber" formControlName="favouriteNumbre" type="number" placeholder="Favourite Number" class="w-full md:w-[30rem] mb-8"  />   

                            <label for="birthDate" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Birth Date</label>
                            <input pInputText id="birthDate" type="date" formControlName="birthDate" placeholder="Birth Date" class="w-full md:w-[30rem] mb-8" />
                            
                           
                            <p-button label="Sign In" styleClass="w-full" routerLink="/"></p-button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class SignIn {
    email: string = '';
    displayName: string = '';
    password0: string = '';
    password1: string = '';

    favouriteNumber: number = 0;
    birthDate: Date = new Date();
    formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            email: new FormControl(),
            displayName: new FormControl(),
            favouriteNumber: new FormControl(),
            birthDate: new FormControl(),
            password0: new FormControl(),
            password1: new FormControl()
        });
    }
}
