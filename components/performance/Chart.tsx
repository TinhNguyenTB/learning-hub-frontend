"use client"

import { Card } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Rectangle } from 'recharts';

const Chart = ({ data }: { data: { name: string, sales: number, total: number }[] }) => {
    return (
        <Card>
            <ResponsiveContainer width="100%" height={450}>
                <BarChart
                    data={data}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                    <Bar dataKey="sales" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
export default Chart