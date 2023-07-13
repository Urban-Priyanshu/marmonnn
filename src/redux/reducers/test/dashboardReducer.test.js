

import { ActionTypes } from '../../constants/action-types';
import reducer from '../dashboardReducer';

// import { UPDATE_POST_SUCCESS } from '../actions/posts/updatePost';
import expect from 'expect';


describe('GET_DASHBOARD_DATA reducer  state', () => {

    
    const payload= {
      
          customerNumbers: [
            44291,
            16135,
            46356,
            17172,
            24858,
            20003,
            13607,
            17191,
            34346,
            32810,
            24107,
            1838,
            46130,
            45362,
            42803,
            46132,
            35641,
            23611,
            46655,
            32071,
            36943,
            30288,
            32339,
            37462,
            1111,
            44891,
            14940,
            3168,
            11111,
            26730,
            21100,
            20588,
            25197,
            111,
            13680,
            112,
            18039,
            40826,
            32894,
            46720,
            34690,
            22402,
            25733,
            45704,
            29578,
            29836,
            46479,
            31887,
            46481,
            21908,
            43156,
            30870,
            26777,
            32925,
            27553,
            29864,
            24490,
            46252,
            23213,
            45998,
            44975,
            26544,
            35505,
            12212,
            42424,
            1722,
            26557,
            31940,
            26566,
            19911,
            23239,
            45772,
            46284,
            46030,
            32206,
            29393,
            28886,
            3546,
            46299,
            44251,
            221,
            23774,
            15583,
            5347,
            4324,
            21989,
            29671,
            28136,
            14313,
            46314,
            26090,
            45548,
            46317,
            43501,
            36848,
            24560,
            30192,
            30708,
            30965,
            45563,
            39678
          ],
          customerNames: [
            'BUSH HOG',
            'KICE INDUSTRIES, INC.',
            'TIME MFG',
            'SPUDNIK EQUIPMENT CO INC',
            'BOBCAT COMPANY (GWINNER)',
            'BOBCAT COMPANY (WAHPETON)',
            'CATERPILLAR INC (BAR PROGRAM)',
            'JOHN DEERE MEXICO, SARL',
            'ELITE STRENGTH EQUIPMENT DBA KABUKI STRENGTH',
            'BOBCAT COMPANY (WAHPETON)',
            'CATERPILLAR INC (BAR PROGRAM)',
            'BOBCAT COMPANY',
            'ALLEGION',
            'A.O. PRECISION MANUFACTURING LLC',
            'AERO-MOD INC',
            'ADVANCED FLOW ENGINEERING, INC.',
            'ATCO PRODUCTS INC',
            'BLUE BIRD BODY',
            'CATERPILLAR INDUSTRIAS DE MEXICO, S.R.L. de C.V.',
            'CATERPILLAR INC (E PEORIA)',
            'CATERPILLAR INC (DECATUR)',
            'CATERPILLAR PAVING PRODUCTS',
            'CATERPILLAR INDIA PRIVATE LIMITED',
            'CATERPILLAR INC (OEM)',
            'CATERPILLAR INC (MORTON)',
            'CATERPILLAR (THAILAND)LIMITED',
            'CAT GLOBAL MINING, LLC.',
            'CATERPILLAR INDUSTRIAS MEXICO XE11',
            'CBI OFFROAD FAB LLC',
            'CUSTOM MARINE INC',
            'DYNACRAFT A PACCAR COMPANY',
            'EXTREME MANUFACTURING LLC',
            'FAB FOURS',
            'FAST INTENTIONS INC',
            'FIREFLY EQUIPMENT LLC',
            'GIBSON PERFORMANCE CORP',
            'GOODRIDGE USA INC',
            'GRADALL INDUSTRIES, INC',
            'HANNAY REELS INC',
            'HOUSTON CASING SPECIALTIES LLC',
            'HYCOM',
            'ICON HEALTH & FITNESS INC',
            'IDAHO STEEL PRODUCTS CORP',
            'JOHN BEAN TECHNOLOGIES CORPORATION',
            'KEWAUNEE FABRICATIONS',
            'KOLBERG-PIONEER INC.',
            'LIFTMOORE INCORPORATED',
            'ADVANCED DESIGN CONSULTING INC',
            'MC LANAHAN CORPORATION',
            'MACHINE SERVICE INCORPORATED',
            'MARTIN SPROCKET & GEAR',
            'MAXON LIFT CORPORATION',
            'MORTON INDUSTRIES LLC',
            'NEW STANDARD',
            'NUCOR BUILDING SYSTEMS - UTAH LLC',
            'PI COMPONENTS CORP',
            'PT COUPLING CO.',
            'WATTS HEATING & HOT WATER SOLUTIONS LLC',
            'RAYMOND CORPORATION',
            'ROGUE FITNESS',
            'SONNAX TRANSMISSION COMPANY',
            'SPECIALTY PRODUCTS DESIGN INC',
            'BUSHWICK METALS, INC.',
            'TRANE TECHNOLOGIES LLC',
            'UNION TANK CAR (ALEXANDRIA)',
            'UNITED SAFETY APPARATUS',
            'INDUSTRIAL MAINTENANCE OF TOPEKA INC',
            'WABTEC TRANSPORTATION SYSTEMS, LLC (5712)',
            'WABTEC TRANSPORTATION SYSTEMS, LLC (9608)',
            'WABTEC TRANSPORTATION SYSTEMS LLC',
            'WARN INDUSTRIES, INC',
            'WATTS REGULATOR CO',
            'PROVIDES US INC',
            'WERK-BRAU CO INC',
            'A&C METAL-SAWING, INC.',
            'AUL PIPE & TUBING INC',
            'B & B SURPLUS INC',
            'BOYER STEEL, INC.',
            'BURGAFLEX NORTH AMERICA, INC.',
            'COHEN STEEL SUPPLY',
            'ENERGY SUSPENSION',
            'HARMAR MOBILITY',
            'HARSH INTERNATIONAL INC',
            'IPACO INCORPORATED',
            'JLG INDUSTRIES INC (4313)',
            'MC KNIGHT STEEL & TUBE CO.  (1)',
            'METAL SUPERMARKETS / KENT',
            'MICRO-MOTION INCORPORATED',
            'MOSS INC.',
            'ROCKY MOUNTAIN MACH SHOP INC',
            'SPECIALTY METALS CORPORATION',
            'SUMMIT STEEL INC',
            'TRIANGLE ENGINEERING INC',
            'UNIVERSAL MOORECRAFT',
            'MICON WEST',
            'ANNISTON WINDUSTRIAL -657',
            'STEEL CITY RECYCLING',
            'Test COMPANY',
            'ALTERNATIVE METALS LLC',
            'CITY OF NORTH ROYALTON',
            'JC MACHINE INCORPORATED'
          ],
          totalOrdersCount: [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          ordersCountByStatus: [
            0,
            0,
            0
          ],
          ordersCountBySource: [
            2,
            0
          ],
          dashBoardOrders: [
            {
              customerNumber: 46720,
              customerName: 'BOBCAT COMPANY',
              placedOrdersCount: 4,
              orderPlacedBy: 'peter.parker@invaliddomain.som',
              dateRequested: '2022-01-11T00:00:00',
              orderCreatedBy: 'peter.parker@invaliddomain.som',
              orderCreatedAt: '2023-01-08T22:21:26.212',
              orderStatus: 'PL'
            },
            {
              customerNumber: 46030,
              customerName: 'JOHN DEERE MEXICO, SARL',
              placedOrdersCount: 10,
              orderPlacedBy: 'Deepanshu.Tyagi@compunneldigital.com',
              dateRequested: '2022-01-12T00:00:00',
              orderCreatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
              orderCreatedAt: '2023-01-05T09:09:53.264',
              orderStatus: 'PL'
            }
          ]
     
      }


      const portalchartData = {
      
        customerNumbers: [
          44291,
          16135,
          46356,
          17172,
          24858,
          20003,
          13607,
          17191,
          34346,
          32810,
          24107,
          1838,
          46130,
          45362,
          42803,
          46132,
          35641,
          23611,
          46655,
          32071,
          36943,
          30288,
          32339,
          37462,
          1111,
          44891,
          14940,
          3168,
          11111,
          26730,
          21100,
          20588,
          25197,
          111,
          13680,
          112,
          18039,
          40826,
          32894,
          46720,
          34690,
          22402,
          25733,
          45704,
          29578,
          29836,
          46479,
          31887,
          46481,
          21908,
          43156,
          30870,
          26777,
          32925,
          27553,
          29864,
          24490,
          46252,
          23213,
          45998,
          44975,
          26544,
          35505,
          12212,
          42424,
          1722,
          26557,
          31940,
          26566,
          19911,
          23239,
          45772,
          46284,
          46030,
          32206,
          29393,
          28886,
          3546,
          46299,
          44251,
          221,
          23774,
          15583,
          5347,
          4324,
          21989,
          29671,
          28136,
          14313,
          46314,
          26090,
          45548,
          46317,
          43501,
          36848,
          24560,
          30192,
          30708,
          30965,
          45563,
          39678
        ],
        customerNames: [
          'BUSH HOG',
          'KICE INDUSTRIES, INC.',
          'TIME MFG',
          'SPUDNIK EQUIPMENT CO INC',
          'BOBCAT COMPANY (GWINNER)',
          'BOBCAT COMPANY (WAHPETON)',
          'CATERPILLAR INC (BAR PROGRAM)',
          'JOHN DEERE MEXICO, SARL',
          'ELITE STRENGTH EQUIPMENT DBA KABUKI STRENGTH',
          'BOBCAT COMPANY (WAHPETON)',
          'CATERPILLAR INC (BAR PROGRAM)',
          'BOBCAT COMPANY',
          'ALLEGION',
          'A.O. PRECISION MANUFACTURING LLC',
          'AERO-MOD INC',
          'ADVANCED FLOW ENGINEERING, INC.',
          'ATCO PRODUCTS INC',
          'BLUE BIRD BODY',
          'CATERPILLAR INDUSTRIAS DE MEXICO, S.R.L. de C.V.',
          'CATERPILLAR INC (E PEORIA)',
          'CATERPILLAR INC (DECATUR)',
          'CATERPILLAR PAVING PRODUCTS',
          'CATERPILLAR INDIA PRIVATE LIMITED',
          'CATERPILLAR INC (OEM)',
          'CATERPILLAR INC (MORTON)',
          'CATERPILLAR (THAILAND)LIMITED',
          'CAT GLOBAL MINING, LLC.',
          'CATERPILLAR INDUSTRIAS MEXICO XE11',
          'CBI OFFROAD FAB LLC',
          'CUSTOM MARINE INC',
          'DYNACRAFT A PACCAR COMPANY',
          'EXTREME MANUFACTURING LLC',
          'FAB FOURS',
          'FAST INTENTIONS INC',
          'FIREFLY EQUIPMENT LLC',
          'GIBSON PERFORMANCE CORP',
          'GOODRIDGE USA INC',
          'GRADALL INDUSTRIES, INC',
          'HANNAY REELS INC',
          'HOUSTON CASING SPECIALTIES LLC',
          'HYCOM',
          'ICON HEALTH & FITNESS INC',
          'IDAHO STEEL PRODUCTS CORP',
          'JOHN BEAN TECHNOLOGIES CORPORATION',
          'KEWAUNEE FABRICATIONS',
          'KOLBERG-PIONEER INC.',
          'LIFTMOORE INCORPORATED',
          'ADVANCED DESIGN CONSULTING INC',
          'MC LANAHAN CORPORATION',
          'MACHINE SERVICE INCORPORATED',
          'MARTIN SPROCKET & GEAR',
          'MAXON LIFT CORPORATION',
          'MORTON INDUSTRIES LLC',
          'NEW STANDARD',
          'NUCOR BUILDING SYSTEMS - UTAH LLC',
          'PI COMPONENTS CORP',
          'PT COUPLING CO.',
          'WATTS HEATING & HOT WATER SOLUTIONS LLC',
          'RAYMOND CORPORATION',
          'ROGUE FITNESS',
          'SONNAX TRANSMISSION COMPANY',
          'SPECIALTY PRODUCTS DESIGN INC',
          'BUSHWICK METALS, INC.',
          'TRANE TECHNOLOGIES LLC',
          'UNION TANK CAR (ALEXANDRIA)',
          'UNITED SAFETY APPARATUS',
          'INDUSTRIAL MAINTENANCE OF TOPEKA INC',
          'WABTEC TRANSPORTATION SYSTEMS, LLC (5712)',
          'WABTEC TRANSPORTATION SYSTEMS, LLC (9608)',
          'WABTEC TRANSPORTATION SYSTEMS LLC',
          'WARN INDUSTRIES, INC',
          'WATTS REGULATOR CO',
          'PROVIDES US INC',
          'WERK-BRAU CO INC',
          'A&C METAL-SAWING, INC.',
          'AUL PIPE & TUBING INC',
          'B & B SURPLUS INC',
          'BOYER STEEL, INC.',
          'BURGAFLEX NORTH AMERICA, INC.',
          'COHEN STEEL SUPPLY',
          'ENERGY SUSPENSION',
          'HARMAR MOBILITY',
          'HARSH INTERNATIONAL INC',
          'IPACO INCORPORATED',
          'JLG INDUSTRIES INC (4313)',
          'MC KNIGHT STEEL & TUBE CO.  (1)',
          'METAL SUPERMARKETS / KENT',
          'MICRO-MOTION INCORPORATED',
          'MOSS INC.',
          'ROCKY MOUNTAIN MACH SHOP INC',
          'SPECIALTY METALS CORPORATION',
          'SUMMIT STEEL INC',
          'TRIANGLE ENGINEERING INC',
          'UNIVERSAL MOORECRAFT',
          'MICON WEST',
          'ANNISTON WINDUSTRIAL -657',
          'STEEL CITY RECYCLING',
          'Test COMPANY',
          'ALTERNATIVE METALS LLC',
          'CITY OF NORTH ROYALTON',
          'JC MACHINE INCORPORATED'
        ],
        totalOrdersCount: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        ordersCountByStatus: [
          0,
          0,
          0
        ],
        ordersCountBySource: [
          2,
          0
        ],
        dashBoardOrders: [
          {
            customerNumber: 46720,
            customerName: 'BOBCAT COMPANY',
            placedOrdersCount: 4,
            orderPlacedBy: 'peter.parker@invaliddomain.som',
            dateRequested: '2022-01-11T00:00:00',
            orderCreatedBy: 'peter.parker@invaliddomain.som',
            orderCreatedAt: '2023-01-08T22:21:26.212',
            orderStatus: 'PL'
          },
          {
            customerNumber: 46030,
            customerName: 'JOHN DEERE MEXICO, SARL',
            placedOrdersCount: 10,
            orderPlacedBy: 'Deepanshu.Tyagi@compunneldigital.com',
            dateRequested: '2022-01-12T00:00:00',
            orderCreatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
            orderCreatedAt: '2023-01-05T09:09:53.264',
            orderStatus: 'PL'
          }
        ]
   
    }
    

      
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });


  it('should return UsersData', () => {
    const type =ActionTypes.GET_DASHBOARD_DATA;
    expect(reducer(undefined, {type , payload })).toEqual({portalchartData});
  });


  


});

