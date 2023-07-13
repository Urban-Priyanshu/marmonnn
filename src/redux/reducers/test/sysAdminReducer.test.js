import { ActionTypes } from '../../constants/action-types';
import reducer from '../sysAdminReducer';

import expect from 'expect';

describe('Get customers data', () => {
  const payload = [
    {
      id: 8,
      groupCode: null,
      customerNumber: 400,
      firstName: 'Bob',
      lastName: 'Cat',
      status: {
        id: 1,
        code: 'A',
        description: 'Active'
      },
      shippingLocations: [
        {
          id: 8,
          customerId: 8,
          address: '22B St, Jacksonville, 32244',
          primary: true,
          priorityNumber: 1,
          customerNumber: 400
        }
      ],
      associatedCustomerNumbers: ''
    }
  ];
  const customersData = [
    {
      id: 8,
      groupCode: null,
      customerNumber: 400,
      firstName: 'Bob',
      lastName: 'Cat',
      status: {
        id: 1,
        code: 'A',
        description: 'Active'
      },
      shippingLocations: [
        {
          id: 8,
          customerId: 8,
          address: '22B St, Jacksonville, 32244',
          primary: true,
          priorityNumber: 1,
          customerNumber: 400
        }
      ],
      associatedCustomerNumbers: ''
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('Authenticate user and return token', () => {
    const type = ActionTypes.GET_CUSTOMERS;
    expect(reducer(undefined, { type, payload })).toEqual({ customersData });
  });
});

describe('Get Customer data', () => {
  const payload = {
    id: 8,
    groupCode: null,
    customerNumber: 400,
    firstName: 'Bob',
    lastName: 'Cat',
    parentCustomerId: null,
    preferredUOM: 'In',
    inventoryROS: '87',
    features: [],
    timeZone: 'PT',
    truckSchedules: [],
    branchNumber: 895,
    containerProgram: 'Container Program 10',
    containerDefaultReceiveFromLocation: 'Container Receive From Location 8',
    containerHomeLocation: 'Container Home Location 8',
    containerDefaultShipToLocation: 'Container Default Shipto Location 8',
    visibleContainerLocations: 'Visible Container Locations 8',
    logo: null,
    createdBy: 'System',
    createdDate: '2022-08-11T12:00:00.000+00:00',
    updatedBy: 'peter.parker@invaliddomain.som',
    updatedDate: '2022-08-23T04:50:45.281+00:00',

    shippingLocations: [
      {
        id: 8,
        customerId: 8,
        address: '22B St, Jacksonville, 32244',
        primary: true,
        priorityNumber: 1,
        customerNumber: 400
      }
    ],
    type: {
      id: 1,
      code: 'I',
      description: 'Internal'
    },
    status: {
      id: 3,
      code: 'RS',
      description: 'Request Sent'
    },
    associatedUsers: {
      customerId: 8,
      userId: 6,
      email: 'lionel@gmail.com',
      firstName: 'messi12',
      lastName: 'leo'
    },
    associatedCustomers: []
  };

  const customerData = {
    id: 8,
    groupCode: null,
    customerNumber: 400,
    firstName: 'Bob',
    lastName: 'Cat',
    parentCustomerId: null,
    preferredUOM: 'In',
    inventoryROS: '87',
    features: [],
    timeZone: 'PT',
    truckSchedules: [],
    branchNumber: 895,
    containerProgram: 'Container Program 10',
    containerDefaultReceiveFromLocation: 'Container Receive From Location 8',
    containerHomeLocation: 'Container Home Location 8',
    containerDefaultShipToLocation: 'Container Default Shipto Location 8',
    visibleContainerLocations: 'Visible Container Locations 8',
    logo: null,
    createdBy: 'System',
    createdDate: '2022-08-11T12:00:00.000+00:00',
    updatedBy: 'peter.parker@invaliddomain.som',
    updatedDate: '2022-08-23T04:50:45.281+00:00',

    shippingLocations: [
      {
        id: 8,
        customerId: 8,
        address: '22B St, Jacksonville, 32244',
        primary: true,
        priorityNumber: 1,
        customerNumber: 400
      }
    ],
    type: {
      id: 1,
      code: 'I',
      description: 'Internal'
    },
    status: {
      id: 3,
      code: 'RS',
      description: 'Request Sent'
    },
    associatedUsers: {
      customerId: 8,
      userId: 6,
      email: 'lionel@gmail.com',
      firstName: 'messi12',
      lastName: 'leo'
    },
    associatedCustomers: []
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_CUSTOMER;
    expect(reducer(undefined, { type, payload })).toEqual({ customerData });
  });
});

describe('Get JOB TITLE  user  reducer', () => {
  const payload = [
    {
      code: 'A',
      description: 'Alpha'
    },
    {
      code: 'B',
      description: 'Bravo'
    }
  ];

  const jobTitles = [
    {
      code: 'A',
      description: 'Alpha'
    },
    {
      code: 'B',
      description: 'Bravo'
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should verify user', () => {
    const type = ActionTypes.GET_ALL_JOB_TITLE;
    expect(reducer(undefined, { type, payload })).toEqual({ jobTitles });
  });
});

describe('Get specific User By TYPE  reducer', () => {
  const payload = [
    {
      id: 1,
      code: 'I',
      description: 'Internal'
    },
    {
      id: 1,
      code: 'CI',
      description: 'Customer Internal'
    }
  ];

  const usersType = [
    {
      id: 1,
      code: 'I',
      description: 'Internal'
    },
    {
      id: 1,
      code: 'CI',
      description: 'Customer Internal'
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_ALL_USER_TYPES;
    expect(reducer(undefined, { type, payload })).toEqual({ usersType });
  });
});

describe('Get Features', () => {
  const payload = [
    {
      id: 1,
      code: 'BF',
      description: 'Base Feature'
    },
    {
      id: 2,
      code: 'BO',
      description: 'Bulk Order'
    }
  ];

  const featuresData = [
    {
      id: 1,
      code: 'BF',
      description: 'Base Feature'
    },
    {
      id: 2,
      code: 'BO',
      description: 'Bulk Order'
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_FEATURES;
    expect(reducer(undefined, { type, payload })).toEqual({ featuresData });
  });
});

describe('Get Customer table data', () => {
  const payload = {
    id: 1,
    groupCode: {
      id: 7,
      code: 7
    },
    branch: {
      id: 39,
      branchNumber: 80,
      branchName: 'Butler'
    },
    customerNumber: 46655,
    customerName: 'CATERPILLAR INC (BAR PROGRAM)',
    parentCustomerId: null,

    shippingLocations: [
      {
        id: 8,
        customerId: 8,
        address: '22B St, Jacksonville, 32244',
        primary: true,
        priorityNumber: 1,
        customerNumber: 400
      }
    ],
    preferredUOM: 'In',
    inventoryROS: '87',
    features: [],
    timeZone: 'PT',
    truckSchedules: [],
    branchNumber: 895,
    containerProgram: 'Container Program 10',
    containerDefaultReceiveFromLocation: 'Container Receive From Location 8',
    containerHomeLocation: 'Container Home Location 8',
    containerDefaultShipToLocation: 'Container Default Shipto Location 8',
    visibleContainerLocations: 'Visible Container Locations 8',
    logo: null,
    createdBy: 'System',
    createdDate: '2022-08-11T12:00:00.000+00:00',
    updatedBy: 'peter.parker@invaliddomain.som',
    updatedDate: '2022-08-23T04:50:45.281+00:00',
    associatedUsers: {
      customerId: 8,
      userId: 6,
      email: 'lionel@gmail.com',
      firstName: 'messi12',
      lastName: 'leo'
    },
    associatedCustomers: [
      {
        customerId: 7,
        customerNumber: 46655,
        customerName: 'CATERPILLAR INC (BAR PROGRAM)',
        branchNumber: 80,
        primary: true
      }
    ]
  };

  const customerTableData = {
    id: 1,
    groupCode: {
      id: 7,
      code: 7
    },
    branch: {
      id: 39,
      branchNumber: 80,
      branchName: 'Butler'
    },
    customerNumber: 46655,
    customerName: 'CATERPILLAR INC (BAR PROGRAM)',
    parentCustomerId: null,

    shippingLocations: [
      {
        id: 8,
        customerId: 8,
        address: '22B St, Jacksonville, 32244',
        primary: true,
        priorityNumber: 1,
        customerNumber: 400
      }
    ],
    preferredUOM: 'In',
    inventoryROS: '87',
    features: [],
    timeZone: 'PT',
    truckSchedules: [],
    branchNumber: 895,
    containerProgram: 'Container Program 10',
    containerDefaultReceiveFromLocation: 'Container Receive From Location 8',
    containerHomeLocation: 'Container Home Location 8',
    containerDefaultShipToLocation: 'Container Default Shipto Location 8',
    visibleContainerLocations: 'Visible Container Locations 8',
    logo: null,
    createdBy: 'System',
    createdDate: '2022-08-11T12:00:00.000+00:00',
    updatedBy: 'peter.parker@invaliddomain.som',
    updatedDate: '2022-08-23T04:50:45.281+00:00',
    associatedUsers: {
      customerId: 8,
      userId: 6,
      email: 'lionel@gmail.com',
      firstName: 'messi12',
      lastName: 'leo'
    },
    associatedCustomers: [
      {
        customerId: 7,
        customerNumber: 46655,
        customerName: 'CATERPILLAR INC (BAR PROGRAM)',
        branchNumber: 80,
        primary: true
      }
    ]
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_CUSTOMER_TABLE_DATA;
    expect(reducer(undefined, { type, payload })).toEqual({
      customerTableData
    });
  });
});

