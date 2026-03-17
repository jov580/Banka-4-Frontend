import api from './client';

const DELAY = 600;

const delay = ms => new Promise(r => setTimeout(r, ms));

const FAKE_CLIENTS = [
  { id: 1,  first_name: 'Marija',     last_name: 'Ković',     email: 'marija.kovic@raf.rs',      phone: '+381601234567', address: 'Knez Mihailova 10, Beograd',      active: true  },
  { id: 2,  first_name: 'Nikola',     last_name: 'Savić',     email: 'nikola.savic@raf.rs',       phone: '+381602345678', address: 'Bulevar Oslobođenja 5, Novi Sad', active: true  },
  { id: 3,  first_name: 'Jelena',     last_name: 'Milić',     email: 'jelena.milic@raf.rs',     phone: '+381603456789', address: 'Nemanjina 15, Beograd',           active: true  },
  { id: 4,  first_name: 'Stefan',     last_name: 'Đorđević',  email: 'stefan.djordjevic@raf.rs',  phone: '+381604567890', address: 'Cara Dušana 20, Kragujevac',      active: false },
  { id: 5,  first_name: 'Ana',        last_name: 'Todorović', email: 'ana.todorovic@raf.rs',      phone: '+381605678901', address: 'Terazije 8, Beograd',             active: true  },
  { id: 6,  first_name: 'Miloš',      last_name: 'Petrović',  email: 'milos.petrovic@raf.rs',     phone: '+381606789012', address: 'Savska 30, Beograd',              active: true  },
  { id: 7,  first_name: 'Ivana',      last_name: 'Jovanović', email: 'ivana.jovanovic@raf.rs',    phone: '+381607890123', address: 'Vojvode Stepe 42, Beograd',       active: true  },
  { id: 8,  first_name: 'Aleksandar', last_name: 'Nikolić',   email: 'aleksandar.nikolic@raf.rs',       phone: '+381608901234', address: 'Balkanska 12, Beograd',           active: false },
  { id: 9,  first_name: 'Maja',       last_name: 'Stanković', email: 'maja.stankovic@raf.rs',     phone: '+381609012345', address: 'Obilićev venac 4, Beograd',       active: true  },
  { id: 10, first_name: 'Vladimir',   last_name: 'Marković',  email: 'vladimir.markovic@raf.rs',    phone: '+381610123456', address: 'Makedonska 22, Beograd',          active: true  },
];

const FAKE_EMPLOYEE = {
  employee_id:   1,
  first_name:    'Petar',
  last_name:     'Petrović',
  email:         'petar.petrovic@rafbank.rs',
  username:      'ppetrovic',
  gender:        'M',
  date_of_birth: '1985-03-15',
  phone_number:  '+381601234567',
  address:       'Knez Mihailova 10, Beograd',
  department:    'Management',
  position_id:   1,
  active:        true,
  is_admin:      true,
};

const FAKE_EMPLOYEES = [
  { employee_id: 1, first_name: 'Petar',   last_name: 'Petrović',  email: 'petar.petrovic@rafbank.rs',    username: 'ppetrovic',  position_id: 1, department: 'Management', active: true,  gender: 'M', date_of_birth: '1985-03-15', phone_number: '+381601234567', address: 'Knez Mihailova 10' },
  { employee_id: 2, first_name: 'Ana',     last_name: 'Jovanović', email: 'ana.jovanovic@rafbank.rs',     username: 'ajovanovic', position_id: 2, department: 'Finance',    active: true,  gender: 'F', date_of_birth: '1990-07-22', phone_number: '+381601234568', address: 'Bulevar Kralja Aleksandra 5' },
  { employee_id: 3, first_name: 'Marko',   last_name: 'Nikolić',   email: 'marko.nikolic@rafbank.rs',     username: 'mnikolic',   position_id: 3, department: 'IT',         active: true,  gender: 'M', date_of_birth: '1992-11-03', phone_number: '+381601234569', address: 'Nemanjina 15' },
  { employee_id: 4, first_name: 'Jelena',  last_name: 'Đorđević',  email: 'jelena.djordjevic@rafbank.rs', username: 'jdjordjevic', position_id: 4, department: 'Finance',    active: false, gender: 'F', date_of_birth: '1988-01-10', phone_number: '+381601234570', address: 'Cara Dušana 20' },
  { employee_id: 5, first_name: 'Stefan',  last_name: 'Popović',   email: 'stefan.popovic@rafbank.rs',    username: 'spopovic',   position_id: 5, department: 'IT',         active: true,  gender: 'M', date_of_birth: '1995-05-18', phone_number: '+381601234571', address: 'Terazije 8' },
  { employee_id: 6, first_name: 'Milica',  last_name: 'Stanković', email: 'milica.stankovic@rafbank.rs',  username: 'mstankovic', position_id: 6, department: 'HR',         active: true,  gender: 'F', date_of_birth: '1991-09-25', phone_number: '+381601234572', address: 'Savska 30' },
  { employee_id: 7, first_name: 'Nikola',  last_name: 'Ilić',      email: 'nikola.ilic@rafbank.rs',       username: 'nilic',      position_id: 7, department: 'IT',         active: false, gender: 'M', date_of_birth: '1993-12-07', phone_number: '+381601234573', address: 'Vojvode Stepe 42' },
  { employee_id: 8, first_name: 'Ivana',   last_name: 'Marković',  email: 'ivana.markovic@rafbank.rs',    username: 'imarkovic',  position_id: 8, department: 'Finance',    active: true,  gender: 'F', date_of_birth: '1989-04-14', phone_number: '+381601234574', address: 'Balkanska 12' },
];

