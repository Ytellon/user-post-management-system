import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


describe('SidebarMenuComponent', () => {
  let component: SidebarMenuComponent;
  let fixture: ComponentFixture<SidebarMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarMenuComponent],
      imports: [
        RouterModule.forRoot([]),
        MatFormFieldModule,
        MatAutocompleteModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule,
      ],
    });

    fixture = TestBed.createComponent(SidebarMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create the SidebarMenuComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render six navigation links', () => {
    fixture.detectChanges();

    const menuElement = fixture.nativeElement;
    const links = menuElement.querySelectorAll('a');

    expect(links.length).toBe(6);

    expect(links[0].textContent).toContain('Usuários');
    expect(links[0].getAttribute('routerLink')).toBe(null);

    expect(links[1].textContent).toContain('Criar Usuários');
    expect(links[1].getAttribute('routerLink')).toBe('/create-user');

    expect(links[2].textContent).toContain('Todos Usuários');
    expect(links[2].getAttribute('routerLink')).toBe('/users');

    expect(links[3].textContent).toContain('Postagens');
    expect(links[3].getAttribute('routerLink')).toBe('/posts');

    expect(links[4].textContent).toContain('Criar Postagem');
    expect(links[4].getAttribute('routerLink')).toBe('/create-post');

    expect(links[5].textContent).toContain('Todas Postagens');
    expect(links[5].getAttribute('routerLink')).toBe('/posts');
  });
});
