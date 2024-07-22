export type DataRow = {
  id: string
  created: string
  invoice: {
    number: string
    date: string
    status: string
  }
  customer: {
    initial: string
    name: string
    email: string
  }
}

// For test pagination to removed after finish
export const rows: DataRow[] = [
  {
    id: '1234',
    created: '2023-02-03T10:00:00Z',
    invoice: {
      number: '1234',
      date: 'Feb 3, 2023',
      status: 'Refunded',
    },
    customer: {
      initial: 'O',
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
  },
  {
    id: '1233',
    created: '2023-02-03T11:00:00Z',
    invoice: {
      number: '1233',
      date: 'Feb 3, 2023',
      status: 'Paid',
    },
    customer: {
      initial: 'S',
      name: 'Steve Hampton',
      email: 'steve.hamp@email.com',
    },
  },
  {
    id: '1232',
    created: '2023-02-03T12:00:00Z',
    invoice: {
      number: '1232',
      date: 'Feb 3, 2023',
      status: 'Refunded',
    },
    customer: {
      initial: 'C',
      name: 'Ciaran Murray',
      email: 'ciaran.murray@email.com',
    },
  },
  {
    id: '1231',
    created: '2023-02-03T13:00:00Z',
    invoice: {
      number: '1231',
      date: 'Feb 3, 2023',
      status: 'Refunded',
    },
    customer: {
      initial: 'M',
      name: 'Maria Macdonald',
      email: 'maria.mc@email.com',
    },
  },
  {
    id: '1230',
    created: '2023-02-03T14:00:00Z',
    invoice: {
      number: '1230',
      date: 'Feb 3, 2023',
      status: 'Cancelled',
    },
    customer: {
      initial: 'C',
      name: 'Charles Fulton',
      email: 'fulton@email.com',
    },
  },
  {
    id: '1229',
    created: '2023-02-03T15:00:00Z',
    invoice: {
      number: '1229',
      date: 'Feb 3, 2023',
      status: 'Cancelled',
    },
    customer: {
      initial: 'J',
      name: 'Jay Hooper',
      email: 'hooper@email.com',
    },
  },
  {
    id: '1228',
    created: '2023-02-03T16:00:00Z',
    invoice: {
      number: '1228',
      date: 'Feb 3, 2023',
      status: 'Refunded',
    },
    customer: {
      initial: 'K',
      name: 'Krystal Stevens',
      email: 'k.stevens@email.com',
    },
  },
  {
    id: '1227',
    created: '2023-02-03T17:00:00Z',
    invoice: {
      number: '1227',
      date: 'Feb 3, 2023',
      status: 'Paid',
    },
    customer: {
      initial: 'S',
      name: 'Sachin Flynn',
      email: 's.flyn@email.com',
    },
  },
  {
    id: '1226',
    created: '2023-02-03T18:00:00Z',
    invoice: {
      number: '1226',
      date: 'Feb 3, 2023',
      status: 'Cancelled',
    },
    customer: {
      initial: 'B',
      name: 'Bradley Rosales',
      email: 'brad123@email.com',
    },
  },
  {
    id: '1225',
    created: '2023-02-03T19:00:00Z',
    invoice: {
      number: '1225',
      date: 'Feb 3, 2023',
      status: 'Paid',
    },
    customer: {
      initial: 'O',
      name: 'Olivia Ryhe',
      email: 'olivia@email.com',
    },
  },
  {
    id: '1224',
    created: '2023-02-03T20:00:00Z',
    invoice: {
      number: '1224',
      date: 'Feb 3, 2023',
      status: 'Cancelled',
    },
    customer: {
      initial: 'S',
      name: 'Steve Hampton',
      email: 'steve.hamp@email.com',
    },
  },
  {
    id: '1223',
    created: '2023-02-03T21:00:00Z',
    invoice: {
      number: '1223',
      date: 'Feb 3, 2023',
      status: 'Paid',
    },
    customer: {
      initial: 'C',
      name: 'Ciaran Murray',
      email: 'ciaran.murray@email.com',
    },
  },
  {
    id: '1221',
    created: '2023-02-03T22:00:00Z',
    invoice: {
      number: '1221',
      date: 'Feb 3, 2023',
      status: 'Refunded',
    },
    customer: {
      initial: 'M',
      name: 'Maria Macdonald',
      email: 'maria.mc@email.com',
    },
  },
  {
    id: '1220',
    created: '2023-02-03T23:00:00Z',
    invoice: {
      number: '1220',
      date: 'Feb 3, 2023',
      status: 'Paid',
    },
    customer: {
      initial: 'C',
      name: 'Charles Fulton',
      email: 'fulton@email.com',
    },
  },
  {
    id: '1219',
    created: '2023-02-04T00:00:00Z',
    invoice: {
      number: '1219',
      date: 'Feb 3, 2023',
      status: 'Cancelled',
    },
    customer: {
      initial: 'J',
      name: 'Jay Hooper',
      email: 'hooper@email.com',
    },
  },
  {
    id: '1218',
    created: '2023-02-04T01:00:00Z',
    invoice: {
      number: '1218',
      date: 'Feb 3, 2023',
      status: 'Cancelled',
    },
    customer: {
      initial: 'K',
      name: 'Krystal Stevens',
      email: 'k.stevens@email.com',
    },
  },
  {
    id: '1217',
    created: '2023-02-04T02:00:00Z',
    invoice: {
      number: '1217',
      date: 'Feb 3, 2023',
      status: 'Paid',
    },
    customer: {
      initial: 'S',
      name: 'Sachin Flynn',
      email: 's.flyn@email.com',
    },
  },
  {
    id: '1216',
    created: '2023-02-04T03:00:00Z',
    invoice: {
      number: '1216',
      date: 'Feb 3, 2023',
      status: 'Cancelled',
    },
    customer: {
      initial: 'B',
      name: 'Bradley Rosales',
      email: 'brad123@email.com',
    },
  },
  {
    id: '2217',
    created: '2023-02-04T02:00:00Z',
    invoice: {
      number: '1217',
      date: 'Feb 3, 2023',
      status: 'Paid',
    },
    customer: {
      initial: 'S',
      name: 'Sachin Flynn',
      email: 's.flyn@email.com',
    },
  },
  {
    id: '1316',
    created: '2023-02-04T03:00:00Z',
    invoice: {
      number: '1216',
      date: 'Feb 3, 2023',
      status: 'Cancelled',
    },
    customer: {
      initial: 'B',
      name: 'Bradley Rosales',
      email: 'brad123@email.com',
    },
  },
  {
    id: '1316',
    created: '2023-02-04T03:00:00Z',
    invoice: {
      number: '1216',
      date: 'Feb 3, 2023',
      status: 'Cancelled',
    },
    customer: {
      initial: 'B',
      name: 'Bradley Rosales',
      email: 'brad123@email.com',
    },
  },
  {
    id: '1316',
    created: '2023-02-04T03:00:00Z',
    invoice: {
      number: '1216',
      date: 'Feb 3, 2023',
      status: 'Cancelled',
    },
    customer: {
      initial: 'B',
      name: 'Bradley Rosales',
      email: 'brad123@email.com',
    },
  },
]
