import { Component, OnInit, Input } from '@angular/core';
import { Edge, Node, Layout } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from './customDagreNodesOnly';
import * as shape from 'd3-shape';
import { NetworkService } from 'src/app/services/network.service';

export class Employee {
  id: string;
  name: string;
  office: string;
  role: string;
  backgroundColor: string;
  upperManagerId?: string;
}

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css'],
})
export class NetworkComponent implements OnInit {
  @Input() employees: Employee[] = [];

  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
    orientation: 'TB',
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  public employeesData=[];

  constructor(private networkService:NetworkService) {
    this.employees = [
      {
        id: '1',
        name: 'Employee 1',
        office: 'Office 1',
        role: 'Manager',
        backgroundColor: '#DC143C',
      },
      {
        id: '2',
        name: 'Employee 2',
        office: 'Office 2',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1',
      },
      {
        id: '3',
        name: 'Employee 3',
        office: 'Office 3',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1',
      },
      {
        id: '4',
        name: 'Employee 4',
        office: 'Office 4',
        role: 'Engineer',
        backgroundColor: '#00FFFF',
        upperManagerId: '1',
      },
      {
        id: '5',
        name: 'Employee 5',
        office: 'Office 5',
        role: 'Student',
        backgroundColor: '#8A2BE2',
        upperManagerId: '4',
      },
    ];
  }

  public ngOnInit(): void {
    for (const employee of this.employees) {
      const node: Node = {
        id: employee.id,
        label: employee.name,
        data: {
          office: employee.office,
          role: employee.role,
          backgroundColor: employee.backgroundColor,
        },
      };

      this.nodes.push(node);
    }

    for (const employee of this.employees) {
      if (!employee.upperManagerId) {
        continue;
      }

      const edge: Edge = {
        source: employee.upperManagerId,
        target: employee.id,
        label: '',
        data: {
          linkText: 'Manager of',
        },
      };

      this.links.push(edge);
    }
  }

  public getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor,
    };
  }

  getEmployees() {
    this.networkService.get("/api/getAll").subscribe(
      (res)=>{
        if(res!=undefined && res!=null){
          /** La idea es que retorne el array de empleados en formato json*/
          this.employeesData=res
        }
      },(error)=>{
        console.log(error);
      });
  }
}