describe('Get Bulk order  data', () => {
  const payload = {
    customerNumber: 19911,
    firstRow: null,
    dueDate: null,
    partNumber: null,
    quantity: null,
    uom: null,
    poNumber: null,
    poLine: null,
    poStatus: null,
    asnNumber: null,
    asnQuantity: null,
    bulkOrderAdditionalConfigurationDtoList: []
  };

  const getBulkOrderData = {
    customerNumber: 19911,
    firstRow: null,
    dueDate: null,
    partNumber: null,
    quantity: null,
    uom: null,
    poNumber: null,
    poLine: null,
    poStatus: null,
    asnNumber: null,
    asnQuantity: null,
    bulkOrderAdditionalConfigurationDtoList: []
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_BULK_ORDER_DATA;
    expect(reducer(undefined, { type, payload })).toEqual({ getBulkOrderData });
  });
});

describe('Get forecast  data', () => {
  const payload = {
    customerNumber: 19911,
    firstDateRow: null,
    firstDateColumn: null,
    partNumber: null,
    quantity: null,
    direction: null,
    poNumber: null,
    uom: null
  };

  const getForecastData = {
    customerNumber: 19911,
    firstDateRow: null,
    firstDateColumn: null,
    partNumber: null,
    quantity: null,
    direction: null,
    poNumber: null,
    uom: null
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_FORECAST_DATA;
    expect(reducer(undefined, { type, payload })).toEqual({ getForecastData });
  });
});

describe('GetBlanket po data', () => {
  const payload = {
    customerNumber: 19911,
    firstDateColumn: null,
    firstRow: null,
    partNumber: null,
    quantity: null,
    poNumber: null,
    endDate: null,
    bpoAdditionalFields: []
  };

  const getBlanketPoData = {
    customerNumber: 19911,
    firstDateColumn: null,
    firstRow: null,
    partNumber: null,
    quantity: null,
    poNumber: null,
    endDate: null,
    bpoAdditionalFields: []
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_BLANKET_PO_DATA;
    expect(reducer(undefined, { type, payload })).toEqual({ getBlanketPoData });
  });
});

describe('GetBlanket po data', () => {
  const payload = {
    customerNumber: 19911,
    firstDateColumn: null,
    firstRow: null,
    partNumber: null,
    quantity: null,
    poNumber: null,
    endDate: null,
    bpoAdditionalFields: []
  };

  const getBlanketPoData = {
    customerNumber: 19911,
    firstDateColumn: null,
    firstRow: null,
    partNumber: null,
    quantity: null,
    poNumber: null,
    endDate: null,
    bpoAdditionalFields: []
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_BLANKET_PO_DATA;
    expect(reducer(undefined, { type, payload })).toEqual({ getBlanketPoData });
  });
});

describe('Get Blanket po history data', () => {
  const payload = [];

  const getBPOUploadHistory = [];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_BPO_UPLOAD_HISTORY;
    expect(reducer(undefined, { type, payload })).toEqual({
      getBPOUploadHistory
    });
  });
});

describe('Get Bulk order history data', () => {
  const payload = [];

  const getBOUploadHistory = [];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_BULK_ORDER_UPLOAD_HISTORY;
    expect(reducer(undefined, { type, payload })).toEqual({
      getBOUploadHistory
    });
  });
});

describe('Get forecasthistory data', () => {
  const payload = [];

  const getForecastHistory = [];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_FORECAST_HISTORY_DATA;
    expect(reducer(undefined, { type, payload })).toEqual({
      getForecastHistory
    });
  });
});

describe('Get External user data', () => {
  const payload = [
    {
      email: 'm@gmail.com',
      firstName: 'monu',
      lastName: 'nvksdn',
      jobType: {
        code: 'V',
        description: 'Vendor'
      },
      jobTitle: 'adcac',
      lastLogin: null,
      customerNumber: 26777,
      status: {
        id: 1,
        code: 'A',
        description: 'Active'
      },
      features: [
        {
          id: 1,
          userId: 16,
          featureId: 2,
          featureCode: 'BO',
          featureDescription: 'Bulk Order'
        }
      ],
      associatedCustomers: [26777]
    }
  ];

  const externalUsers = [
    {
      email: 'm@gmail.com',
      firstName: 'monu',
      lastName: 'nvksdn',
      jobType: {
        code: 'V',
        description: 'Vendor'
      },
      jobTitle: 'adcac',
      lastLogin: null,
      customerNumber: 26777,
      status: {
        id: 1,
        code: 'A',
        description: 'Active'
      },
      features: [
        {
          id: 1,
          userId: 16,
          featureId: 2,
          featureCode: 'BO',
          featureDescription: 'Bulk Order'
        }
      ],
      associatedCustomers: [26777]
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_EXTERNAL_USERS;
    expect(reducer(undefined, { type, payload })).toEqual({ externalUsers });
  });
});

describe('Get all Unassociated customer', () => {
  const payload = [
    {
      id: 1,
      groupCode: null,
      customerNumber: 46720,
      customerName: 'BOBCAT COMPANY',
      status: null,
      shippingLocations: null,
      customerFeatures: null,
      associatedCustomerNumbers: null
    }
  ];

  const unAssociatedCustomers = [
    {
      id: 1,
      groupCode: null,
      customerNumber: 46720,
      customerName: 'BOBCAT COMPANY',
      status: null,
      shippingLocations: null,
      customerFeatures: null,
      associatedCustomerNumbers: null
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_ALL_UNASSOCIATED_CUSTOMERS;
    expect(reducer(undefined, { type, payload })).toEqual({
      unAssociatedCustomers
    });
  });
});

describe('Get customer numbers', () => {
  const payload = [
    {
      customerNumber: 46299
    },
    {
      customerNumber: 2199
    }
  ];

  const customerNumbers = [
    {
      customerNumber: 46299
    },
    {
      customerNumber: 2199
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_CUSTOMER_NUMBERS;
    expect(reducer(undefined, { type, payload })).toEqual({ customerNumbers });
  });
});

describe('Get customer By id', () => {
  const payload = [];

  const customersById = [];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_CUSTOMERS_BY_ID;
    expect(reducer(undefined, { type, payload })).toEqual({ customersById });
  });
});

