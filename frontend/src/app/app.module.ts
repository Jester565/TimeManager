import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, rootEpic, AppState, INIT_APP_STATE } from './redux/root';
import { createEpicMiddleware } from 'redux-observable';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ConfirmCancelDialog } from './common/confirm-cancel-dialog';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { WidgetComponent } from './widget/widget.component';
import { WidgetConfigComponent } from './widget-config/widget-config.component';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  declarations: [
    AppComponent,
    DashboardListComponent,
    DashboardComponent,
    ConfirmCancelDialog,
    DashboardBodyComponent,
    DashboardHeaderComponent,
    WidgetComponent,
    WidgetConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //immediate registration required for progressive web app caching
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    BrowserAnimationsModule,
    NgReduxModule,
    DragDropModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    GridsterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private ngRedux: NgRedux<AppState>, 
  private devTools: DevToolsExtension) {
    const epicMiddleware = createEpicMiddleware();
    let enhancers = [];
    if (devTools.isEnabled()) {
      enhancers = [ ...enhancers, devTools.enhancer() ];
    }
    ngRedux.configureStore(
      rootReducer,
      INIT_APP_STATE,
      [epicMiddleware],
      enhancers);
    epicMiddleware.run(rootEpic);
  }
}
