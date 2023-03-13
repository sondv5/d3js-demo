import { select, Selection } from 'd3';

interface IChart {
    create(selector: string): void;
    refresh(): void;
}

export abstract class Chart implements IChart {
    static COLORS = [
        '#E6704C',
        '#E9C469',
        'darksalmon',
        '#2C9D8B',
        '#264557'
    ];

    static WIDTH = 250;
    static HEIGHT = 200;
    static PADDING = 20;

    static LEGEND_COLOR = '#808080';
    static LEGEND_STROKE_WIDTH = 2;

    static RANDOM_TIME = 3000;
    static PAUSE_TIME = 1000;

    static drawLegend(svg: Selection<SVGSVGElement, unknown, HTMLElement, any>): Selection<SVGPathElement, unknown, HTMLElement, any> {
        return svg.append('path')
            .attr('d', `M${Chart.PADDING} ${Chart.PADDING} L${Chart.PADDING} ${Chart.HEIGHT - Chart.PADDING} ${Chart.WIDTH - Chart.PADDING} ${Chart.HEIGHT - Chart.PADDING}`)
            .style('fill', 'none')
            .style('stroke', Chart.LEGEND_COLOR)
            .style('stroke-width', Chart.LEGEND_STROKE_WIDTH);
    }

    static drawHorizontalLines(svg: Selection<SVGSVGElement, unknown, HTMLElement, any>): Selection<SVGPathElement, unknown, SVGSVGElement, any> {
        const spacing = (Chart.HEIGHT - 2 * Chart.PADDING) / 8;
        for (let i = Chart.PADDING; i < Chart.WIDTH - Chart.PADDING; i += spacing) {
            svg.append('path')
                .classed('horizontalLines', true)
                .attr('d', `M${Chart.PADDING + 4} ${i} L${Chart.WIDTH - Chart.PADDING} ${i}`)
                .style('fill', 'none')
                .style('stroke', Chart.LEGEND_COLOR)
                .style('stroke-width', 1)
                .style('stroke-dasharray', '1')
        }
        return svg.selectAll('.horizontalLines');
    }

    svg: null | Selection<SVGSVGElement, unknown, HTMLElement, any> = null;
    create(selector: string): void {
        // console.warn('Method not implemented.');
    }
    refresh(): void {
        // console.warn('Method not implemented.');
    }
}


export class BarChart extends Chart {
    bars: Selection<SVGRectElement, unknown, HTMLElement, undefined>[] = [];
    create(selector: string): void {
        const root = select(selector);
        this.svg = root.append('svg')
            .attr('width', 250)
            .attr('height', 200);
        Chart.drawLegend(this.svg);
        Chart.drawHorizontalLines(this.svg);
        this.bars = [];
        const width = 35;
        for (let i = 0; i < 5; i++) {
            const height = Math.random() * 140 + 20;
            const x = 30 + i * (width + 5);
            const rect = this.svg.append('rect')
                .attr('x', x)
                .attr('y', 180 - height - 1)
                .attr('width', width)
                .attr('height', height)
                .style('fill', Chart.COLORS[i]);
            this.bars.push(rect);
        }
    }
    refresh(): void {
        this.bars.forEach((bar, i) => {
            const height = Math.random() * 140 + 20;
            bar.transition()
                .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
                .attr('y', 180 - height - 1)
                .attr('height', height);
        })
    }
}

export class EmptyChart extends Chart { }

export class PointChart extends Chart {
    points: Selection<SVGCircleElement, unknown, HTMLElement, undefined>[] = [];
    arrow: null | Selection<SVGGElement, unknown, HTMLElement, any> = null;
    create(selector: string): void {
        const root = select(selector);
        this.svg = root.append('svg')
            .attr('width', 250)
            .attr('height', 200);
        Chart.drawLegend(this.svg);
        Chart.drawHorizontalLines(this.svg);
        for (let i = 0; i < 100; i += 2) {
            const height = Math.random() * 100 + 30;
            const x = 30 + i * 2;
            const dot = this.svg.append('circle')
                .attr('cx', x)
                .attr('cy', 180 - height - 1)
                .attr('r', 3)
                .style('fill', Chart.COLORS[1]);
            this.points.push(dot);
        }
        this.arrow = this.svg.append('g');
        this.arrow.append('circle')
            .attr('cx', 40)
            .attr('cy', 90)
            .attr('r', 3)
            .style('fill', Chart.LEGEND_COLOR);
        this.arrow.append('path')
            .attr('d', 'M40 90 L210 90 L210 87 L213 90 L210 93 L210 90 Z')
            .style('fill', Chart.LEGEND_COLOR)
            .style('stroke', Chart.LEGEND_COLOR)
            .style('stroke-width', 2);
        this.arrow.style('transform-origin', 'center')
            .style('transform', `rotate(${Math.random() * 60 - 30}deg)`);
    }
    refresh(): void {
        this.points.forEach((bar) => {
            const height = Math.random() * 100 + 30;
            bar.transition()
                .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
                .attr('cy', 180 - height - 1);
        })
        this.arrow?.transition()
            .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
            .style('transform', `rotate(${Math.random() * 60 - 30}deg)`);
    }
}