api.interceptors.request.use(async config => {
  await delay(DELAY);

  const { method, url, data: rawData, params } = config;
  const data = typeof rawData === 'string' ? JSON.parse(rawData || '{}') : rawData ?? {};
  const path = url?.replace(import.meta.env.VITE_API_URL ?? '', '') ?? '';

  if (method === 'post' && path === '/auth/login') {
    if (data.username && data.password) {
      return throwFakeResponse(config, {
        access_token: 'fake-jwt-token-123',
        expires_in:   3600,
        employee:     FAKE_EMPLOYEE,
      });
    }
    return throwFakeError(config, 401, 'Pogrešan username ili lozinka.');
  }

  // CLIENT LOGIN
  if (method === 'post' && path === '/client/login') {
    if (data.email && data.password) {
      const client = FAKE_CLIENTS.find(c => c.email === data.email);
      if (client && data.password) { // U produkciji bi se proveravala prava lozinka
        return throwFakeResponse(config, {
          user: {
            id: client.id,
            first_name: client.first_name,
            last_name: client.last_name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            role: 'client' // Važno: označava da je klijent
          },
          token: 'fake-client-jwt-token-456',
          refresh_token: 'fake-client-refresh-token-789'
        });
      }
    }
    return throwFakeError(config, 401, 'Pogrešan email ili lozinka.');
  }

  // EMPLOYEE LOGIN (stari endpoint koji vraća employee podatke)
  if (method === 'post' && path === '/login') {
    if (data.email && data.password) {
      const employee = FAKE_EMPLOYEES.find(e => e.email === data.email);
      if (employee && data.password) {
        return throwFakeResponse(config, {
          user: {
            employee_id: employee.employee_id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            username: employee.username,
            position_id: employee.position_id,
            department: employee.department,
            role: 'employee', // Važno: označava da je zaposleni
            permissions: ['employee.view', 'employee.create', 'employee.edit', 'employee.delete', 'client.view']
          },
          token: 'fake-employee-jwt-token-123',
          refresh_token: 'fake-employee-refresh-token-456'
        });
      }
    }
    return throwFakeError(config, 401, 'Pogrešan email ili lozinka.');
  }

  if (method === 'post' && path === '/auth/register') {
    const novi = { employee_id: Date.now(), ...data };
    FAKE_EMPLOYEES.push(novi);
    return throwFakeResponse(config, { data: novi, message: 'Zaposleni je kreiran.' }, 201);
  }

  if (method === 'post' && path === '/auth/activate') {
    return throwFakeResponse(config, { message: 'Nalog je aktiviran.' });
  }

  if (method === 'post' && path === '/auth/forgot-password') {
    return throwFakeResponse(config, { message: 'Email je poslat.' });
  }

  if (method === 'post' && path === '/auth/reset-password') {
    return throwFakeResponse(config, { message: 'Lozinka je promenjena.' });
  }

  if (method === 'post' && path === '/employees/change-password') {
    return throwFakeResponse(config, { message: 'Lozinka je uspešno promenjena.' });
  }

  const idMatch = path.match(/^\/employees\/(\d+)$/);

  if (method === 'get' && idMatch) {
    const emp = FAKE_EMPLOYEES.find(e => e.employee_id === Number(idMatch[1]));
    if (emp) {
      return throwFakeResponse(config, { data: emp });
    }
    return throwFakeError(config, 404, 'Zaposleni nije pronađen.');
  }

  if (method === 'put' && idMatch) {
    const idx = FAKE_EMPLOYEES.findIndex(e => e.employee_id === Number(idMatch[1]));
    if (idx !== -1) {
      Object.assign(FAKE_EMPLOYEES[idx], data);
      return throwFakeResponse(config, { data: FAKE_EMPLOYEES[idx], message: 'Zaposleni je ažuriran.' });
    }
    return throwFakeError(config, 404, 'Zaposleni nije pronađen.');
  }

  if (method === 'delete' && idMatch) {
    const idx = FAKE_EMPLOYEES.findIndex(e => e.employee_id === Number(idMatch[1]));
    if (idx !== -1) {
      FAKE_EMPLOYEES.splice(idx, 1);
      return throwFakeResponse(config, { message: 'Zaposleni je obrisan.' });
    }
    return throwFakeError(config, 404, 'Zaposleni nije pronađen.');
  }

  if (method === 'get' && path === '/employees') {
    let filtered = [...FAKE_EMPLOYEES];

    if (params?.email) {
      filtered = filtered.filter(e => e.email.toLowerCase().includes(params.email.toLowerCase()));
    }
    if (params?.first_name) {
      filtered = filtered.filter(e => e.first_name.toLowerCase().includes(params.first_name.toLowerCase()));
    }
    if (params?.last_name) {
      filtered = filtered.filter(e => e.last_name.toLowerCase().includes(params.last_name.toLowerCase()));
    }
    if (params?.position) {
      filtered = filtered.filter(e => String(e.position_id).includes(params.position));
    }

    const page      = Number(params?.page)      || 1;
    const pageSize  = Number(params?.page_size)  || 20;
    const start     = (page - 1) * pageSize;
    const sliced    = filtered.slice(start, start + pageSize);

    return throwFakeResponse(config, {
      data:        sliced,
      total:       filtered.length,
      page,
      page_size:   pageSize,
      total_pages: Math.ceil(filtered.length / pageSize),
    });
  }

  // ── CLIENTS API ──────────────────────────────────────────────
  if (method === 'get' && path === '/clients') {
    let filtered = [...FAKE_CLIENTS];
    if (params?.email)      filtered = filtered.filter(c => c.email.toLowerCase().includes(params.email.toLowerCase()));
    if (params?.first_name) filtered = filtered.filter(c => c.first_name.toLowerCase().includes(params.first_name.toLowerCase()));
    if (params?.last_name)  filtered = filtered.filter(c => c.last_name.toLowerCase().includes(params.last_name.toLowerCase()));

    const page      = Number(params?.page)      || 1;
    const pageSize  = Number(params?.page_size)  || 20;
    const start     = (page - 1) * pageSize;
    const sliced    = filtered.slice(start, start + pageSize);
    return throwFakeResponse(config, {
      data:        sliced,
      total:       filtered.length,
      page,
      page_size:   pageSize,
      total_pages: Math.ceil(filtered.length / pageSize),
    });
  }

  const clientIdMatch = path.match(/^\/clients\/(\d+)$/);
  if (method === 'get' && clientIdMatch) {
    const client = FAKE_CLIENTS.find(c => c.id === Number(clientIdMatch[1]));
    if (client) return throwFakeResponse(config, { data: client });
    return throwFakeError(config, 404, 'Klijent nije pronađen.');
  }

  // ── CLIENT PORTAL API ────────────────────────────────────────
  if (method === 'get' && path === '/client/accounts') {
    const fakeAccounts = [
      { id: 1, name: 'Tekući račun (RSD)', number: '160-0000000001-82', currency: 'RSD', balance: 125450.50, type: 'checking' },
      { id: 2, name: 'Devizni račun (EUR)', number: '160-0000000002-83', currency: 'EUR', balance: 3200.00, type: 'foreign' },
      { id: 3, name: 'Štedni račun (RSD)', number: '160-0000000003-84', currency: 'RSD', balance: 50000.00, type: 'savings' }
    ];
    return throwFakeResponse(config, { data: fakeAccounts });
  }

  if (method === 'get' && path === '/client/transactions') {
    const fakeTransactions = [
      { id: 1, description: 'Plata za Februar 2025', date: '2025-02-28', amount: 85000, type: 'credit', account_id: 1 },
      { id: 2, description: 'Plaćanje - Telekom Srbija', date: '2025-03-05', amount: 3500, type: 'debit', account_id: 1 },
      { id: 3, description: 'Uplata sa tekućeg', date: '2025-03-10', amount: 10000, type: 'credit', account_id: 3 },
      { id: 4, description: 'Podizanje gotovine - Bankomat', date: '2025-03-12', amount: 5000, type: 'debit', account_id: 1 },
      { id: 5, description: 'Konverzija EUR → RSD', date: '2025-03-15', amount: 12300, type: 'credit', account_id: 1 }
    ];
    return throwFakeResponse(config, { data: fakeTransactions });
  }

  if (method === 'get' && path === '/client/recipients') {
    const fakeRecipients = [
      { id: 1, name: 'Elektrodistribucija Srbije', initials: 'ED', account: '160-0001111111-11' },
      { id: 2, name: 'Telekom Srbija', initials: 'TS', account: '160-0002222222-22' },
      { id: 3, name: 'SBB Internet', initials: 'SB', account: '160-0003333333-33' },
      { id: 4, name: 'Stambena Zajednica', initials: 'SZ', account: '160-0004444444-44' }
    ];
    return throwFakeResponse(config, { data: fakeRecipients });
  }

  if (method === 'get' && path === '/client/rates') {
    const fakeRates = [
      { currency: 'EUR', buy: 116.50, sell: 117.50 },
      { currency: 'USD', buy: 105.20, sell: 106.80 },
      { currency: 'CHF', buy: 128.40, sell: 130.00 }
    ];
    return throwFakeResponse(config, { data: fakeRates });
  }

  return config;
});

function throwFakeResponse(config, responseData, status = 200) {
  config.adapter = () =>
    Promise.resolve({
      data:    responseData,
      status,
      headers: {},
      config,
      request: {},
    });
  return config;
}

function throwFakeError(config, status, errorMsg) {
  config.adapter = () =>
    Promise.reject({
      response: {
        status,
        data: { error: errorMsg },
      },
      config,
    });
  return config;
}
