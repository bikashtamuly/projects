import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SearchonlineComponent } from './searchonline.component';

describe('SearchonlineComponent', () => {
  let component: SearchonlineComponent;
  let fixture: ComponentFixture<SearchonlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,        
        HttpClientTestingModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule
      ],
      declarations: [ SearchonlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
