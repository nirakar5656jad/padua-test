import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { InputFormComponent } from './components/input-form/cbp.input-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectionChartComponent } from './components/projection-chart/cbp.projection-chart.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { ProjectionGridComponent } from './components/projection-grid/cbp.projection-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { CBPDataSharingService } from './services/cbp.data.sharing.service';
import { CBPPageComponent } from './Pages/capital-balance-projection/cbp.page.component';
import { CBPAppbarComponent } from './components/appbar/cbp.appbar.component';
/** Import end here. */

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent, // import components
    ProjectionChartComponent,
    ProjectionGridComponent,
    CBPPageComponent,
    CBPAppbarComponent, // component import ends
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule, // mat module imports
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule, // mat module imports ends
    ReactiveFormsModule,
    ChartsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [ThemeService, CBPDataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