describe('GET_LOGO_IMAGE', () => {
  const payload =
    '/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAsAMADAREAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAACAkHCgAFBgsE/8QAQRAAAAcBAAECBAMEBQgLAAAAAQIDBAUGBwgJABEKEhMUFRYhFxoiWDF4lpfSGCM4OUG11dckJTIzNHN3mLK2t//EAB0BAQACAgMBAQAAAAAAAAAAAAABCAIDBgcJBAX/xABEEQABAwMCAgUIBQoFBQAAAAABAgMEAAURBiESMQcTQVHwCCJhcYGRoeEVMlax0RQXGCNClZbB1NUWJHOy8TM0UlfC/9oADAMBAAIRAxEAPwC3Z5CO4LfwrTKVozHBv2w0mxzrqs2GYR0c1IVp02o2K8r6LtoFBuIPmVgRQlk0n/3DFNm9jkmaqaisi0Ee1Oiro5hdJd0uFmc1KmwXGLFRNhMrtf0iLgwlZRL4F/SMHqnIpXHUW+F0uturcBSGV56k6Wukuf0YW223hrTP0/bZctyFMfTdTb1W+QpAciBaPo6d1rcpKJCQ4VNJbcaQ2eJT6KU5+8ah/J2P/uBD/kn671/RHc+3qP4ZV/fq6H/S+H2BP8Sj+xUTXIXm8qfTW81DELVho5AN7F5G1u1q6qlcGji1ERFeJrrmOUz2o/bHnfpLso92WRWMeVMwjyNFVH5DpcL1/wCTjcdF6Xn6lh6jTfhbOqdmQUWdUFxEJS+B+Wh0XKbxiMVIW6jqhhnrHStKWznmnR/5S0DWmqbfpqdps2H6U6xmJPVeUzm1TQgrYiLaNuh8BlcKm2nOtOXi20EKU6COP6783c1zT0RpGGwfO8TdGeeyTKJPZZTTXsA5lHasY0evFSxDWjS6TRui5cqtEP8ArJ0ZYrYVjiidQzZH5ui3oMtPSVpxV6RrJ63TY8x6FPtiLI1LMRaMLjq65V2jKcRJjqQ6hfUITxdY0OItKUfq6V+ne99GWpU2RWio1ygyYTE233R2+vQ/yxteW5CeoRZ5KGnI0hC2lt9e4rg6p48IeSkDb+8XXP8AlOrH98sr/wAtPXZX6JEL7eSv4ba/vtdY/pf3T/1/A/ieR/YKYfwT5YorslbXIGxZpG5jdM5prm+wsCzui1mSt1cjklCTCqDl1XIBVo6i3xo9Fyim3egDeSbuAMAFUIXp7pZ6FHujKNabi1eXb1arhJXDkyjbRCXBlBPWtNqbTNlpcD7KXlNEuNEqZWjH7VdzdEPTg30oSrvbJFlj2O72+KmbEiIui5zc+LxBp1YdXAhrbMd5bKXUpadwh5Cx2ppei3xFttKu4TQ5SrSqKS6ySah9ilUznImcSlMdP9mo/IcxQAxie4/KIiX3H29dn2byXLRe7TbrxC6QJLsS5Q2JjC06cZILb7aVgZ+nBukkoUCAQpKgQCMV1ZevKqv1iu9ys07o8hNTLXNkQpCFamkghxhwoJx9AclgBaTuClQIJBBrEviLLkoqkQ3J1ZAp1CEEQ2WV9wAxgARD3zT29/Yf09/09/X3ueSVCQha/wDHko8CFKx/htoZ4QTjP05tnFfnteV5c3HG2zoCAAtaEEjU0gkBSgnIH0AM4znGRnvFa/y0efjofxt9cy/PEJzZlt8qJ6VUrrVLjY7PbouUmGFgarlfJrM40osyjGS7J8w+dEfZT6PuIAYB9Usq8aU8QznG+OXzo+cE8sjzWPD7evJjYM/rMFcc/oe0zs3mEZNSLqtjbs4slgh6rXUph2mlJgS3Mkak6U+cn1mjqwnapHVKimqdWJG+Ofq8eO+lD8H/ABPetdT9hc+c5aNzflVDqO0aCyz17ba7bbc+moiTsLGQaVYzFnJpixci+thoOLcEXEvytHzhRI31iJgKsijAJznHo+dF95mPPTfPGX0tRuec1xOhas5nMZg9Vs8tb7DYolSGXslwu1aioRolCJiic4NKYrKOfrnFYqUmyMBCJqEMoqEpz249nq/Gonxr4iHYrb48Op+7dM53zKqoZPpeZ41itUiLVaTtNN0W4EXfWVnKPJBJR0gxrcI6iJYgxKRlFW7efFZQoMQEihTggZzn0cvG/uoHs3+Lk1+d0KjQl75RyaDpUzbq7FWyaiLzcFpSIr0jLNGcvJsEnjQWijpgxWXdIkcgKJjpACn8Ij6Vl1fp+HzovfJp8SBr3DfZemc157z3lOlU6mQmXzcHdZ+1WyPk5xpoeWU3RPrKtIsgsU0UFLSdo0MiIiq0QRVU9lDnAFQlPEM5xvjl86Aj9746R/lBxD+298/welT1fp+HzrP3vjpH+UHEP7b3z/B6U6v0/D51n73x0j/KDiH9t75/g9KdX6fh86z9746R/lBxD+298/welOr9Pw+dFjw38T/qfTXVOS4jqmA4vlWb3N9Zlbto7e6Ws56ZW6tSLNcpWeU/FgJGkasWteOo9WeGKigz+usIgKYelQUYBOeXo+dRX2J8WnZ47QJ6p8SYTS5agwr1aPZaxtitjeSFzKgcyakvA0CuyNaGtRKxyieLUn56XknzQybl/DQq5jMU1SEd59nzqE8K+Lf6YhbjEp9F875HfM7cPmyU6rmC9lot7jI9VUCO5CIVnJq1VuYcMUTGct4R6whiyaiQMlLDFFX++bqFvuPv/EfgasIdGeYiuqZZjGj8kuIe0UjUafQ9HtGmzFZY3B7QKpo++0zmWp19nm0rqmLw0lfHWxXIYO1fmjWarA55CVa2Tz/8yPGUZXpZWGMc888Y7/G3Yc52oivHl3ra+n565ZPrNZbQujV3NM/3mjWqJrx6jC6rg2n2jQqLW7cenGumkpU+zRV2yy4wk5FxWiXupzUUar3OnW6TibIdhDKHHZ7ueOXd6+4d1Gf1Dg8B0xg2k4rYQQI3utectI16uT6hYiwtBK/rkyUAKYwGi5psyefMQoqAVI3yfxCA+uTaN1NK0fqaz6jh8RctstDrjaTgvxV5blxyTth+OtxvB2yoZ2FcT1vpaJrTS1503LCQi5RFoYdWMiPMbw7DkbZP6mQhtZIGcA43xXniXemWLOrlaaFb41xD2mmWCXrFgi3RPkXYy8I+Xj37c4AIlMBHDdQCKJmOkqn8qqRzpnIc3rHa7lDvNtgXW3vIkQrjEjzYryDlLjElpLrau8HhUApJ3SoFKgCCK8kLnbZlnuM61XBlUedbpb8KWyv6zciM6pp1PpAUk8KhspOFAkEGtRDy8nX5eKnoV64jZiEkmMxEyLRU6DuPk4x0k9YPWq6YlURctHaCLhBVMxTpqpkOQQMUB9fRKjszI0iJJbQ9HlMPRpDLiQpDrD7amnWlpOykONrUhSTsUkg7GvnjvvRZDEqO4tmRGeakR3m1FLjT7DiXWnW1AgpW24lK0KBBSpIIIIozeuZZzuaMB1emCSsjoYC30IGpPZJnb2RUmcwmoUo+yIFfE+7bpmKQCsnyJyFBA6Z/VINEOvdDPTLO0pMcU1Yr84zCZcdylpceW4p2yTFqJ4SWXXFw3HewuPBRHCo1evXDLPTX0J2/VkJtL1/0+y7MebbALqZUNtDV9hpSBxYdabTMQ1+0lDCk5JTxBD6vNVDqlvC9dseFanVdNrDpVu9g13zSQRTOYE5OuT8a8r9nhnKZfcFm8rAScgzEhimFJVRJ0j8jlugqnxXW+loms9LXjTkxKeC4RVJYcIBMeY0Q9CkoJ+qpiS20vYjiQFNq8xageVaJ1TM0Xqqy6lhKV1lsmJcebBITIhupUxNirA2UiREdeb3B4VKS4nC0IUPs3qitqRfF3EMYq9RuTdC01R6kAC3Xj5ZIj0pUjkASCAkWKt7AI+xjqlD+EgAHQHk6anmQze+jW9qcRP07KlO29p0niQwmQW7hDSFHJSzLUZTYG4El0fVCALDeUnpaFN+gulCwpQ5btSRYrVxdZAKHH1Rw5bpqynKeN+GkRnVZ3MZofWKsw83/APEIf+cl/wDMvq0j/wD0Hv8ASc/2Kqqsf/uGP9Zr/emmyfF84IulIcedQxzIBZuW99wO4SP0wAE3yJm2h5uzBUofxndtf2qrGIoIiBI1MUv4QV9vGyvaZHM+rv8A5e7f0UrfEerfyn8Oj2Ngn4iVGUtPY+R0GGIdb2cJMrx+A61OJtU1BH6jZ9C4fOx6qaQAVMHzxf8AQ/zCLx48CpI88HbkfgPjz8YpK2F3GcxDc+etmKzfsl6NqOabHVnJkFEwk0c809B43kY0xvkI8bJWWlysUc6ZxSF/FvmShgOgsUqsjggimc/EEa812TyrdGzEY+TfwlSToGdwiiKhVUSM6pRYFF2CKhDGKKbmacysgAe4CUXglEoCA+6oSNht4Pge6vs8gsq5wTx9eNLiBkoZi8nqPP8AdOzRf6FUc3XcFHUdkBJBMQ+q3e13MFJxwRBcwnI3u5UzJNzIAT0qE4KlH2eOzG23qpbmocz3vK8K5v3qxNzhUOmovSpWlnFAyZCNc3vDuiSKSx1BAyizqRj3jpIAIBDMvt1iCZNYhzqyBySO7FXRPG143/H55iuR8v656BiNFsnRUXBQeA7e6hdIk4ZsFnwOsQGc1R4rHIN10knNiymIz22OTpqCQ7meWKYE1k1kk1aySkkA7Zz4zVOnvjH6Vz92n05iWctnzOh5fsNup1Tayb5STkG8JEPPoMknkgqUijxcqf6HXOUpjj+ogHpWwbgeoVdI4B+Ht8bvQnFXMW3aRTtOeXzUcdptztjqL06VjI9xOTMam5fKs49JmdNmgdUwimgQ5iph+gCPpWsqUCd+09g/Cpd6G+G98YedYNs9/rNJ1ZGxUrLr3aoJZ1qsu6bJS8DWZKTjlHDY7IpHCJHbZIyiJhAqhAEgiAD6kbkDvIoFKJAzzI7B+FUCuZqRA6f0dzvmtrScL1fR9zx+h2ZFo4M0drV+46BXa9NpNXZAMdq5VjZF0RByQpjIKmKqUBEoB6itijgben7if5Ve27Y+HW4txvkfovT+U6DrS++0vJLjNUBqfQ5ixGfKIRaxLJHIwX2qZphzJ1BSwR7aNSE675d0m2borrqpoKK1hRJGTtkdw8Y51RZ5k1ml4VvOa6vouL0noSl0mxIy1ixvRkEl6heGBElkVIqZbu2MoyUKQypXLcklEy0cDtuiL6LfNwUbKK2HcbHGe0VYjm7/APDteRvRatO2+B0zxe3Y0QhATFXo2eUWv4VZ5hRz9ZGUTls6ipuuwzpAip27qw2GpZw3fkTBSRBZ0CKqisPPSOw+88/dzqxdzr4Puac4w+gNueOibrbIqP0eF2mg3ydWr1/pc+zjrhlGoVyvv4aCXg4yx06F1PGKRpcAk2lGp2VsbTAOFHsPYbFDSasCSTv7h49dMr5B4gpHJ7i72lCyTOg6bocdV61O3KaIdkygs+ojuzSNFyzPq397INaZnVTlLrcJeNgmjxyorKWWScvHi6acc3YKE+PHbRt+lRVSvz18t/kjVql09Woz6Vf1giVTvKzZL5UG19r8WX8IfOxAPlIvYa0xMimb3911K65OJQOCiit6PJd1r+X2e4aJlvZk2UquFsStWVLtcl3EhpvfJTFmuhRBHmplpAJAATQnyp9EfRt9t+tYbHDEvoEC5rQnCUXWK1lhxzbAXLhtkJPNZiOKIyFKVXz9WwqptFRzXMtbAS34ZPqlUg9IYqO4BFcQMm0u8WzW+1FqB/cEVJ6OKaNdAn8pnSzOKKYwmbplNWzykdEC96ZY1XBZzdNMEl9bYHWu2h5wF1KlcyIb6hJbOf1SVyFAAKURZryZddGw6of0lOfAtWqiOobdP6pm8st8LK0g+aDNjJMV1J2dU3FB3bAUNU3BvazMydekSnK8iHazRX6hRKdQqZv82sYBD+lUglOYQ/T5hN7f0euf9DmtTrfRFumyXg7dbelNruxJy4uVFbSESHAd+KWx1b5PIrUvHLA696Z9Df4E1zcoEZktWi4KN0tGBhtMWUtalxmz2piPhxgDGQhKM5zk6z12pXU9FDXFFdcwyXpC5yuLfkInsVPUOH/SXNPeujKSUQKnsY66cZKOlzpCInOgzlU25CkasWxAqF02WuXoDXenOlixNcCHpbUe9tICg27Iab6pfWhAwlFztwcju/8Ak8z154nVqULjdBt1idIWg9S9EN/dC1sw35ViccILrMZ10PI6orPnLtlzKJTW5ww+WDhltCCMTQwHWbm9hL7rJe5TB7GIYFCgYhg/2GKICUwf7BAQ9Wnt90iXuyxrtAcDsO4wES47gxu2+x1gBxsFJ4ihY/ZWlSeyqoz7VMsd8k2e4NFmbbbiqHJbIIw4w/1ZKcgEoXgLQcechQPbVw/4jLEP21eKncV2zIXcxjszStshjlTFVRmany5oywuEkygJjHUpdjs7L+EBEpXZjh/2PXj7Xskk4UPdXmWN73Y2ufzGZpvB/KM3ca5e3scYB+UbJVoW1V+Lfl/X2+oSLuEw2MJgEQIt7FEAMcDK243z6CPu8e2nPeT/AJPNgfCPhu0FtGDHvbjzBcW9rXFEpFU5+5aNK9BxrBwqT5k1XbFbYLSgp8xzmEjZMCD9FMoArFJyVev5fy9VL25xzO297dtYzllhdu387v8ArlMrlylmYqEfJ11VwxTuk4iomJDJuo2mxktKJnKdMAXalApye5RBUnzUn0D4/h6O6pE8qvQ0Z053z0fpFWUaHz6MvDvNcsSjgIWIRzTLCFolPNCkSH6ScLIR8GExFJJlTIkxkkUypJ/J8gKJGAOyiu748kvNfVHA/FXImYYNec8uHHsbVa/G36wTlbko2ywiWeBWtCOoxjGbd83lrrb46CuTl0ZY6ZnaEgDhNRZ2VVNQJwSc88+zcH2/Cmm/CS9P/lfbOg+S5iQ+SO1GqRutU5ksqAE/NFCULC2QrNM5igDiQrs0wWdgkB1XKUG2MYASYiYFYrHI+zx8aQL5Zf8AWXdv/wBYrQf95B6VmnkPUPur0tfEl/qzeHv6uWcf7lS9K0q5n1n76IXsD/RR6T/9C9U/+kzXqU8x6x99E8x6x99eSlxH/pmcd/1pedv/ANcp3qK2q5e//aqvWn636kznjHA7x0drUbcZPPM9Si17KlRYVpYLA3aS0qzhUHaMY9lIZuq2Sev2xXSh36X0k1PmApx/hFWkb+PwqmPfGvw8nln6Xj6xmx9+4433Yn8st+e0q3SqFjtltoMXkodSzVqSt1hrjCyWJZBRJorXUKqNjsDhP8UXeSkiK6ytmFJHMY8ePb7aTp5aPFe08ZlyziOhOiqJvNX1JvYnMISGK1jbxWiV1SNBQ1sgmUlLNEmMmnKo/hMq2dpIvHDSSblal+zFQ6skq4s7cvnVlz4RfW9JtGA9U5HYZeVl85y3Qs/nM+byLhw6a1l9oENZvzZCQqjk6gM4p2tVYqa/BmZkmLSUeSsoVsR5Ovl3SsF8x6vHj0Vb59KwrPSlDf1zz5A9Rc8adis6ggY9rgFj11+qQgqQlwijFk6rNtVDAP0VmE01aGUEBAq7M7pmuB2rldM/LdDaqlaL1XZtRxVKzb5aDKaBIEmA9lmbGWB9ZL0ZbiRtlK+BacLQlQ4dr7SUTW+kb1puUlBM+IoxHVAExbgwQ9BlIJ+qpmShtRxstsraXlta0nzzbVWZql2aw0+yMVo2wVeak6/NR7ghk1mcpEPFmD5uoQ4FMUyTlBQnsYAH2AB9v19er9vnRrnBh3GG4l6JOjMy4zqSClxiQ2l1pQIJByhQ5HnXknPhSbbOmW6Y2pmXBkvxJLShhTb8dxTTqCDyKVoIPqrWx0i/iJBjKxbtdhJxjts/j3zY/wBNwzes1iOGrpA/sPyKoLpkVTN7CAGKHuAh+nrdJjMTI78SU0iRGlMuR5DDo4m3mXkFt1pae1C0KUlQ7QTWqNJkQ5DEuI85HlRXm5Ed9pXC6y+ysONOtq/ZW2tKVJPYQKKDodk1vcBTt/gWqDdC2tfw+6MWRPlbRlpaGKjJkIn7nOigR9867RM5xEI98kBjHOn7hSfQj8job6Yrho6Y8tOndQPIixlPq80pfWXbHO4tkl5rjcgSFgJSovOEglDYTeTX0eP01dC9t1pCYbOpdOsrkykMDzg5HbDd+gBOVK6l7q0T4yVKUpHUtJ4hxu8Yp+rvVRWu7zS8vc5u0HbGhAcIsXIt5ePN+qUtAPyCznIlUBAxQB9GquEkVTEUFq6+3epkMs2S9uLa00vC1lpi76dnJHV3CKtLDpAKos1v9bCloOxCo8lDbhAIDiAtpR4HFA8q0TqqdorVNm1JAUestsxtb7QOEyoLh6qdDXsRwyYq3WgopUWnFIeQOsbQR0ex0xtTNDMeJODiq20rW01R+UCgk4jZQEXIIh8oewKpFWIc5BETEOdVEQKKAlDoDyftUy4jGoOjG/ZauunHZrtuQ4fOVEC1ImxEZG4iyP8AMsnOVsSjwjq2hViPKH0pDmSNN9KWn8PWnUrUFq5LaT5qZZQhyFNcwTwqlxv8s8CAEPxE8ZLjxz6EfQWVMNzwvYcakgQ+01HNLrRDKOCgZFstZq9IRLR6cBIoHuxduUHhBFM/ynQKb5De3yjQ+r7cq8+Ft8Kt5NTv26Lx/wA2lijPEknSyWtz5nZY4y5SLqpkDOilM5K2E5yEA5QFUAKBgAfcFbeMdx+H41Z18ynim1bt/iXm3BuegoLTRMBsVSJHFuk66rdeLV2NCXqk6VpKtIWbc/c/XaRItmv2JCOEjLKHVTMiQh1YJVgnPb3Y5+M0nHx//D1+Qrk/Qdf2aff4KlpbHnXWqbz26g9Jm5BKH2TRYQtLhrVKOlKQxPEI1CGmJuxxz9BN8oeYjmDIzT6LtRZFWSlAjG/Pf1e+oi5I+Fn6xgujcjmOry4TYedoa1NJHU63VNLtbmcsNZZoLqqQTIjGsV16kEk5K2aruGk1HOW7c6qqLgpygAqFYxtnPp/5qwvs/wAO74v7Rkem1zKeXa7RNOnKLaYvProXSdodjVrk9hniFbnRayuiSsauWMljtHR0n0Y/amKmILM3CfzJGVjxq7/u/CkO8B/D9+U/ivsbnvplhK86LMsw0OIf3CNYanYDu5rO5kFa5pEG1SUoKSCz6Uo8vPNYr7kwIISx2DwRIdsRQislLBBG/wAPxrTd2/DheRTorsnpXdc9c8+Fo+r65bLtVS2DT5uMmwhZl59dmEpHoUN8izefT/75um8ckTN+gLH/AKfSgWAAMHYYq5DwZitz5x4z5pwjRDQ5rzlGQ1CkWo1ffqykIM1BxybV6MXILtGCzxn9Uo/RcKM2x1C/qKJP6PSsDuSe8mpZ6ApM1pWF7FnlbFmFhvOZXipQYyLgzVgEtYa3IxUeL1yRFwdu1B06S+4WIgsZJL5jlSOIAUZGxB7iKDYg9xFUOObfhlfJTlPQ/Pun2l1zkatZnt2R6BZCxeqzrySNA0q/V6yTQRzVTPmybp8MbGOvs2yjhuRw4+mkZZEpxULFZlYI7e3sHcR3+mr8mrZZQtvzW8ZDqVcZ27O9HrMtUbjW35lk28tBTLVRo9bfXaqoO2bgCKfWZv2Thu+j3iaD1i4bu26KxFa+VUEuu/hWuxs5vEu/5DsVS3vLl3y7itx9ptUPQ9ThmR1/nYx80WVQiadNPGSXsRzNxspCpO1EyuUYRl9YWjZWwL5BXv8AlUF5j8Ml5UdQtLJDT4DO8jhjLIISdpveqQdvfNmAG9jHj4qjPLY5kVECiIkaOH0YmIe/yLgP6CqSsdmT8PHuq8541PHjlHjU5sicHzd46s05Iyrm46lo8o3Tay+hXyRQbtXMqozSMdCJhYmNZsICswbYxk4+GjkFnq8jOvpmYk1aycnNMF9Kis9KVnpSqhXnZ5ORzPa4TpKoRn2tU2tP7K7JN0/Zsx02GbgRaT9iACbclrgkmbpZP5QFaajJeQUVVXkzlTvp5MeulXfT0rRs97jm6eUXrYVqyt2zyF56nfdX5DKUtKTk8LD7LYCUsjPn95UGgk2XUkbWVvZKIGpB1dzCR5jV6joCS6AAAkToqW3FDtkMvuklTxAQp6tJVWKLzlN4yvMy750spkzwesycUhXVVh/ijLsRyk0bJtxEQKmlYI5ZZi59vc5n7KEEnyJlcCetflIaIVeNOxtYW1C03jSy+N9TQwt60OKC3VFSfPDkCQlqS0obIaVKJ87gxZryaNdpsmpZOjrmtCrNqxHVsJdIKGby2koZQEq8wtXCMp2M+k/XdbiY80Lz0/kN5QdcgdL2/O2aLgaHOCW55m8WAwgaoziiiycMZY3uK7mqvgd11ZYxzKukmDWQW+U775C9hdD+uU680Tbbk8tJusFCbXeUA+cZ0RCUGVjbhTOaCJYAHClbjjachvJ636YdCr0Dri6WtpChapri7pZVkHH0fLcWtMbPaqA6XIZJJUtDTbq8F3ABz12lXVtNN4Ax+qdqzrDnO7uQYTtVgrpJ02wj7nXbxj6CffhgimBgUc/k+2naSZ2wKpg+h5EY9MqCbFRwNQOnC1TNAa0sHSxYmyWpEhuFfY6MpQ5IQnq1FxSdkousArjKJSQiQwHTxKeSkXF6C7xE6QNEai6Ib86EvR4652n5SyFLQwpYdCG0qJKnLVcEokgApLsSUplPAmOpRaB52+iOx+XNU5jm+ctGvcFVumaNr3LzeBr7j5ISt9CTitdksXvQoGRVAJ5z+KWBAjlIxVm8RWHq303CaZyFpNV5UgHOezf2Dn/Kkg3rzE9n2fl4LrWekLtQLrt+k4JldRmViSUmlRWHM/MFKm+qrLGRcPEyMwV9p/REu2bHeIMwRkq08fN3Z2qIO1knj7+fj55BIyRjkD9+AN+3G45dnrpjtK1TpvqrrLgiy575BelKPlHaXLV96dseeVt5VxgM/t+EpUat2jLYRuvFKCpByduStLC1GfKLPm8gD1NkqQoB6nHP0DPxA/nUYHCrbdJA7d859XLHPG/dSvcq8j/YEvgnT2iS/eeyrarUci1OYqlSedEYa/TbysXpEJBMHsXjbFH9s0S8h6+uu8Rk5JP8OIj9V6IDHumw+oqSnzgANsjv9u52934083wi711rqOzdb4n0Zsm9SSMJgfM2kUOsdGO6BO67Bu9drdqezOh1Gw5yRWtHz+QMES5go2QdrzKCC9dPKM2EiEr94rA4wOWd+WfRjn7aAvY7j3Vhde8yE228j3UdvU4Fe4vSc2Qn5OsII2E+zRuTT7+xzajWKS/D5athcJJhDjGik2M1KQzwqhzKGGQP/r4DNbAlJ4NvrBRO5/ZCvvIz8KiXP+9ehJbIMqq1i8jGn0qibn1lkeYb/wBITPQPPWqWDnTOV6PabAopBXPPWy8DjZNDlU3jFxJaEmCsaNUJIuwUhouwNXMVgBucp3xsNxn3nPf7qkud8hfZlEtWF1nnbpu6991IebfIGT87NnzfHU7lH5c5lWlf16Xl5qNk4u/WLD2f3DhrZq8kjH3peCKjGqpPAcLiqcDO4xukY58+zn28/RQH2jyteTmk5No+mxe7ahcKI04gwaCuEwEqitMZfrm9/nJ7QNvjVPsgM0cjaMyPSZyRUX+1FG8NWn2Tl87j1WapABIBHPGNyN+EHB35HPPOc86ODX/In1hD7lsGkh2xaKPvOLdoYFz/AIz48gCvGgN0wi1lr8fK3mUoTloe6WV9doaUa38b+2WUi45OWCJZC3dTtPUi3jx42rHA2zyIJz3H4jHZyJyezlRB535b9Ur/AIse95uO6Mrt870zLZtsGj0eyWav2LWKBiLfUM/pshozOiHOeSdVbIqfYbRbWMk9iXUC0UgvuZUHEYg6RMoRuNsDbPMDcAkZ7KD2a8kHVWQxHR2PYh5Brb1BhClV4qnbR21LJ1zQZ/lub3m5xFd19rH2OsM0mJEo2LdWSQYwMmorIVM9SXhkTsrIwsTx08eDU4G2Rg5O2++OzJJ9/wDzXQy3ke3evjWshxDuvZt4qWc92XzM2u0z8pmsxLaJlj7BbfZazGudNy6z2Ws6vBFn6ytaYmxki6g7ZpyLWHdQTZxHLooyNyB3kUABztjzSe3v2O9Qlzb5F+sLPyL0XdpjyL26I25zjdORrhNQ37JLHC1x5O9FZnXLJKxFPplYtGk4nYn9RcOKHX9B1GDUrEHO36MM4cs3krAuijsSO4mhAz9U49AOeXp25/d77HXgg6cuXQmC7vXtA1fVddtWLdAz1JWmtXnM60STgYp1CRD+NqkRuOWuC1PboqNUTfPSXhODrDxdSTMmSDYwhoRBKD/znv8AHjsqFDB9nv8AYSSO7fup5vpWNZ6UrPSlcZe85oGowf5Y0ilVa+137tB/+B2+CjbDFA+agoDZ4VjKtnTcrpAqqpUnBUwVTKqoUpwKocB/Qtt1udmk/llpuM22S+rU1+UwJT0R/ql442+tYW2soVwpKkcXCSASMgV+bdLPab5G/IrzbYN1iBxLoi3CKxMYDqMhDnVPocRxpCiEq4cjJwd6hf8AyLOQv5Y8I/uspn/B/XIPzg67+2WqP37c/wCprjv5uOj/AOxOlf3DbP6athFcg8qwUnHzULzlikVLxLxtIxknH5pUWj+Pfs1SrtXjN0hFEWbOWyxCKoLpHKokoQpyGAwAPrU/rvWspl2NJ1bqSRHfbW08w9eri40604kpW242uQULQtJKVJUCFAkEYrax0f6FivNSY2j9Mx5DDiHmH2bJbmnWXW1BSHG3ERwtC0KAUlSSFJIBBBrt9EwzGNccxzzUspz3RHcOgs2inV0qMHZHEc3cKFVXQZLSzJ0o2RWVKVRRNExCHOAGMAiHv6/OtWo9QWJDzdlvd1tKJCkrfRbp8qEl5aBwoU6I7rYcUkbJKskDYV+nd9Macv62XL5YrReHI6VIYXcrfFmrZQshS0tKkNOFCVKAKgkgEgE71HH+RZyF/LHhH91lM/4P6/W/OFrz7Z6o/ftz/qa/H/Nx0f8A2J0r+4bZ/TV19H5r57zOfRted4jldHszZu5aN7BVKLW4KYQavU/pO26UjGxzd0mi5S/za6ZFQKqT+E4CX9PXwXLVuqbxGMK7ajvlzhqWhxUWfdJsuOpaDlCyy+8tsqQd0qKcpO4Ir77Zo3SVmlJnWjTNhtk1CFoRLgWqFEkJQ4OFaEvMMocCVjZQCsKGxzXb3TNs80hOuJaHRKde06fZ4+7VJO41qGspKvcols+ZxVsrxZlk8CGssa0k5JqwnI4G0m0byD1Fu5TTdLlPx6uS1w1W5n5yo0nETdLwPGajM18lmSgpas5jS4KShU7qAhcU4l7GQrVzHEtYCIWQrRREJsBEJIHID6VOT3nfn6a+yr88YFR3dYf0vEslqT6kx9qiaa8rWd1GCdVOLvUqpO3aNrTiMiGqsGwuE2stMWhnGHat56UVVkJVN07UOqKoqNGnCHETBeVcsePeX2bidZPo2bcNcFy1utMR0moRaRYSiqVWId+yfqpJqvWroyqDpRMh1yHMQogqcnvO243PPvqbIDJstqloc3isZvRK5c3tXhqQ8tsFUoGJsrqmV0qRK/U3M4wYISa9bgyIIEh4NVyaMjSoplZtkQIUAVFaWZwHCrG30hpYMZyuca7GtEudbbS+f1SSQ1BxAosW0GvoSLyJWTua0O3jI1CLVsRZE8ejHskmhkiNUCkVOT3nbl6K4SN4w5Ahadas8huWOdoeh3paKc3SmRWMZ1G1a2OoI66kG6sUCyrqEZMu4VR05UiHUg2XXjVHCx2SiB1TiZTJPMnblvyrrWXN3PMaStpx2FY+xJTqdO55UitM2pzcKxQrQiohZaVX/pQ5Bh6rYkVlkp2AYC3i5ciqpZBq4BQ/upk957+fb31p0OTeWmsDYKs25uwdvWLZX4CpWmuoZJQkoOyVaqOHLur1ueiSQBWEvA1x28eOYGIfoOGEQ4dOVo9u3UXUMZUZPf6fb31u3vOfP0lo8BsMjh+SPtYqjJpHVjS3md1Jze68xj0DtY9rC2taJPORiLBqoo1YkZvUQZtlFEG30klDkMpWgq/JHKtIs8xdaZzTgdSuNiYzkXP2utZDQIOxzkZZ/f8AMkdLzcZX20lJMbB7iE20eOVm8qAiD5NcBH0qck8yT7a2NX5f5spNCtWWU7n/ABerZnezuFLtn1fzGmRFMt53aRUHB7PWWMMhDzxlUCJoGGUZuvZFNNIvsmmQpVMnvNc9D8ZchV9lHR0Hy3zzEMIh+jKRbSOxrPGjePlG8a9h0JNmmhXiFbyKUTJSMYm+TArose/eMwVBu6XTOqK+Sv8AEfGdTRsrercmc2VtC51x3T7ejAYfmkOnaKm/fx0o9rNhJH1luWZgXcnDxMk4iJAHDBZ/Fxzw6BnLJsokqck8yT7amDM8my7FqshR8fzmj5bTGzpy+Qque1WDp9eTfPRIZ4+CIr7FgxF68MmmLp2ZAXDgSEFZQ/yF9lRUgelK/9k=';

  const getLogo = 
    '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';


  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_LOGO_IMAGE;
    expect(reducer(undefined, { type, payload })).toEqual({ getLogo });
  });
});


