import { Component } from '@angular/core';
import { Equipment } from './interfaces/equipment';
import { EQUIPMENTS } from './mock-heroes';
import { DATA } from './mock-data';
import { UPGRADES } from './mock-upgrades';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  equipments = EQUIPMENTS;
  data = DATA;
  upgrades = UPGRADES;

  calculateDamage() {
    this.data.totalDamage = 0;
    for (let i = 0; i < this.equipments.length; i++) {
      this.data.totalDamage += this.equipments[i].damage;
    }
  }

  calculateMonsterLife() {
    setInterval(() => {
      this.data.monsterlife -= this.data.totalDamage;
      console.log(this.data.monsterlife);
      if (this.data.monsterlife <= 0) {
        this.data.monsterKilled += 1;
        this.data.monsterlife = Math.round(
          50 * (1 + this.data.monsterKilled / 4)
        );
        console.log(50 * (1 + this.data.monsterKilled / 2));
        this.data.gold += Math.round(10 * (1 + this.data.monsterKilled / 4));
      }
    }, 1000);
  }

  increaseLevel(equipment: Equipment) {
    if (equipment.cost <= this.data.gold) {
      this.data.gold -= equipment.cost;
      equipment.level = equipment.level + 1;
      equipment.damage = equipment.damage + equipment.damageIncrease;
      equipment.cost = equipment.cost + equipment.costIncrease;
      this.calculateDamage();
    }
  }

  dealDamage() {
    this.data.monsterlife -= this.data.totalDamage;
    if (this.data.monsterlife <= 0) {
      this.data.monsterKilled += 1;
      this.data.monsterlife = Math.round(
        50 * (1 + this.data.monsterKilled / 4)
      );
      this.data.gold += Math.round(10 * (1 + this.data.monsterKilled / 4));
    }
  }

  constructor() {
    this.calculateDamage();
    //this.calculateMonsterLife();
  }
}