export class HorizontalBarChart extends Chart {
    bars: Selection<SVGRectElement, unknown, HTMLElement, undefined>[] = [];
    create(selector: string): void {
        const root = select(selector);
        this.svg = root.append('svg')
            .attr('width', 250)
            .attr('height', 200);
        Chart.drawLegend(this.svg);
        const height = 15;
        for (let i = 0; i < 4; i++) {
            const firstWidth = Math.random() * 180 + 20;
            const secondWidth = Math.random() * 180 + 20;
            const y = 40 + i * 2 * height + i * 10;
            const firstRect = this.svg.append('rect')
                .attr('x', 21)
                .attr('y', 200 - y)
                .attr('width', firstWidth)
                .attr('height', height)
                .style('fill', Chart.COLORS.filter(e => e !== Chart.COLORS[2])[i]);
            const secondRect = this.svg.append('rect')
                .attr('x', 21)
                .attr('y', 200 - y - height - 2)
                .attr('width', secondWidth)
                .attr('height', height)
                .style('fill', Chart.COLORS.filter(e => e !== Chart.COLORS[2])[i]);
            this.bars.push(firstRect, secondRect);
        }
    }
    refresh(): void {
        this.bars.forEach((bar, i) => {
            const width = Math.random() * 180 + 20;
            bar.transition()
                .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
                .attr('width', width);
        })
    }
}

export class LineChart extends Chart {
    paths: Selection<SVGPathElement, unknown, HTMLElement, undefined>[] = [];
    dots: Selection<SVGCircleElement, unknown, HTMLElement, undefined>[][] = [];
    create(selector: string): void {
        const root = select(selector);
        this.svg = root.append('svg')
            .attr('width', 250)
            .attr('height', 200);
        Chart.drawLegend(this.svg);
        Chart.drawHorizontalLines(this.svg);
        for (let colorIdx = 0; colorIdx < Chart.COLORS.length; colorIdx++) {
            const points: { x: number, y: number }[] = [];
            let d = '';
            for (let i = 0; i < 6; i++) {
                const y = Math.random() * 120 + 40;
                const x = 30 + i * 38;
                points.push({ x, y });
                if (i === 0) {
                    d = `M${x} ${y}`;
                } else {
                    d += ` L${x} ${y}`;
                }
            }
            const path = this.svg.append('path')
                .attr('d', d)
                .style('fill', 'none')
                .style('stroke', Chart.COLORS[colorIdx])
                .style('stroke-width', 1);
            this.paths.push(path);
            const dots: Selection<SVGCircleElement, unknown, HTMLElement, undefined>[] = [];
            for (let idx = 0; idx < points.length; idx++) {
                const dot = this.svg.append('circle')
                    .attr('cx', points[idx].x)
                    .attr('cy', points[idx].y)
                    .attr('r', 3)
                    .style('fill', Chart.COLORS[colorIdx]);
                dots.push(dot);
            }
            this.dots.push(dots);
        }
    }
    refresh(): void {
        for (let colorIdx = 0; colorIdx < Chart.COLORS.length; colorIdx++) {
            const points: { x: number, y: number }[] = [];
            let d = '';
            for (let i = 0; i < 6; i++) {
                const y = Math.random() * 120 + 40;
                const x = 30 + i * 38;
                points.push({ x, y });
                if (i === 0) {
                    d = `M${x} ${y}`;
                } else {
                    d += ` L${x} ${y}`;
                }
            }
            this.paths[colorIdx].transition()
                .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
                .attr('d', d);
            for (let idx = 0; idx < points.length; idx++) {
                this.dots[colorIdx][idx].transition()
                    .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
                    .attr('cx', points[idx].x)
                    .attr('cy', points[idx].y);
            }
        }
    }
}

