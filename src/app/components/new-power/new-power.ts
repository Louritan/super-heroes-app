import { Component } from '@angular/core';
import { SuperPowersService } from '../../services/super-powers.service';
import { RegisterSuperPower } from '../../types/super-power';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-power',
  imports: [FormsModule],
  templateUrl: './new-power.html',
  styleUrl: './new-power.css'
})
export class NewPower {
  constructor(
    private superPowersService: SuperPowersService,
    private toastr: ToastrService,
  ) { }

  superPower: RegisterSuperPower = {
    name: '',
    description: '',
  };

  postSuperPower() {
    this.superPowersService.postSuperPower(this.superPower).subscribe({
      next: (_response) => {
        this.toastr.success('Poder cadastrado com sucesso!');
        this.superPower = {
          name: '',
          description: '',
        };
      },
      error: (error) => {
        this.toastr.error('Falha ao cadastrar poder.');
      },
    });
  }

  goBack() {
    window.history.back();
  }
}
