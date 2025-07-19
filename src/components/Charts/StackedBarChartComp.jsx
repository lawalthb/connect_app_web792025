import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatYAxis } from '../Utils/methods';
import SelectField from '../Input/SelectField';

const StackedBarChartComp = ({
  data,
  title = 'Weekly Performance',
  valueLabel = 'Value',
  restLabel = 'Remaining',
}) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between">
        <h2 className="text-sm leading-6 font-semibold text-[#101928] mb-4">
          {title}
        </h2>
        {/* <div className="w-[125px]">
          <SelectField
            name="platform"
            defaultValue=""
            required={false}
            bgStyle={false}
          >
            <option value="">Last 7 Days</option>
            {[
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </SelectField>
        </div> */}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid stroke="#f1f5f9" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#00000099" />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12 }}
            stroke="#00000099"
          />
          <Tooltip
            contentStyle={{ borderRadius: 8, fontSize: '14px' }}
            labelStyle={{ color: '#2E2E2E' }}
            formatter={(value, name) => [`${value.toLocaleString()}`, name]}
          />
          <Bar
            dataKey="value"
            stackId="a"
            fill="#A20030"
            name={valueLabel}
            radius={[0, 0, 50, 50]}
            barSize={13}
          />
          <Bar
            dataKey="rest"
            stackId="a"
            fill="#FECACA"
            name={restLabel}
            radius={[50, 50, 0, 0]}
            barSize={13}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChartComp;
