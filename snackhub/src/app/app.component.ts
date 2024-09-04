import { Component, OnInit } from '@angular/core';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) {}

  public ngOnInit(): void {
    var instance = this.keycloak.getKeycloakInstance();

    from(this.keycloak.keycloakEvents$).subscribe((event: any) => {
      if (event.type == KeycloakEventType.OnTokenExpired) {
        this.keycloak.isLoggedIn().then((result) => {
          if (!result) {
          } else {
            this.keycloak.updateToken(20);
          }
        });
      }
      if (event.type == KeycloakEventType.OnAuthRefreshSuccess) {
      }
    });
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}
