import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import bcrypt from 'bcryptjs';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, ReactiveFormsModule],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to IdentiWorld!</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>

                        <form class="flex flex-col items-start " [formGroup]="formGroup" (ngSubmit)="registerUser()" novalidate>
                            <input pInputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" />

                            <p-password id="password" placeholder="Password" [toggleMask]="true" styleClass="w-full md:w-[30rem] mb-8" [fluid]="true" [feedback]="false"></p-password>

                            <!-- <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                            </div> -->
                            <p-button label="Ingresar" styleClass="w-full" type="submit"></p-button>
                        </form>
                    </div>
            </div>
        </div>
    `
})
export class Login {
    formGroup!: FormGroup;

    error: string = '';
    success: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group(
            {
                email: ['diego@identi.com', [Validators.required, Validators.email]],
                password: ['p4ssw0rd.', [Validators.required, Validators.minLength(4)]],
            }
        );
    }

    async registerUser() {
        console.log('asjkd');
        this.error = '';
        this.success = '';

        if (this.formGroup.invalid) {
            this.error = 'Revisa los campos, hay errores en el formulario.';
            return;
        }

        const { email, password } = this.formGroup.value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (!users.some((user: any) => user.email === email)) {
            this.error = 'No existe ningun usuario registrado con este email'
            return;
        }
        const user = users.find((user: any) => user.email === email);

        if(await bcrypt.compare(password, user )) {
            localStorage.setItem('session', JSON.stringify({
                user: user,
                expiresAt: new Date().valueOf() + 60 * 30 * 1000
            }))
            setTimeout(() => this.router.navigate(['/dashboard']), 1500);
        }
        
        this.success = 'Usuario autenticado';
        
    }
}
