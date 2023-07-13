import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Breadcrumb({ userData,portal , location, page, partNumber }) {
  return (
    <>
      <Box>
        {location &&
          location?.map((loc, i) => (
            <>
              {loc.to ? (
                <Link key={i} to={`${loc?.to}`}>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: '16px'
                    }}
                  >
                    {`${loc?.location}`}
                  </span>
                </Link>
              ) : (
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: '16px'
                  }}
                >
                  {` ${loc?.location} `}
                </span>
              )}
            </>
          ))}{' '}
        <span
          style={{
            fontWeight: 700,
            fontSize: '16px'
          }}
        >
         
          {userData &&
            `» ${
              userData?.customerName
                ? userData?.customerName
                : userData?.firstName + ' ' + userData?.lastName
            }`}
            
          {page && ` > ${page}`}
          {portal && ` > ${portal.customerNames}`}

          {partNumber && `> ${partNumber}`}
        </span>
      </Box>
    </>
  );
}

export default Breadcrumb;
