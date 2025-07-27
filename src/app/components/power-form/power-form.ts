import { Component } from '@angular/core';
import { SuperPowersService } from '../../services/super-powers.service';
import { RegisterSuperPower } from '../../types/super-power';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SweetAlert } from '../../lib/swal';

@Component({
  selector: 'app-power-form',
  imports: [FormsModule],
  templateUrl: './power-form.html',
  styleUrl: './power-form.css'
})
export class PowerForm {
  constructor(
    private superPowersService: SuperPowersService,
    private toastr: ToastrService,
  ) { }

  superPower: RegisterSuperPower = {
    name: '',
    description: '',
  };

  submitting: boolean = false;

  handleSubmit() {
    let errors: string[] = [];

    if (!this.superPower.name) {
      errors.push('O poder precisa de um nome.');
    }

    if (!this.superPower.description) {
      errors.push('O poder precisa de uma descrição.');
    }

    if (errors.length) {
      SweetAlert({
        title: 'Falha ao cadastrar poder',
        html: errors.map(e => `• ${e}`).join('<br>'),
        icon: 'error',
      });
      return;
    }

    this.postSuperPower();
  }

  postSuperPower() {
    this.submitting = true;
    this.superPowersService.postSuperPower(this.superPower).subscribe({
      next: (_response) => {
        this.superPower = {
          name: '',
          description: '',
        };
        this.submitting = false;
        this.toastr.success('Poder cadastrado com sucesso!');
      },
      error: (error) => {
        this.submitting = false;

        if (error.error.errorMessages) {
          const html = error.error.errorMessages.join('<br>');
          this.toastr.error(html, 'Erro', { enableHtml: true });
          return;
        }

        this.toastr.error('Falha ao cadastrar super-poder!');
      },
    });
  }

  goBack() {
    window.history.back();
  }
}
