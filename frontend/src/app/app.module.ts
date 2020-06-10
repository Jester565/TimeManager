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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app-material-module/app-material.module';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    DashboardListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //immediate registration required for progressive web app caching
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    BrowserAnimationsModule,
    NgReduxModule,
    DragDropModule,
    FlexLayoutModule,
    AppMaterialModule,
    CommonModule,
    DashboardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
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
