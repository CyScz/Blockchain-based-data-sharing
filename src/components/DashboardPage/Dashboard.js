import '../../styles/Dashboard.css';
import React from 'react';
import { useMediaQuery } from 'react-responsive'
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    CategoryScale,
    ArcElement,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Radar } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import ItemsCarousel from 'react-items-carousel';
import { useState } from 'react';
import { Button, Icon, Col } from 'antd';
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  RightOutlined,
  LeftOutlined,
  CaretLeftFilled,
  CaretRightFilled
} from "@ant-design/icons";

ChartJS.register(
    ArcElement,
    RadialLinearScale,
    CategoryScale,
    BarElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
};

export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' 
        },
        title: {
        display: true,
        text: 'Chart.js Line Chart',
        },
    },
};
  
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
export const data2 = {
    labels,
    datasets: [
        {
        fill: true,
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const data3 = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
    datasets: [
      {
        label: '# of Votes',
        data: [2, 9, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
};

export const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels2 = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data4 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels2.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
};

export const data5 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  

function Dashboard() {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1068px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1067px)'})
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;

    return (
        <div>
            <div className='div-page-title'>
                <span className='page-title'>My Dashboard</span>
            </div>

            {isDesktopOrLaptop && <div className='dashboard-banner'>
              <div className='dashboard-banner-element'>
                <div>
                  <span className='element-title'>Total of users</span>
                </div>
                <div>
                  <span className='element-number'>2500</span>
                </div>
              </div>

              <div className='vertical-row'></div>

              <div className='dashboard-banner-element'>
                <div>
                  <span className='element-title'>Average time</span>
                </div>
                <div>
                  <span className='element-number'>123.50</span>
                </div>
              </div>

              <div className='vertical-row'></div>

              <div className='dashboard-banner-element'>
                <div>
                  <span className='element-title'>Total nodes</span>
                </div>
                <div>
                  <span className='element-number'>1667</span>
                </div>
              </div>

              <div className='vertical-row'></div>

              <div className='dashboard-banner-element'>
                <div>
                  <span className='element-title'>Average users</span>
                </div>
                <div>
                  <span className='element-number'>36.7</span>
                </div>
              </div>

              <div className='vertical-row'></div>

              <div className='dashboard-banner-element'>
                <div>
                  <span className='element-title'>Total data</span>
                </div>
                <div>
                  <span className='element-number'>15489</span>
                </div>
              </div>
            </div>}


            
            {isTabletOrMobile && <div>
              <div className='dashboard-carousel-mobile'>
                <ItemsCarousel
                  infiniteLoop={true}
                  gutter={20}
                  activePosition={'center'}
                  chevronWidth={60}
                  disableSwipe={false}
                  alwaysShowChevrons={false}
                  numberOfCards={2}
                  slidesToScroll={1}
                  outsideChevron={true}
                  showSlither={true}
                  firstAndLastGutter={true}
                  activeItemIndex={activeItemIndex}
                  requestToChangeActive={setActiveItemIndex}
                  rightChevron={
                    <Button className='button-shape' shape="circle">
                      <RightOutlined />
                    </Button>
                  }
                  leftChevron={
                    <Button className='button-shape' shape="circle">
                      <LeftOutlined />
                    </Button>}
                >
                  
                  <div className='dashboard-banner-element-mobile'>
                    <div>
                      <span className='element-title'>Total of users</span>
                    </div>
                    <div>
                      <span className='element-number'>2500</span>
                    </div>
                  </div>
            

                  <div className='dashboard-banner-element'>
                    <div>
                      <span className='element-title'>Average time</span>
                    </div>
                    <div>
                      <span className='element-number'>123.50</span>
                    </div>
                  </div>

                  <div className='dashboard-banner-element'>
                    <div>
                      <span className='element-title'>Total nodes</span>
                    </div>
                    <div>
                      <span className='element-number'>1667</span>
                    </div>
                  </div>

                  <div className='dashboard-banner-element'>
                    <div>
                      <span className='element-title'>Average users</span>
                    </div>
                    <div>
                      <span className='element-number'>36.7</span>
                    </div>
                  </div>

                  <div className='dashboard-banner-element'>
                    <div>
                      <span className='element-title'>Total data</span>
                    </div>
                    <div>
                      <span className='element-number'>15489</span>
                    </div>
                  </div>

                </ItemsCarousel>
              </div>
            </div>}

            <div>
                {isDesktopOrLaptop && <div className='dashboard-layout'>
                        <div className='dashboard-graph'>
                            <Doughnut data={data}/>
                        </div>
                        <div className='dashboard-graph2'>
                            <Line data={data2} options={options}/>
                        </div>
                        <div className='dashboard-graph'>
                            <Radar data={data3}/>
                        </div>
                        <div className='dashboard-graph2'>
                            <Bar data={data4} options={options2} />
                        </div>
                        <div className='dashboard-graph'>
                            <Pie data={data5} />
                        </div>
                </div>}

                {isTabletOrMobile && <div className='dashboard-layout'>
                        <div className='dashboard-graph-mobile'>
                            <Doughnut data={data}/>
                        </div>
                        <div className='dashboard-graph2-mobile'>
                            <Line data={data2} options={options}/>
                        </div>
                        <div className='dashboard-graph-mobile'>
                            <Radar data={data3}/>
                        </div>
                        <div className='dashboard-graph2-mobile'>
                            <Bar data={data4} options={options2} />
                        </div>
                        <div className='dashboard-graph-mobile'>
                            <Pie data={data5} />
                        </div>
                </div>}

            </div>
        </div>
    )
}

export default Dashboard