describe('GET_BPO_EXCEL_DATA', () => {
  const payload ={
   
      content: [
        {
          id: 7281,
          partNumber: '7424888',
          poNumber: 'PONUMBER2',
          quantity: 'qty',
          uom: null,
          price: '13.43',
          effectiveDate: '30/1/2022',
          endDate: '03/31/2022',
          status: [
            'Invalid Format : Quantity',
            'UOM is Empty',
            'Invalid Format : Effective Date',
            'Invalid Part'
          ],
          statusType: [
            'FILE_ERROR',
            'I5_ERROR'
          ],
          uploadUuid: null,
          bpoAdditionalConfigurationDtoList: null
        },
        {
          id: 7280,
          partNumber: '7425733',
          poNumber: '1',
          quantity: '50',
          uom: 'PCS',
          price: '15.07',
          effectiveDate: '01/01/2022',
          endDate: '03/31/2022',
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          bpoAdditionalConfigurationDtoList: null
        }
      ],
      pageable: {
        sort: {
          sorted: true,
          unsorted: false,
          empty: false
        },
        pageNumber: 0,
        pageSize: 10,
        offset: 0,
        paged: true,
        unpaged: false
      },
      last: true,
      totalElements: 2,
      totalPages: 1,
      first: true,
      sort: {
        sorted: true,
        unsorted: false,
        empty: false
      },
      numberOfElements: 2,
      size: 10,
      number: 0,
      empty: false
    
  }

  const getBPOExcelData = {
   
    content: [
      {
        id: 7281,
        partNumber: '7424888',
        poNumber: 'PONUMBER2',
        quantity: 'qty',
        uom: null,
        price: '13.43',
        effectiveDate: '30/1/2022',
        endDate: '03/31/2022',
        status: [
          'Invalid Format : Quantity',
          'UOM is Empty',
          'Invalid Format : Effective Date',
          'Invalid Part'
        ],
        statusType: [
          'FILE_ERROR',
          'I5_ERROR'
        ],
        uploadUuid: null,
        bpoAdditionalConfigurationDtoList: null
      },
      {
        id: 7280,
        partNumber: '7425733',
        poNumber: '1',
        quantity: '50',
        uom: 'PCS',
        price: '15.07',
        effectiveDate: '01/01/2022',
        endDate: '03/31/2022',
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        bpoAdditionalConfigurationDtoList: null
      }
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false
      },
      pageNumber: 0,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false
    },
    last: true,
    totalElements: 2,
    totalPages: 1,
    first: true,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false
    },
    numberOfElements: 2,
    size: 10,
    number: 0,
    empty: false
  
}

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_BPO_EXCEL_DATA;
    expect(reducer(undefined, { type, payload })).toEqual({ getBPOExcelData });
  });
});

