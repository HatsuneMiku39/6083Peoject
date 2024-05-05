import { Bar } from '@ant-design/plots';
import '../css/mycss.css';

function RootGraph({cSum,sSum,lSum}) {
  const data = [
      { name:"Total Checking", value:cSum},
      { name:"Total Saving  ", value:sSum},
      { name:"Total Loan    ", value:lSum},
  ];

    const config = {
      data,
      xField: 'name',
      yField: 'value',
      shapeField: 'hollow',
      colorField: 'name',
      legend: {
        color: { size: 72, autoWrap: true, maxRows: 3, cols: 3 },
      },
    };

  return (
    <div className="RootGraph">
      <Bar {...config} />;
    </div>
  );
}

export default RootGraph;
