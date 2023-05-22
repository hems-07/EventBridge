import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import DashboardNavbar from './DashboardNavbar';
import './Dashboard.css';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';



Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);
function Dashboard(props) {
  const [values, setValues] = useState([]);
  const location = useLocation();
  const emailid = location.state.email;
  console.log(emailid);
  const index = emailid.indexOf("@");
  const namep = emailid.slice(0,index);
  console.log("Chart is ",Chart);
  //console.log(namep);
  const modname = namep.charAt(0).toUpperCase() + namep.slice(1);
  console.log(modname);
  const name = modname;
  console.log("name is ",modname);
  const [piedata,setpiedata] = useState({
  
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: []
      },
    ],
  });
  
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Count',
        data: [],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  });
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Count',
        data: [],
        backgroundColor: 'aqua',
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  });
  const optionsbar = {
    scales: {
      x: {
          title: {
              display: true,
              text: 'EventID',
              color: 'red'
          }
      },
      y: {
          title: {
              display: true,
              text: 'No. of participants',
              color: 'red'
          }
      }
  }

  }

  const optionsbar1 = {
    scales: {
      x: {
          title: {
              display: true,
              text: 'Organizer Name',
              color: 'red'
          }
      },
      y: {
          title: {
              display: true,
              text: 'Events',
              color: 'red'
          }
      }
    }

  }
  const pieoptions = {

  }
  
  
 
 var val1=0;
 var val2=0;
  useEffect(()=>{
    Axios.post('http://localhost:3002/dashboard/countfetch')
    .then((response)=>{
      console.log("Data fetched successfully");
        const data = response.data;
        console.log(data);
        const chartDatas = {
          labels: data.map((row) => row.EventID),
          datasets: [
            {
              label: 'Count',
              data: data.map((row) => row.Count),
              backgroundColor: 'aqua',
              borderColor: 'black',
              borderWidth: 1,
            },
          ],
        };
        setChartData(chartDatas);
        console.log("Chartdata is ",chartDatas);
    })
    
  })
  
  useEffect(() => {
    // Fetch data for the first component with the name parameter
    
    Axios.get(`http://localhost:3002/dashboard/pie1/${name}`)
    .then(response => {
      console.log("stuff here")
      console.log(response.data);
      val1=response.data[0].Count;
      console.log("val1= ",val1);
     // setData1(response.data);
    })
    .catch(error => {
      console.error('Error fetching data for the first component:', error);
    });

  // Fetch data for the second component with the name parameter
  Axios.get(`http://localhost:3002/dashboard/pie2/${name}`)
    .then(response => {
      console.log(response.data);
      val2=response.data[0].Count;
      //setData2(response.data);
      console.log("VAL2= ",val2," val1= ",val1);
      console.log("here insdde val1= ",val1," val2= ",val2)
      const piedata = {
        labels: ['Hosted','Participated'],
        datasets: [
          {
            data: [val1,val2],
            backgroundColor: ['aqua','purple']
          }
        ]
      };
      console.log("inside piedata is ",piedata);
      setpiedata(piedata);

    })
    .catch(error => {
      console.error('Error fetching data for the second component:', error);
    });
    
  }, []);
  useEffect(() => {
    Axios.post('http://localhost:3002/dashboard/bars')
      .then((response) => {
        console.log("Bars fetched successfully");
        const data = response.data;
        console.log(data);
        const chartData = {
          labels: data.map((row) => row.Orgname),
          datasets: [
            {
              label: 'Count',
              data: data.map((row) => row.Count),
              backgroundColor: 'aqua',
              borderColor: 'black',
              borderWidth: 1,
            },
          ],
        };
        setBarData(chartData);
        console.log("second bar data is ",chartData)
      })
      .catch((error) => {
        console.log("Error fetching data from /dashboard/bars");
      })
  }, []);

  return (
    <div className='dashboard-container'>
      <DashboardNavbar name={modname}/>
      <h1>Welcome {modname}</h1>
      <div className='dashboard-content'>
        <h2 className="font-weight-bold text-dark pt-3 pb-2 border-bottom border-4 border-primary mb-5 ml-5">Analytics to be displayed here</h2>

        {console.log("piedata inside",piedata)}
        {console.log("Chardata iniside",chartData)}
      </div>
      <div style={{ padding: '20px', margin: 'auto', width: '70%', height: '70%' }}>
        <Bar data={barData} options={optionsbar1} />
      </div>
      <div style={{ padding: '20px', margin: 'auto', width: '70%', height: '70%' }}>
        <Bar data={chartData} options={optionsbar} />
      </div>
      <div style={{padding: '20px', width: '50%'}}>
        <Pie data={piedata} options={pieoptions} />
      </div>
      
    </div>
  )
}

export default Dashboard