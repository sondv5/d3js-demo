import { select, Selection } from 'd3';

interface IChart {
    create(selector: string): void;
    refresh(): void;
}

export abstract class Chart implements IChart {
    static COLORS = [
        '#E6704C',
        '#E9C469',
        '#EFF4BC',
        '#2C9D8B',
        '#264557'
    ];
    
    static LEGEND_COLOR = '#808080';
    
    static RANDOM_TIME = 3000;
    static PAUSE_TIME = 1000;

    svg: null | Selection<SVGSVGElement, unknown, HTMLElement, any> = null;
    create(selector: string): void {
        throw new Error('Method not implemented.');
    }
    refresh(): void {
        throw new Error('Method not implemented.');
    }
}


export class BarChart extends Chart {
    bars: Selection<SVGRectElement, unknown, HTMLElement, undefined>[] = [];
    create(selector: string): void {
        const root = select(selector);
        this.svg = root.append('svg')
            .attr('width', 250)
            .attr('height', 200);
        this.svg.append('path')
            .attr('d', 'M20 20 L20 180 L230 180')
            .style('fill', 'none')
            .style('stroke', Chart.LEGEND_COLOR)
            .style('stroke-width', 2);
        for (let i = 20; i < 180; i += 20) {
            this.svg.append('path')
                .attr('d', `M25 ${i} L230 ${i}`)
                .style('fill', 'none')
                .style('stroke', Chart.LEGEND_COLOR)
                .style('stroke-width', 1)
                .style('stroke-dasharray', '1')
        }
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

export class ArrowBarChart extends BarChart {
    bars: Selection<SVGRectElement, unknown, HTMLElement, undefined>[] = [];
    arrow: null | Selection<SVGGElement, unknown, HTMLElement, any> = null;
    create(selector: string): void {
        super.create(selector);
        this.arrow = this.svg?.append('g') || null;
        this.arrow?.append('circle')
            .attr('cx', 40)
            .attr('cy', 90)
            .attr('r', 3)
            .style('fill', Chart.LEGEND_COLOR);
        this.arrow?.append('path')
            .attr('d', 'M40 90 L210 90 L210 87 L213 90 L210 93 L210 90 Z')
            .style('fill', Chart.LEGEND_COLOR)
            .style('stroke', Chart.LEGEND_COLOR)
            .style('stroke-width', 2);
        this.arrow?.style('transform-origin', 'center')
            .style('transform', `translateY(30px) rotate(${Math.random() * 60 - 30}deg)`);
    }
    refresh(): void {
        super.refresh();
        this.bars.forEach((bar, i) => {
            const height = Math.random() * 140 + 20;
            bar.transition()
                .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
                .attr('y', 180 - height - 1)
                .attr('height', height);
        })
        this.arrow?.transition()
            .duration(Chart.RANDOM_TIME - Chart.PAUSE_TIME)
            .style('transform', `rotate(${Math.random() * 60 - 30}deg)`);
    }
}

export class PointChart extends Chart {
    points: Selection<SVGCircleElement, unknown, HTMLElement, undefined>[] = [];
    arrow: null | Selection<SVGGElement, unknown, HTMLElement, any> = null;
    create(selector: string): void {
        const root = select(selector);
        this.svg = root.append('svg')
            .attr('width', 250)
            .attr('height', 200);
        this.svg.append('path')
            .attr('d', 'M20 20 L20 180 L230 180')
            .style('fill', 'none')
            .style('stroke', '#808080')
            .style('stroke-width', 2);
        for (let i = 20; i < 180; i += 20) {
            this.svg.append('path')
                .attr('d', `M25 ${i} L230 ${i}`)
                .style('fill', 'none')
                .style('stroke', '#808080')
                .style('stroke-width', 1)
                .style('stroke-dasharray', '1')
        }
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
        this.svg.append('path')
            .attr('d', 'M20 20 L20 180 L230 180')
            .style('fill', 'none')
            .style('stroke', Chart.LEGEND_COLOR)
            .style('stroke-width', 2);
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
                .style('fill', Chart.COLORS[i]);
            const secondRect = this.svg.append('rect')
                .attr('x', 21)
                .attr('y', 200 - y - height - 2)
                .attr('width', secondWidth)
                .attr('height', height)
                .style('fill', Chart.COLORS[i]);
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
        this.svg.append('path')
            .attr('d', 'M20 20 L20 180 L230 180')
            .style('fill', 'none')
            .style('stroke', Chart.LEGEND_COLOR)
            .style('stroke-width', 2);
        for (let i = 20; i < 180; i += 20) {
            this.svg.append('path')
                .attr('d', `M25 ${i} L230 ${i}`)
                .style('fill', 'none')
                .style('stroke', Chart.LEGEND_COLOR)
                .style('stroke-width', 1)
                .style('stroke-dasharray', '1')
        }
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