describe('FORECAST_COMPARE_ERROR', () => {
  const payload =[
  
      {
        fileName: 'Marmon_Customer_46030_Orders_FC_01-06-2023_10-27-33_H-Forecast.xlsx',
        partErrors: [
          {
            partNumber: 'T355332',
            description: 'TUBE TUBE UPPER VAP',
            purchaseOrderNumber: '0',
            uom: 'LB',
            errors: [
              'Invalid Format : Po Number'
            ],
            errorDetails: [
              {
                cellAddress: 'D10',
                value: '23g22',
                message: 'Invalid Format : Po Number'
              }
            ]
          },
          {
            partNumber: '7425775',
            description: null,
            purchaseOrderNumber: 'null',
            uom: null,
            errors: [
              'Invalid PartNumber'
            ],
            errorDetails: [
              {
                cellAddress: 'A9',
                value: '7425775',
                message: 'Invalid PartNumber'
              }
            ]
          },
          {
            partNumber: '7424870',
            description: null,
            purchaseOrderNumber: 'null',
            uom: null,
            errors: [
              'Invalid PartNumber'
            ],
            errorDetails: [
              {
                cellAddress: 'A12',
                value: '7424870',
                message: 'Invalid PartNumber'
              }
            ]
          },
          {
            partNumber: '7425733',
            description: null,
            purchaseOrderNumber: 'null',
            uom: null,
            errors: [
              'Invalid PartNumber'
            ],
            errorDetails: [
              {
                cellAddress: 'A11',
                value: '7425733',
                message: 'Invalid PartNumber'
              }
            ]
          }
        ]
      },
      {
        fileName: 'H-Forecast.xlsx',
        partErrors: [
          {
            partNumber: 'T355332',
            description: 'TUBE TUBE UPPER VAP',
            purchaseOrderNumber: '0',
            uom: 'LB',
            errors: [
              'Invalid Format : Po Number'
            ],
            errorDetails: [
              {
                cellAddress: 'D10',
                value: '23g22',
                message: 'Invalid Format : Po Number'
              }
            ]
          },
          {
            partNumber: '7425775',
            description: null,
            purchaseOrderNumber: 'null',
            uom: null,
            errors: [
              'Invalid PartNumber'
            ],
            errorDetails: [
              {
                cellAddress: 'A9',
                value: '7425775',
                message: 'Invalid PartNumber'
              }
            ]
          },
          {
            partNumber: '7424870',
            description: null,
            purchaseOrderNumber: 'null',
            uom: null,
            errors: [
              'Invalid PartNumber'
            ],
            errorDetails: [
              {
                cellAddress: 'A12',
                value: '7424870',
                message: 'Invalid PartNumber'
              }
            ]
          },
          {
            partNumber: '7425733',
            description: null,
            purchaseOrderNumber: 'null',
            uom: null,
            errors: [
              'Invalid PartNumber'
            ],
            errorDetails: [
              {
                cellAddress: 'A11',
                value: '7425733',
                message: 'Invalid PartNumber'
              }
            ]
          }
        ]
      }
    ]
  

  const getForecastCompareErrors =[
  
    {
      fileName: 'Marmon_Customer_46030_Orders_FC_01-06-2023_10-27-33_H-Forecast.xlsx',
      partErrors: [
        {
          partNumber: 'T355332',
          description: 'TUBE TUBE UPPER VAP',
          purchaseOrderNumber: '0',
          uom: 'LB',
          errors: [
            'Invalid Format : Po Number'
          ],
          errorDetails: [
            {
              cellAddress: 'D10',
              value: '23g22',
              message: 'Invalid Format : Po Number'
            }
          ]
        },
        {
          partNumber: '7425775',
          description: null,
          purchaseOrderNumber: 'null',
          uom: null,
          errors: [
            'Invalid PartNumber'
          ],
          errorDetails: [
            {
              cellAddress: 'A9',
              value: '7425775',
              message: 'Invalid PartNumber'
            }
          ]
        },
        {
          partNumber: '7424870',
          description: null,
          purchaseOrderNumber: 'null',
          uom: null,
          errors: [
            'Invalid PartNumber'
          ],
          errorDetails: [
            {
              cellAddress: 'A12',
              value: '7424870',
              message: 'Invalid PartNumber'
            }
          ]
        },
        {
          partNumber: '7425733',
          description: null,
          purchaseOrderNumber: 'null',
          uom: null,
          errors: [
            'Invalid PartNumber'
          ],
          errorDetails: [
            {
              cellAddress: 'A11',
              value: '7425733',
              message: 'Invalid PartNumber'
            }
          ]
        }
      ]
    },
    {
      fileName: 'H-Forecast.xlsx',
      partErrors: [
        {
          partNumber: 'T355332',
          description: 'TUBE TUBE UPPER VAP',
          purchaseOrderNumber: '0',
          uom: 'LB',
          errors: [
            'Invalid Format : Po Number'
          ],
          errorDetails: [
            {
              cellAddress: 'D10',
              value: '23g22',
              message: 'Invalid Format : Po Number'
            }
          ]
        },
        {
          partNumber: '7425775',
          description: null,
          purchaseOrderNumber: 'null',
          uom: null,
          errors: [
            'Invalid PartNumber'
          ],
          errorDetails: [
            {
              cellAddress: 'A9',
              value: '7425775',
              message: 'Invalid PartNumber'
            }
          ]
        },
        {
          partNumber: '7424870',
          description: null,
          purchaseOrderNumber: 'null',
          uom: null,
          errors: [
            'Invalid PartNumber'
          ],
          errorDetails: [
            {
              cellAddress: 'A12',
              value: '7424870',
              message: 'Invalid PartNumber'
            }
          ]
        },
        {
          partNumber: '7425733',
          description: null,
          purchaseOrderNumber: 'null',
          uom: null,
          errors: [
            'Invalid PartNumber'
          ],
          errorDetails: [
            {
              cellAddress: 'A11',
              value: '7425733',
              message: 'Invalid PartNumber'
            }
          ]
        }
      ]
    }
  ]
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.FORECAST_COMPARE_ERROR;
    expect(reducer(undefined, { type, payload })).toEqual({ getForecastCompareErrors });
  });
});

