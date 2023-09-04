import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';



describe('SidebarMenuComponent', () => {
  let component: SidebarMenuComponent;
  let fixture: ComponentFixture<SidebarMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarMenuComponent],
      imports: [RouterModule.forRoot([]), MatFormFieldModule, MatAutocompleteModule, MatSidenavModule],
    });

    fixture = TestBed.createComponent(SidebarMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create the SidebarMenuComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render two navigation links', () => {
    fixture.detectChanges();

    const menuElement = fixture.nativeElement;
    const links = menuElement.querySelectorAll('a');

    expect(links.length).toBe(2);

    expect(links[0].textContent).toContain('Users');
    expect(links[0].getAttribute('routerLink')).toBe('/users');

    expect(links[1].textContent).toContain('Posts');
    expect(links[1].getAttribute('routerLink')).toBe('/posts');
  });
});