describe('GET_EXTERNAL_USER_DASHBOARD reducer  state', () => {

    
    const payload={
     
          statusNames: [
            'Active',
            'Deactivated',
            'Request Sent'
          ],
          statusCount: [
            0,
            0,
            9
          ]
        
      }


      const externalUserOrderStatus = {
     
        statusNames: [
          'Active',
          'Deactivated',
          'Request Sent'
        ],
        statusCount: [
          0,
          0,
          9
        ]
      
    }

      
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });


  it('should return UsersData', () => {
    const type =ActionTypes.GET_EXTERNAL_USER_DASHBOARD;
    expect(reducer(undefined, {type , payload })).toEqual({externalUserOrderStatus});
  });


  


});


describe('GET_DASHBOARD_TABLE_DATA reducer  state', () => {

    
    const payload=[
     
          {
            customerNumber: 46720,
            customerName: 'BOBCAT COMPANY',
            placedOrdersCount: 4,
            orderPlacedBy: 'peter.parker@invaliddomain.som',
            dateRequested: '2022-01-11T00:00:00',
            orderCreatedBy: 'peter.parker@invaliddomain.som',
            orderCreatedAt: '2023-01-08T22:21:26.212',
            orderStatus: 'PL'
          },
          {
            customerNumber: 46030,
            customerName: 'JOHN DEERE MEXICO, SARL',
            placedOrdersCount: 10,
            orderPlacedBy: 'Deepanshu.Tyagi@compunneldigital.com',
            dateRequested: '2022-01-12T00:00:00',
            orderCreatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
            orderCreatedAt: '2023-01-05T09:09:53.264',
            orderStatus: 'PL'
          }
        ]
      


      const dashboardTableData =[
     
        {
          customerNumber: 46720,
          customerName: 'BOBCAT COMPANY',
          placedOrdersCount: 4,
          orderPlacedBy: 'peter.parker@invaliddomain.som',
          dateRequested: '2022-01-11T00:00:00',
          orderCreatedBy: 'peter.parker@invaliddomain.som',
          orderCreatedAt: '2023-01-08T22:21:26.212',
          orderStatus: 'PL'
        },
        {
          customerNumber: 46030,
          customerName: 'JOHN DEERE MEXICO, SARL',
          placedOrdersCount: 10,
          orderPlacedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          dateRequested: '2022-01-12T00:00:00',
          orderCreatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          orderCreatedAt: '2023-01-05T09:09:53.264',
          orderStatus: 'PL'
        }
      ]
    

      
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });


  it('should return UsersData', () => {
    const type =ActionTypes.GET_DASHBOARD_TABLE_DATA;
    expect(reducer(undefined, {type , payload })).toEqual({dashboardTableData});
  });


  


});


describe('GET_MENU_ACTIVE reducer  state', () => {

    
    const payload=3
      


      const getMenuActive =3
    

      
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });


  it('should return UsersData', () => {
    const type =ActionTypes.GET_MENU_ACTIVE;
    expect(reducer(undefined, {type , payload })).toEqual({getMenuActive});
  });


  


});