describe('GET_PREFFERED_UOM', () => {
  const payload =[
  
      {
        uomCode: 'FT',
        uomName: 'Feet'
      },
      {
        uomCode: 'IN',
        uomName: 'Inches'
      },
      {
        uomCode: 'PCS',
        uomName: 'Pieces'
      },
      {
        uomCode: 'LBS',
        uomName: 'Pounds'
      },
      {
        uomCode: 'M',
        uomName: 'Meters'
      },
      {
        uomCode: 'MM',
        uomName: 'MilliMeters'
      },
      {
        uomCode: 'KG',
        uomName: 'Kilograms'
      },
      {
        uomCode: 'TON',
        uomName: 'Tons'
      },
      {
        uomCode: 'PARTS',
        uomName: 'Parts'
      }
    ]
  

  const getUomData =[
  
    {
      uomCode: 'FT',
      uomName: 'Feet'
    },
    {
      uomCode: 'IN',
      uomName: 'Inches'
    },
    {
      uomCode: 'PCS',
      uomName: 'Pieces'
    },
    {
      uomCode: 'LBS',
      uomName: 'Pounds'
    },
    {
      uomCode: 'M',
      uomName: 'Meters'
    },
    {
      uomCode: 'MM',
      uomName: 'MilliMeters'
    },
    {
      uomCode: 'KG',
      uomName: 'Kilograms'
    },
    {
      uomCode: 'TON',
      uomName: 'Tons'
    },
    {
      uomCode: 'PARTS',
      uomName: 'Parts'
    }
  ]
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_PREFFERED_UOM;
    expect(reducer(undefined, { type, payload })).toEqual({ getUomData });
  });
});

