import * as React from 'react';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';


import Highcharts from 'highcharts';

import PieChart from 'highcharts-react-official';



export default function BasicCard({ dataLabels, dataData, chartName }) {
  const colors = Highcharts?.getOptions().colors;

  const categories = dataLabels;

  let arr =
    dataData &&
    dataData?.map(function (value, index) {
      return { name: dataLabels?.[index], y: value };
    });

  var data = arr;

  const browserData = [];
  const versionsData = [];
  let i;
  let j;
  const dataLen = data?.length;
  let drillDataLen;
  let brightness;

  const options = {
    styledMode: true,
    chart: {
      type: 'pie'
    },

    colors: [
      '#D83371',
      '#327EBF',
      '#00BBCB',
      '#8BC222',
      '#4B3590',
      '#FE6026',
      '#058DC7',
      '#50B432',
      '#ED561B',
      '#DDDF00',
      '#24CBE5',
      '#64E572',
      '#FF9655',
      '#FFF263',
      '#6AF9C4'
    ],
    labels: {
      style: {
        fontSize: '20px'
      },
      format: '{value: %e/%b <br/> %Y}',
      align: 'right'
    },
    title: {
      text: chartName
    },
    subtitle: {
      text: ''
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true
        }
      },
      series: {
        stacking: 'normal',

        showInLegend: true,

        size: 2000
      }
    },

    legend: {
      itemStyle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '8px'
      }
    },

    tooltip: {
      formatter: function () {
        if (chartName === 'Features Usage Trending') {
          return (
            '<b>' +
            this?.key +
            '</b><br/>' +
            'Time' +
            ' - ' +
            this.y +
            ' h' +
            '</b><br/>' +
            'Percentage' +
            ' - ' +
            this.percentage.toFixed(2) +
            '%'
          );
        } else {
          return (
            '<b>' +
            this?.key +
            '</b><br/>' +
            'count' +
            ' - ' +
            this.y +
            '</b><br/>' +
            'Percentage' +
            ' - ' +
            this.percentage.toFixed(2) +
            '%'
          );
        }
      }
    },

    series: data?.length
      ? [
          {
            minPointSize: 30,
            zMin: 0,
            name: chartName,
            data: data ? data : [],
            size: '100%',
            innerSize: '50%',
            color: 'orange',
            dataLabels: dataLabels ? dataLabels : []
          }
        ]
      : []
  };


  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        alignItems: 'center',
        padding: '30px 0',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.11)',
        borderRadius: '3px'
      }}
      className="card_portal"
    >
      {Highcharts && options?.series.length ? (
        <PieChart highcharts={Highcharts} options={options} />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center',
              color: 'rgb(51, 51, 51); font-size: 18px; fill: rgb(51, 51, 51)'
            }}
            className="highcharts-title"
          >
            {options?.title?.text}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '165px'
            }}
          >
            No data found
          </Box>
        </>
      )}
    </Box>
  );
}
