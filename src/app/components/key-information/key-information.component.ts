import { Component } from '@angular/core';
import deviceData from '../../../assets/data/device_type.json';
import countryData from '../../../assets/data/countries.json';
import distributedData from '../../../assets/data/country_dist_device.json';
import updateData from '../../../assets/data/mentioned.json';
import noMentionUpdateData from '../../../assets/data/no_mention.json';
import {
    CountryInfo,
    DeviceInfo,
    DistributionInfo,
    OutputData,
    UpdateData,
    devices,
} from 'src/app/models/key-info';
import { BarChartInput } from 'src/app/models/charts';
//import { ChartType } from 'angular-google-charts';

@Component({
    selector: 'app-key-information',
    templateUrl: './key-information.component.html',
    styleUrls: ['./key-information.component.scss'],
})
export class KeyInformationComponent {
    deviceInfo: DeviceInfo[];
    deviceData: BarChartInput[] = [];
    devices = devices;
    countryInfo: CountryInfo[];
    countryData: BarChartInput[] = [];

    distInfo: DistributionInfo[];

    countries: string[];
    selectedCountry: string;
    selectedDevice: string;

    updates: OutputData[] = [];
    noMentionUpdates: OutputData[] = [];
    timelineData: BarChartInput[] = [];
    noMentionTimelineData: BarChartInput[] = [];

    deviceLayout = {
        barmode: 'stack',
        title: 'Percentage of Policies with Mention and No Mention of Devices',
        xaxis: { tickmode: 'linear', tickangle: 45, tickfont: { size: 9 } },
        yaxis: {
            title: 'Percentage',
        },
        width: 800,
        height: 500,
    };

    countryLayout = {
        barmode: 'stack',
        title: ' Percentage of Countries with Mention and No Mention of Devices',
        xaxis: { tickmode: 'linear', tickangle: 45, tickfont: { size: 9 } },
        yaxis: {
            title: 'Percentage',
        },
        width: 800,
        height: 500,
    };

    currentCountryData: BarChartInput[] = [];
    barLayout = {
        title: 'Distribution of Device Type for a Country',
        yaxis: { title: 'Occurrences' },
        xaxis: { tickmode: 'linear', tickangle: 45, tickfont: { size: 9 } },
        width: 800,
        height: 500,
    };
    dates = Array.from({ length: 2023 - 2003 + 1 }, (_, i) => 2003 + i);

    public graph = {
        layout: {
            title: 'Device mentioned',
            xaxis: {
                tickvals: this.dates,
                ticktext: this.dates.map((t) => String(t)),
                tickmode: 'linear',
                tickangle: 45,
                tickfont: { size: 9 },
            },
            yaxis: { title: 'Count', showticklabels: false },
            margin: { t: 30, l: 50, r: 30, b: 30 },
            shapes: [
                {
                    type: 'line',
                    x0: 2017,
                    x1: 2017,
                    xref: 'x',
                    y0: 0,
                    y1: 1,
                    yref: 'paper',
                    line: {
                        color: 'red',
                        width: 2,
                    },
                },
            ],
            width: 500,
            height: 500,
        },
        
        config: {
            displayModeBar: false,
        },
        
    };
    public graph2 = {
        layout: {
            title: 'Device not mentioned',
            xaxis: {
                tickvals: this.dates,
                ticktext: this.dates.map((t) => String(t)),
                tickmode: 'linear',
                tickangle: 45,
                tickfont: { size: 9 },
            },
            yaxis: { title: 'Count', showticklabels: false },
            margin: { t: 30, l: 50, r: 30, b: 30 },
            shapes: [
                {
                    type: 'line',
                    x0: 2017,
                    x1: 2017,
                    xref: 'x',
                    y0: 0,
                    y1: 1,
                    yref: 'paper',
                    line: {
                        color: 'red',
                        width: 2,
                    },
                },
            ],
            width: 500,
            height: 500,
        },
    };

    

