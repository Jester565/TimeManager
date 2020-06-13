import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, rootEpic, AppState, INIT_APP_STATE, loadState, saveState } from './redux/root';
import { createEpicMiddleware } from 'redux-observable';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app-material-module/app-material.module';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { SchedulesModule } from './schedules/schedules.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent,
    DashboardListComponent
  ],
  imports: [
    NgxMaterialTimepickerModule,
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
    SchedulesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AngularFirestore, AngularFireAuth],
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
    let appState = loadState();
    ngRedux.configureStore(
      rootReducer,
      (appState)? appState: INIT_APP_STATE,
      [epicMiddleware],
      enhancers);
    epicMiddleware.run(rootEpic);
    let saveSubject = new Subject<any>();
    saveSubject.pipe(throttleTime(1000)).subscribe((state) => {
      saveState(state);
    });
    ngRedux.subscribe(() => {
      saveSubject.next(ngRedux.getState());
    });
  }
}
