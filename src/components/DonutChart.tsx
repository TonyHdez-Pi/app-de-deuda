import * as d3 from "d3";
import type { DataType } from "@/types";

type DonutChartProps = {
	width: number;
	height: number;
	data: DataType[];
};

const colors = ["#6689c6", "#9a6fb0"];

const MARGIN_X = 150;
const MARGIN_Y = 50;
const INFLEXION_PADDING = 20;

export default function DonutChart({ width, height, data }: DonutChartProps) {
	const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2;
	const innerRadius = radius / 2;
	//d is the data
	const pieGenerator = d3.pie<DataType>().value((d) => d.value);
	//the  data is being passed down here
	const pie = pieGenerator(data);
	//this function transform the angles to svg path -> what is a path? check tutorial in graph gallery
	const sliceGenerator = d3.arc();

	const slices = pie.map((grp, index) => {
		const sliceInfo = {
			innerRadius,
			outerRadius: radius,
			startAngle: grp.startAngle,
			endAngle: grp.endAngle,
		};
		const centroid = sliceGenerator.centroid(sliceInfo);
		const slicePath = sliceGenerator(sliceInfo);

		const inflexion = {
			innerRadius: radius + INFLEXION_PADDING,
			outerRadius: radius + INFLEXION_PADDING,
			startAngle: grp.startAngle,
			endAngle: grp.endAngle,
		};

		const inflexionPoint = sliceGenerator.centroid(inflexion);

		const isRightLabel = inflexionPoint[0] > 0;
		const labelPositionX = inflexionPoint[0] + 10 * (isRightLabel ? 1 : -1);
		const textAnchor = isRightLabel ? "start" : "end";
		const label = grp.data.name;

		return (
			<g key={index}>
				<path d={slicePath} fill={colors[index]} />
				<circle cx={centroid[0]} cy={centroid[1]} r={2} />
				<line
					x1={centroid[0]}
					y1={centroid[1]}
					x2={inflexionPoint[0]}
					y2={inflexionPoint[1]}
					stroke={"black"}
					fill={"black"}
				/>
				<line
					x1={inflexionPoint[0]}
					y1={inflexionPoint[1]}
					x2={labelPositionX}
					y2={inflexionPoint[1]}
					stroke={"black"}
					fill={"black"}
				/>
				<text
					x={labelPositionX + (isRightLabel ? 2 : -2)}
					y={inflexionPoint[1]}
					textAnchor={textAnchor}
					dominantBaseline="middle"
					fontSize={14}
				>
					{label}
				</text>
			</g>
		);
	});

	return (
		<div>
			<svg width={width} height={height} className="overflow-visible">
				<g transform={`translate(${width / 2}, ${height / 2})`}>{slices}</g>
			</svg>
		</div>
	);
}
