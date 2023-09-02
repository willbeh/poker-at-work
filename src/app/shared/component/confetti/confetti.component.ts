import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgParticlesModule } from 'ng-particles';
import { Container, Engine } from 'tsparticles-engine';
import { confetti } from 'tsparticles-confetti';

@Component({
  selector: 'app-confetti',
  standalone: true,
  imports: [CommonModule, NgParticlesModule,],
  templateUrl: './confetti.component.html',
  styles: [
  ]
})
export class ConfettiComponent implements OnChanges {
  @Input({required: true}) load = false;

  id = "tsparticles";

  particlesOptions = {};

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['load'].currentValue) {
      this.particlesInit()
    }
  }
  async particlesInit(): Promise<void> {

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    // await loadFull(engine);
    await confetti(this.id);
  }
}