export class StackAreaChart extends Chart {
    paths: Selection<SVGPathElement, unknown, HTMLElement, undefined>[] = [];
    dots: Selection<SVGCircleElement, unknown, HTMLElement, undefined>[][] = [];
    create(selector: string): void {
        const root = select(selector);
        this.svg = root.append('svg')
            .attr('width', 250)
            .attr('height', 200);
        const remainValues = Array(6).fill(160);
        const usedValues = Array(6).fill(0);
        for (let colorIdx = 0; colorIdx < Chart.COLORS.length; colorIdx++) {
            const points: { x: number, y: number }[] = [];
            let d = '';
            for (let i = 0; i < 6; i++) {
                const randomVal = Math.min(remainValues[i], Math.random() * 50);
                usedValues[i] += randomVal;
                const y = 180 - usedValues[i];
                remainValues[i] -= randomVal;
                const x = 21 + i * 41.66666;
                points.push({ x, y });
                if (i === 0) {
                    d = `M${x} ${y}`;
                } else {
                    d += ` L${x} ${y}`;
                }
            }
            d += ' L229 178 L21 178';
            const path = this.svg.append('path')
                .attr('d', d)
                .style('fill', Chart.COLORS[colorIdx])
                .style('stroke', Chart.COLORS[colorIdx])
                .style('stroke-width', 1)
                .lower();
            this.paths.push(path);
            const dots: Selection<SVGCircleElement, unknown, HTMLElement, undefined>[] = [];
            for (let idx = 0; idx < points.length; idx++) {
                const dot = this.svg.append('circle')
                    .attr('cx', points[idx].x)
                    .attr('cy', points[idx].y)
                    .attr('r', 0)
                    .style('fill', Chart.COLORS[colorIdx])
                    .lower();
                dots.push(dot);
            }
            this.dots.push(dots);
        }
        Chart.drawLegend(this.svg).lower();
        Chart.drawHorizontalLines(this.svg).lower();
    }
    refresh(): void {
        const remainValues = Array(6).fill(160);
        const usedValues = Array(6).fill(0);
        for (let colorIdx = 0; colorIdx < Chart.COLORS.length; colorIdx++) {
            const points: { x: number, y: number }[] = [];
            let d = '';
            for (let i = 0; i < 6; i++) {
                const randomVal = Math.min(remainValues[i], Math.random() * 50);
                usedValues[i] += randomVal;
                const y = 180 - usedValues[i];
                remainValues[i] -= randomVal;
                const x = 21 + i * 41.66666;
                points.push({ x, y });
                if (i === 0) {
                    d = `M${x} ${y}`;
                } else {
                    d += ` L${x} ${y}`;
                }
            }
            d += ' L229 178 L21 178';
            this.paths[colorIdx].transition()
                .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
                .attr('d', d);
            for (let idx = 0; idx < points.length; idx++) {
                this.dots[colorIdx][idx].transition()
                    .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
                    .attr('cx', points[idx].x)
                    .attr('cy', points[idx].y);
            }
        }
    }
}

export class CandleChart extends Chart {
    bars: Selection<SVGRectElement, unknown, HTMLElement, undefined>[] = [];
    paths: Selection<SVGPathElement, unknown, HTMLElement, undefined>[] = [];
    create(selector: string): void {
        const root = select(selector);
        this.svg = root.append('svg')
            .attr('width', 250)
            .attr('height', 200);
        Chart.drawLegend(this.svg);
        Chart.drawHorizontalLines(this.svg);
        this.bars = [];
        const spacing = (Chart.WIDTH - Chart.PADDING * 2 - 20) / 8;
        const candleWidth = spacing - 13;
        for (let i = 0; i < 8; i++) {
            const height = Math.random() * (Chart.HEIGHT - Chart.PADDING * 2 - 60) + 40;
            const x = Chart.PADDING * 2 + i * spacing;
            const candleHeight = Math.max(20, Math.random() * (height - 40));
            const path = this.svg.append('path')
                .attr('d', `M${x + candleWidth/2} ${Chart.HEIGHT - Chart.PADDING - height - 20} L${x + candleWidth/2} ${Chart.HEIGHT - Chart.PADDING - height + candleHeight + 20}`)
                .style('fill', 'none')
                .style('stroke', Chart.LEGEND_COLOR)
                .style('stroke-width', 2);
            this.paths.push(path);
            const rect = this.svg.append('rect')
                .attr('x', x)
                .attr('y', Chart.HEIGHT - Chart.PADDING - height)
                .attr('width', candleWidth)
                .attr('height', candleHeight)
                .style('fill', Chart.COLORS[i%Chart.COLORS.length]);
            this.bars.push(rect);
        }
    }
    refresh(): void {
        const spacing = (Chart.WIDTH - Chart.PADDING * 2 - 20) / 8;
        const candleWidth = spacing / 2;
        this.bars.forEach((bar, i) => {
            const height = Math.random() * (Chart.HEIGHT - Chart.PADDING * 2 - 60) + 40;
            const x = Chart.PADDING * 2 + i * spacing;
            const candleHeight = Math.max(20, Math.random() * (height - 40));
            bar.transition()
                .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
                .attr('y', Chart.HEIGHT - Chart.PADDING - height)
                .attr('height', candleHeight);
            this.paths[i].transition()
                .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
                .attr('d', `M${x + candleWidth/2} ${Chart.HEIGHT - Chart.PADDING - height - 20} L${x + candleWidth/2} ${Chart.HEIGHT - Chart.PADDING - height + candleHeight + 20}`)
        })
    }
}