describe('GET_PREFFERED_TIMEZONE', () => {
  const payload =[
  
      {
        timezoneName: 'Pacific Time',
        timezoneCode: 'PT'
      },
      {
        timezoneName: 'Mountain Time',
        timezoneCode: 'MT'
      },
      {
        timezoneName: 'Central Time',
        timezoneCode: 'CT'
      },
      {
        timezoneName: 'Eastern Time',
        timezoneCode: 'ET'
      },
      {
        timezoneName: 'UTC',
        timezoneCode: 'UTC'
      }
    ]
  
  

  const getTimezoneData =[
  
    {
      timezoneName: 'Pacific Time',
      timezoneCode: 'PT'
    },
    {
      timezoneName: 'Mountain Time',
      timezoneCode: 'MT'
    },
    {
      timezoneName: 'Central Time',
      timezoneCode: 'CT'
    },
    {
      timezoneName: 'Eastern Time',
      timezoneCode: 'ET'
    },
    {
      timezoneName: 'UTC',
      timezoneCode: 'UTC'
    }
  ]

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_PREFFERED_TIMEZONE;
    expect(reducer(undefined, { type, payload })).toEqual({ getTimezoneData });
  });
});

describe('GET_FORECAST_EXCEL_DATA', () => {
  const payload ={
  
      content: [
        {
          id: 48,
          customerNumber: 46030,
          partNumber: '7424870',
          poNumber: '123456',
          quantity: '10',
          uom: 'LBS',
          dueDate: '12/19/2022',
          originalQty: null,
          originalUom: null,
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          forecastAdditionalConfigurationList: null
        },
        {
          id: 47,
          customerNumber: 46030,
          partNumber: '7424870',
          poNumber: '123456',
          quantity: '100',
          uom: 'LBS',
          dueDate: '12/26/2022',
          originalQty: null,
          originalUom: null,
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          forecastAdditionalConfigurationList: null
        },
        {
          id: 44,
          customerNumber: 46030,
          partNumber: '7424870',
          poNumber: '123456',
          quantity: '200',
          uom: 'LBS',
          dueDate: '01/02/2023',
          originalQty: null,
          originalUom: null,
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          forecastAdditionalConfigurationList: null
        },
        {
          id: 43,
          customerNumber: 46030,
          partNumber: '7424870',
          poNumber: '123456',
          quantity: '100',
          uom: 'LBS',
          dueDate: '01/09/2023',
          originalQty: null,
          originalUom: null,
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          forecastAdditionalConfigurationList: null
        },
        {
          id: 49,
          customerNumber: 46030,
          partNumber: '7424870',
          poNumber: '123456',
          quantity: '200',
          uom: 'LBS',
          dueDate: '01/16/2023',
          originalQty: null,
          originalUom: null,
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          forecastAdditionalConfigurationList: null
        },
        {
          id: 45,
          customerNumber: 46030,
          partNumber: '7424870',
          poNumber: '123456',
          quantity: '200',
          uom: 'LBS',
          dueDate: '01/23/2023',
          originalQty: null,
          originalUom: null,
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          forecastAdditionalConfigurationList: null
        },
        {
          id: 46,
          customerNumber: 46030,
          partNumber: '7424870',
          poNumber: '123456',
          quantity: '200',
          uom: 'LBS',
          dueDate: '01/30/2023',
          originalQty: null,
          originalUom: null,
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          forecastAdditionalConfigurationList: null
        },
        {
          id: 55,
          customerNumber: 46030,
          partNumber: '7425733',
          poNumber: 'aduag',
          quantity: '10',
          uom: 'lbs',
          dueDate: '12/19/2022',
          originalQty: null,
          originalUom: null,
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          forecastAdditionalConfigurationList: null
        },
        {
          id: 54,
          customerNumber: 46030,
          partNumber: '7425733',
          poNumber: 'aduag',
          quantity: '100',
          uom: 'lbs',
          dueDate: '12/26/2022',
          originalQty: null,
          originalUom: null,
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          forecastAdditionalConfigurationList: null
        },
        {
          id: 51,
          customerNumber: 46030,
          partNumber: '7425733',
          poNumber: 'aduag',
          quantity: '100',
          uom: 'lbs',
          dueDate: '01/02/2023',
          originalQty: null,
          originalUom: null,
          status: [
            'Invalid Part'
          ],
          statusType: [
            'I5_ERROR'
          ],
          uploadUuid: null,
          forecastAdditionalConfigurationList: null
        }
      ],
      pageable: {
        sort: {
          sorted: true,
          unsorted: false,
          empty: false
        },
        pageNumber: 0,
        pageSize: 10,
        offset: 0,
        paged: true,
        unpaged: false
      },
      last: false,
      totalElements: 28,
      totalPages: 3,
      first: true,
      sort: {
        sorted: true,
        unsorted: false,
        empty: false
      },
      numberOfElements: 10,
      size: 10,
      number: 0,
      empty: false
    }
  
  

  const getForecastExcelData ={
  
    content: [
      {
        id: 48,
        customerNumber: 46030,
        partNumber: '7424870',
        poNumber: '123456',
        quantity: '10',
        uom: 'LBS',
        dueDate: '12/19/2022',
        originalQty: null,
        originalUom: null,
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        forecastAdditionalConfigurationList: null
      },
      {
        id: 47,
        customerNumber: 46030,
        partNumber: '7424870',
        poNumber: '123456',
        quantity: '100',
        uom: 'LBS',
        dueDate: '12/26/2022',
        originalQty: null,
        originalUom: null,
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        forecastAdditionalConfigurationList: null
      },
      {
        id: 44,
        customerNumber: 46030,
        partNumber: '7424870',
        poNumber: '123456',
        quantity: '200',
        uom: 'LBS',
        dueDate: '01/02/2023',
        originalQty: null,
        originalUom: null,
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        forecastAdditionalConfigurationList: null
      },
      {
        id: 43,
        customerNumber: 46030,
        partNumber: '7424870',
        poNumber: '123456',
        quantity: '100',
        uom: 'LBS',
        dueDate: '01/09/2023',
        originalQty: null,
        originalUom: null,
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        forecastAdditionalConfigurationList: null
      },
      {
        id: 49,
        customerNumber: 46030,
        partNumber: '7424870',
        poNumber: '123456',
        quantity: '200',
        uom: 'LBS',
        dueDate: '01/16/2023',
        originalQty: null,
        originalUom: null,
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        forecastAdditionalConfigurationList: null
      },
      {
        id: 45,
        customerNumber: 46030,
        partNumber: '7424870',
        poNumber: '123456',
        quantity: '200',
        uom: 'LBS',
        dueDate: '01/23/2023',
        originalQty: null,
        originalUom: null,
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        forecastAdditionalConfigurationList: null
      },
      {
        id: 46,
        customerNumber: 46030,
        partNumber: '7424870',
        poNumber: '123456',
        quantity: '200',
        uom: 'LBS',
        dueDate: '01/30/2023',
        originalQty: null,
        originalUom: null,
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        forecastAdditionalConfigurationList: null
      },
      {
        id: 55,
        customerNumber: 46030,
        partNumber: '7425733',
        poNumber: 'aduag',
        quantity: '10',
        uom: 'lbs',
        dueDate: '12/19/2022',
        originalQty: null,
        originalUom: null,
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        forecastAdditionalConfigurationList: null
      },
      {
        id: 54,
        customerNumber: 46030,
        partNumber: '7425733',
        poNumber: 'aduag',
        quantity: '100',
        uom: 'lbs',
        dueDate: '12/26/2022',
        originalQty: null,
        originalUom: null,
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        forecastAdditionalConfigurationList: null
      },
      {
        id: 51,
        customerNumber: 46030,
        partNumber: '7425733',
        poNumber: 'aduag',
        quantity: '100',
        uom: 'lbs',
        dueDate: '01/02/2023',
        originalQty: null,
        originalUom: null,
        status: [
          'Invalid Part'
        ],
        statusType: [
          'I5_ERROR'
        ],
        uploadUuid: null,
        forecastAdditionalConfigurationList: null
      }
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false
      },
      pageNumber: 0,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false
    },
    last: false,
    totalElements: 28,
    totalPages: 3,
    first: true,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false
    },
    numberOfElements: 10,
    size: 10,
    number: 0,
    empty: false
  }


  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_FORECAST_EXCEL_DATA;
    expect(reducer(undefined, { type, payload })).toEqual({ getForecastExcelData });
  });
});