    constructor() {
        this.deviceInfo = deviceData;
        this.distInfo = distributedData;
        this.countries = countryData.map((t) => t.country);
        this.deviceData = this.getDeviceData(deviceData);
        this.countryData = this.getCountryData(countryData);
        this.updates = this.transformUpdateData(updateData);
        this.noMentionUpdates = this.transformUpdateData(noMentionUpdateData);
        this.selectedCountry = this.countries[30];
        this.selectedDevice = this.devices[0];
        this.onDeviceTypeChange(this.selectedDevice);
        this.onCountryChange(this.selectedCountry);
    }

    getDeviceData(data: DeviceInfo[]): BarChartInput[] {
        return [
            {
                x: data.map((d) => d.device_type),
                y: data.map((d) => (d.not_mentioned / d.total) * 100),
                name: 'No mention of smart device',
                type: 'bar',
            },
            {
                x: data.map((d) => d.device_type),
                y: data.map((d) => (d.mentioned / d.total) * 100),
                name: 'Mention of smart device',
                type: 'bar',
            },
        ];
    }

    getCountryData(data: CountryInfo[]): BarChartInput[] {
        return [
            {
                x: data.map((d) => d.country),
                y: data.map((d) => (d.not_mentioned / d.total) * 100),
                name: 'No mention of smart device',
                type: 'bar',
            },
            {
                x: data.map((d) => d.country),
                y: data.map((d) => (d.mentioned / d.total) * 100),
                name: 'Mention of smart device',
                type: 'bar',
            },
        ];
    }

    onCountryChange(param: string): void {
        const rec = this.distInfo.find((t) => t.country == param);
        if (!!rec) {
            this.currentCountryData = [
                {
                    x: Object.keys(rec).filter((t) => t != 'country'),
                    y: Object.values(rec).slice(1),
                    name: 'No mention of smart device',
                    type: 'bar',
                    marker: {
                        color: [
                            '#fc5185',
                            '#fd6a6d',
                            '#f7b731',
                            '#4b4b4b',
                            '#0abde3',
                            '#f5d547',
                            '#1dd1a1',
                            '#ff9ff3',
                            '#ffbe76',
                            '#ff7979',
                            '#badc58',
                            '#dff9fb',
                            '#f3a683',
                            '#f7d794',
                            '#778beb',
                            '#2d3436',
                            '#b2bec3',
                            '#e77f67',
                            '#2c2c54',
                            '#474787',
                            '#d1ccc0',
                            '#f5cd79',
                            '#c44569',
                            '#a5b1c2',
                        ],
                    },
                },
            ];
        } else {
            throw new Error('Country Not Found');
        }
    }

    onDeviceTypeChange(param: string): void {
        const currentDevice = this.updates.find((t) => t.device_name == param);
        const currentNoMentionDevice = this.noMentionUpdates.find(
            (t) => t.device_name == param
        );

        if (!!currentDevice && !!currentNoMentionDevice) {
            this.timelineData = [
                {
                    x: currentDevice.data.map((t) => t.year),
                    y: ['Data'],
                    z: [currentDevice.data.map((t) => t.count)],
                    type: 'heatmap',
                    colorscale: 'Viridis',
                    hovertemplate: 'Year: %{x}, Count: %{z}<extra></extra>',
                },
            ];
            this.noMentionTimelineData = [
                {
                    x: currentNoMentionDevice.data.map((t) => t.year),
                    y: ['Data'],
                    z: [currentNoMentionDevice.data.map((t) => t.count)],
                    type: 'heatmap',
                    colorscale: 'Viridis',
                    hovertemplate: 'Year: %{x}, Count: %{z}<extra></extra>',
                },
            ];
        }
    }

    transformUpdateData(inputData: UpdateData[]): OutputData[] {
        const groupedData: { [key: string]: { [key: number]: number } } = {};

        inputData.forEach((item) => {
            const deviceGroup = groupedData[item.device_name] || {};
            const yearCount = deviceGroup[item.year] || 0;
            deviceGroup[item.year] = yearCount + 1;

            groupedData[item.device_name] = deviceGroup;
        });

        const outputData: OutputData[] = Object.entries(groupedData).map(
            ([device, years]) => {
                const data = Object.entries(years).map(([year, count]) => ({
                    year: parseInt(year),
                    count: count,
                }));

                return {
                    device_name: device,
                    data,
                };
            }
        );

        return outputData;
    }
}
