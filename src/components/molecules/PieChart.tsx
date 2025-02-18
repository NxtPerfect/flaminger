import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { StatisticsForUserApplications } from '@/app/lib/definitions';

type Props = {
  statistics?: StatisticsForUserApplications
}

export default function PieChartStatistics({ statistics }: Props) {
  const accepted = statistics?.accepted ?? 0;
  const rejected = statistics?.rejected ?? 0;
  const total = statistics?.total ?? 0;
  const noResponse = total - (accepted + rejected);
  return (
    <PieChart series={[
      {
        data:
          [
            { id: 0, value: accepted, label: "Accepted" },
            { id: 1, value: rejected, label: "Rejected" },
            { id: 2, value: noResponse ?? 0, label: "No response" },
          ],
        innerRadius: 50,
        paddingAngle: 5,
        cornerRadius: 5
      }
    ]}
      width={500}
      height={250}
      colors={['#08df08', '#df0808', '#808080']}
      sx={{ "& .MuiChartsLegend-series text": { fill: "white !important" }, }}
    />
  );
}
