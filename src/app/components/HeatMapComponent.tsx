import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HeatmapData {
  date: Date;
  count: number;
}

function generateHeatmapData(): HeatmapData[] {
  const today = new Date();
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  const days: HeatmapData[] = [];

  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    days.push({
      date: new Date(d),
      count: Math.floor(Math.random() * 5),
    });
  }
  return days;
}

function getColor(count: number | null): string {
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
  return count === null ? '#161b22' : colors[count] || colors[0];
}

const HeatMap: React.FC<{ data: HeatmapData[], startDate: Date }> = ({ data, startDate }) => {
  const daysOfWeek = ['Mon', '', 'Wed', '', 'Fri', '', ''];
  const weeks = 21; // 13 weeks is approximately 3 months

  const getDataForDate = (date: Date) => {
    return data.find(d => d.date.toDateString() === date.toDateString()) || null;
  };

  return (
    <div className="flex">
      <div className="flex flex-col justify-between pr-1 text-[10px] text-gray-400">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="h-3 flex items-center">{day}</div>
        ))}
      </div>
      <div className="grid grid-flow-col gap-[1px]">
        {Array.from({ length: weeks }).map((_, weekIndex) => (
          <div key={weekIndex} className="grid grid-rows-7 gap-[1px]">
            {Array.from({ length: 7 }).map((_, dayIndex) => {
              const date = new Date(startDate);
              date.setDate(date.getDate() + (weekIndex * 7 + dayIndex));
              const day = getDataForDate(date);
              return (
                <div
                  key={dayIndex}
                  className="w-3 h-3 border border-[#1b2028]"
                  style={{ backgroundColor: getColor(day ? day.count : null) }}
                  title={day ? `Date: ${date.toDateString()}, Count: ${day.count}` : `No data for ${date.toDateString()}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const data = generateHeatmapData();
    setHeatmapData(data);
  }, []);

  const getStartDate = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() - 2 - currentIndex * 3, 1);
  };

  const handleNext = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex < 3) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const startDate = getStartDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Card className="bg-[#0d1117] border-none text-white w-[350px]">
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-between mb-1">
          {[0, 1, 2].map((i) => {
            const date = new Date(startDate);
            date.setMonth(startDate.getMonth() + i);
            return (
              <div key={i} className="text-xs text-gray-400">
                {monthNames[date.getMonth()]}
              </div>
            );
          })}
        </div>
        <HeatMap data={heatmapData} startDate={startDate} />
        <div className="flex justify-between mt-3">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 3}
            className="px-3 py-1 text-xs bg-[#21262d] text-white rounded disabled:opacity-50"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === 0}
            className="px-3 py-1 text-xs bg-[#21262d] text-white rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
        <div className="flex justify-end items-center mt-1">
          <span className="text-[10px] text-gray-400 mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-2 h-2 mr-[2px] border border-[#1b2028]"
              style={{ backgroundColor: getColor(level) }}
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">More</span>
        </div>
      </CardContent>
    </Card>
  );
}