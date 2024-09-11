import { TestBed } from '@angular/core/testing';

import { InformacionusuarioService } from './informacionusuario.service';

describe('InformacionusuarioService', () => {
  let service: InformacionusuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformacionusuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