describe('GET_BULK_EXCEL_DATA', () => {
  const payload ={
  
      content: [
        {
          id: 42724,
          customerNumber: 46030,
          dueDate: '12/12/2022',
          partNumber: 'T159212',
          quantity: '1',
          uom: 'Ft',
          poNumber: '9336',
          poLine: null,
          poStatus: null,
          asnNumber: null,
          asnQuantity: null,
          status: [
            'Insufficient Inventory'
          ],
          statusType: [
            'I5_ERROR'
          ],
          specialRemarks: null,
          shippingLocationId: null,
          purchaseOrderNumber: null,
          inventoryList: [
            {
              branchNumber: 1,
              branchName: 'Monterrey',
              quantity: 0.53,
              uom: 'PCS',
              actualQuantity: 53,
              actualUom: 'PCS',
              ros: 1
            }
          ],
          afterOrder: -11,
          isBPO: false,
          uploadUuid: null,
          bulkOrderAdditionalConfigurationList: null
        }
      ],
      pageable: {
        sort: {
          sorted: true,
          unsorted: false,
          empty: false
        },
        pageNumber: 0,
        pageSize: 10,
        offset: 0,
        paged: true,
        unpaged: false
      },
      last: true,
      totalElements: 1,
      totalPages: 1,
      first: true,
      sort: {
        sorted: true,
        unsorted: false,
        empty: false
      },
      numberOfElements: 1,
      size: 10,
      number: 0,
      empty: false
    
  }
  
  

  const getBulkExcelData ={
  
    content: [
      {
        id: 42724,
        customerNumber: 46030,
        dueDate: '12/12/2022',
        partNumber: 'T159212',
        quantity: '1',
        uom: 'Ft',
        poNumber: '9336',
        poLine: null,
        poStatus: null,
        asnNumber: null,
        asnQuantity: null,
        status: [
          'Insufficient Inventory'
        ],
        statusType: [
          'I5_ERROR'
        ],
        specialRemarks: null,
        shippingLocationId: null,
        purchaseOrderNumber: null,
        inventoryList: [
          {
            branchNumber: 1,
            branchName: 'Monterrey',
            quantity: 0.53,
            uom: 'PCS',
            actualQuantity: 53,
            actualUom: 'PCS',
            ros: 1
          }
        ],
        afterOrder: -11,
        isBPO: false,
        uploadUuid: null,
        bulkOrderAdditionalConfigurationList: null
      }
    ],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false
      },
      pageNumber: 0,
      pageSize: 10,
      offset: 0,
      paged: true,
      unpaged: false
    },
    last: true,
    totalElements: 1,
    totalPages: 1,
    first: true,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false
    },
    numberOfElements: 1,
    size: 10,
    number: 0,
    empty: false
  
}



  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_BULK_EXCEL_DATA;
    expect(reducer(undefined, { type, payload })).toEqual({ getBulkExcelData });
  });
});

describe('GET_FORECAST_HISTORYID', () => {
  const payload ={
 
      id: 94
    }
  
  

  const getForecastHistoryId ={
 
    id: 94
  }



  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_FORECAST_HISTORYID;
    expect(reducer(undefined, { type, payload })).toEqual({ getForecastHistoryId });
  });
});

describe('GET_BULK_HISTORYID', () => {
  const payload ={
 
      id: 94
    }
  
  

  const getBulkHistoryId ={
 
    id: 94
  }



  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_BULK_HISTORYID;
    expect(reducer(undefined, { type, payload })).toEqual({ getBulkHistoryId });
  });
});


describe('GET_BPO_HISTORYID', () => {
  const payload ={
 
      id: 94
    }
  
  

  const getBpoHistoryId ={
 
    id: 94
  }



  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_BPO_HISTORYID;
    expect(reducer(undefined, { type, payload })).toEqual({ getBpoHistoryId });
  });
});




